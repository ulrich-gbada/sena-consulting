"use client";

import { useState } from "react";
import {
  type Branche, type Reponses, type PieceJointe, type ChampDef,
  nettoyer, erreurs, PJ_MAX_OCTETS,
} from "../lib/branche";

// ─── Étape « Activité » (branches Carrosserie, Formation… — SPECS v1.0 §4 et §6) ──
// Pilotée par le descripteur de branche (app/lib/branches.ts).

type Props = {
  branche: Branche;
  valeur: Reponses;
  onChange: (r: Reponses) => void;          // la page stocke nettoyer(r)
  pieceJointe: PieceJointe | null;
  onPieceJointe: (pj: PieceJointe | null) => void;
  onRetour: () => void;
  onSuivant: () => void;
};

const nomPropre = (n: string) => n.replace(/[^\w.\- ]/g, "_").slice(0, 80);

function enBase64(b: Blob): Promise<string> {
  return new Promise((ok, ko) => {
    const r = new FileReader();
    r.onload = () => ok(String(r.result).split(",")[1] ?? "");
    r.onerror = () => ko(r.error);
    r.readAsDataURL(b);
  });
}

async function preparerPieceJointe(f: File): Promise<PieceJointe | string> {
  const TROP_LOURD = "Fichier trop lourd (3 Mo maximum). Vous pourrez l'envoyer par e-mail après l'appel.";
  const ILLISIBLE = "Format non lu. Envoyez une photo JPG ou un PDF.";
  if (f.type === "application/pdf") {
    if (f.size > PJ_MAX_OCTETS) return TROP_LOURD;
    return { nom: nomPropre(f.name), type: f.type, base64: await enBase64(f) };
  }
  if (!f.type.startsWith("image/")) return ILLISIBLE;
  try {
    const bmp = await createImageBitmap(f);
    const r = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const cv = document.createElement("canvas");
    cv.width = Math.round(bmp.width * r);
    cv.height = Math.round(bmp.height * r);
    cv.getContext("2d")!.drawImage(bmp, 0, 0, cv.width, cv.height);
    const blob = await new Promise<Blob>((ok, ko) =>
      cv.toBlob((b) => (b ? ok(b) : ko(new Error("toBlob"))), "image/jpeg", 0.82));
    if (blob.size > PJ_MAX_OCTETS) return TROP_LOURD;
    return { nom: nomPropre(f.name.replace(/\.[^.]+$/, "") + ".jpg"), type: "image/jpeg", base64: await enBase64(blob) };
  } catch {
    return ILLISIBLE;
  }
}

const GROUPE: React.CSSProperties = { marginTop: 18, marginBottom: 0 };
const NOTE_STYLE: React.CSSProperties = { background: "#F4F5F7", padding: "12px 16px", borderRadius: 6, color: "#2E4A6B", fontSize: 14, marginTop: 12, lineHeight: 1.5 };

function Champ({ def, valeur, onChoisir }: { def: ChampDef; valeur: string; onChoisir: (v: string) => void }) {
  if (def.controle === "texte") {
    return (
      <div className="form-group" style={GROUPE}>
        <label htmlFor={def.cle}>{def.question}</label>
        <input type="text" id={def.cle} maxLength={def.maxLength ?? 80} value={valeur} onChange={(e) => onChoisir(e.target.value)} placeholder={def.placeholder} />
      </div>
    );
  }
  if (def.controle === "select") {
    return (
      <div className="form-group" style={GROUPE}>
        <label htmlFor={def.cle}>{def.question}</label>
        <select id={def.cle} value={valeur} onChange={(e) => onChoisir(e.target.value)}>
          <option value="">Sélectionner…</option>
          {(def.options ?? []).map(([v, lib]) => <option key={v} value={v}>{lib}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div className="form-group" style={GROUPE}>
      <label>{def.question}</label>
      <div className="secteur-grid" role="radiogroup" aria-label={def.question}>
        {(def.options ?? []).map(([v, lib]) => (
          <div key={v} className={`secteur-card ${valeur === v ? "selected" : ""}`} onClick={() => onChoisir(v)} role="radio" aria-checked={valeur === v} tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChoisir(v); } }}>
            <div className={`secteur-dot ${valeur === v ? "sel" : ""}`} />{lib}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EtapeActivite({ branche, valeur, onChange, pieceJointe, onPieceJointe, onRetour, onSuivant }: Props) {
  const [erreurPj, setErreurPj] = useState("");
  const [preparation, setPreparation] = useState(false);
  const [cleFichier, setCleFichier] = useState(0); // remonter l'input file vide (reset)

  const fichierVisible = (r: Reponses) => Boolean(branche.fichier && branche.fichier.visible(r));

  const set = (cle: string, v: string) => {
    const suivant = nettoyer(branche, { ...valeur, [cle]: v });
    onChange(suivant);
    if (!fichierVisible(suivant)) { onPieceJointe(null); setErreurPj(""); setCleFichier((k) => k + 1); }
  };

  const choisirFichier = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreparation(true); setErreurPj("");
    const r = await preparerPieceJointe(f);
    setPreparation(false);
    if (typeof r === "string") { setErreurPj(r); onPieceJointe(null); e.target.value = ""; }
    else onPieceJointe(r);
  };

  const retirer = () => { onPieceJointe(null); setErreurPj(""); setCleFichier((k) => k + 1); };

  const errs = erreurs(branche, valeur);
  const tailleMo = (b64: string) => ((b64.length * 3) / 4 / 1_000_000).toFixed(1).replace(".", ",");

  return (
    <div>
      <p style={{ color: "#2E4A6B", fontSize: 14, marginBottom: 2 }}>{branche.intro}</p>

      {branche.champs.map((def) => {
        if (!def.visible(valeur)) return null;
        const note = def.note?.(valeur);
        return (
          <div key={def.cle}>
            <Champ def={def} valeur={valeur[def.cle] ?? ""} onChoisir={(v) => set(def.cle, v)} />
            {note && <div style={NOTE_STYLE}>{note}</div>}
          </div>
        );
      })}

      {branche.fichier && fichierVisible(valeur) && (
        <div className="form-group" style={GROUPE}>
          <label htmlFor="fichier">{branche.fichier.libelle}</label>
          <div style={{ fontSize: 12, color: "#8A9BB0", marginBottom: 8 }}>Elle me permet de préparer l'appel. Elle n'est pas conservée sur le site.</div>
          {pieceJointe ? (
            <div style={{ fontSize: 14, color: "#1B2A3E" }}>
              ✓ {pieceJointe.nom} ({tailleMo(pieceJointe.base64)} Mo){" "}
              <button type="button" onClick={retirer} style={{ background: "none", border: "none", color: "#C9A84C", cursor: "pointer", textDecoration: "underline", fontFamily: "inherit", fontSize: 13 }}>Retirer</button>
            </div>
          ) : (
            <input key={cleFichier} type="file" id="fichier" accept="image/*,application/pdf" onChange={choisirFichier} style={{ padding: 8 }} />
          )}
          {preparation && <div style={{ fontSize: 13, color: "#8A9BB0", marginTop: 6 }}>Préparation du fichier…</div>}
          {erreurPj && <div style={{ fontSize: 13, color: "#c62828", marginTop: 6 }}>{erreurPj}</div>}
        </div>
      )}

      <div className="form-nav">
        <button className="btn-back" onClick={onRetour}>← Retour</button>
        <button className="btn-next" onClick={onSuivant} disabled={errs.length > 0 || preparation}>Étape suivante →</button>
      </div>
    </div>
  );
}
