"use client";

import { useState } from "react";
import {
  type Carrosserie, type PieceJointe, QUESTIONS, OPTIONS, type ChampChoix,
  visible, nettoyer, erreursCarrosserie, PJ_MAX_OCTETS,
} from "../lib/carrosserie";

// ─── Étape « Activité » (branche Carrosserie, SPECS v1.0 §4 et §6) ──────────

type Props = {
  valeur: Carrosserie;
  onChange: (c: Carrosserie) => void;       // la page stocke nettoyer(c)
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

function RadioChoix({ champ, valeur, onChoisir }: { champ: ChampChoix; valeur: string; onChoisir: (v: string) => void }) {
  return (
    <div className="form-group" style={{ marginTop: 18, marginBottom: 0 }}>
      <label>{QUESTIONS[champ]}</label>
      <div className="secteur-grid" role="radiogroup" aria-label={QUESTIONS[champ]}>
        {OPTIONS[champ].map(([v, lib]) => (
          <div key={v} className={`secteur-card ${valeur === v ? "selected" : ""}`} onClick={() => onChoisir(v)} role="radio" aria-checked={valeur === v} tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChoisir(v); } }}>
            <div className={`secteur-dot ${valeur === v ? "sel" : ""}`} />{lib}
          </div>
        ))}
      </div>
    </div>
  );
}

const NOTE_STYLE: React.CSSProperties = { background: "#F4F5F7", padding: "12px 16px", borderRadius: 6, color: "#2E4A6B", fontSize: 14, marginTop: 12, lineHeight: 1.5 };

export default function EtapeCarrosserie({ valeur, onChange, pieceJointe, onPieceJointe, onRetour, onSuivant }: Props) {
  const [erreurPj, setErreurPj] = useState("");
  const [preparation, setPreparation] = useState(false);
  const [cleFichier, setCleFichier] = useState(0); // remonter l'input file vide (reset)

  const set = (champ: keyof Carrosserie, v: string) => {
    const suivant = nettoyer({ ...valeur, [champ]: v } as Carrosserie);
    onChange(suivant);
    if (!visible(suivant, "baremes2027")) { onPieceJointe(null); setErreurPj(""); setCleFichier((k) => k + 1); }
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

  const radio = (champ: ChampChoix) => <RadioChoix champ={champ} valeur={valeur[champ]} onChoisir={(v) => set(champ, v)} />;

  const erreurs = erreursCarrosserie(valeur);
  const tailleMo = (b64: string) => ((b64.length * 3) / 4 / 1_000_000).toFixed(1).replace(".", ",");

  return (
    <div>
      <p style={{ color: "#2E4A6B", fontSize: 14, marginBottom: 2 }}>Quelques questions sur votre atelier. Un clic par question, 1 minute en tout.</p>

      {radio("carrosserie")}
      {valeur.carrosserie === "non" && (
        <div style={NOTE_STYLE}>Le Bilan Agréments concerne la carrosserie. Continuez : l'audit gratuit porte aussi sur le reste de votre activité.</div>
      )}

      {visible(valeur, "agrement") && radio("agrement")}
      {valeur.carrosserie === "oui" && valeur.agrement === "non" && (
        <div style={NOTE_STYLE}>Le Bilan Agréments concerne les ateliers agréés. Continuez : nous parlerons de la façon d'attirer plus de clients en direct.</div>
      )}

      {visible(valeur, "reseau") && (
        <div className="form-group" style={{ marginTop: 18, marginBottom: 0 }}>
          <label htmlFor="reseau">{QUESTIONS.reseau}</label>
          <input type="text" id="reseau" maxLength={80} value={valeur.reseau} onChange={(e) => set("reseau", e.target.value)} placeholder="Ex. : nom de votre réseau" />
        </div>
      )}

      {visible(valeur, "nbAssureurs") && radio("nbAssureurs")}
      {visible(valeur, "partAssureurs") && radio("partAssureurs")}

      {visible(valeur, "compagnons") && (
        <div className="form-group" style={{ marginTop: 18, marginBottom: 0 }}>
          <label htmlFor="compagnons">{QUESTIONS.compagnons}</label>
          <select id="compagnons" value={valeur.compagnons} onChange={(e) => set("compagnons", e.target.value)}>
            <option value="">Sélectionner…</option>
            {OPTIONS.compagnons.map(([v, lib]) => <option key={v} value={v}>{lib}</option>)}
          </select>
        </div>
      )}

      {visible(valeur, "derniereHausse") && radio("derniereHausse")}
      {visible(valeur, "delaiPaiement") && radio("delaiPaiement")}
      {visible(valeur, "baremes2027") && radio("baremes2027")}

      {visible(valeur, "baremes2027") && (
        <div className="form-group" style={{ marginTop: 18, marginBottom: 0 }}>
          <label htmlFor="fichier">Une page de barème ou de convention (photo ou PDF) — facultatif</label>
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
        <button className="btn-next" onClick={onSuivant} disabled={erreurs.length > 0 || preparation}>Étape suivante →</button>
      </div>
    </div>
  );
}
