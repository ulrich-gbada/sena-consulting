"use client";

import { useState, useEffect, useRef } from "react";

// ─── Saisie d'adresse assistée par la Base Adresse Nationale ────────────────
// API publique de l'État (api-adresse.data.gouv.fr) : gratuite, sans clé.
// Même mécanique que le formulaire SenaLink, habillée pour le thème clair.
// Un repli manuel reste offert pour les lieux absents de la base.

export type Adresse = {
  label: string;
  nom: string;
  codePostal: string;
  ville: string;
  lat: string;
  lon: string;
};

const VIDE: Adresse = { label: "", nom: "", codePostal: "", ville: "", lat: "", lon: "" };

export default function ChampAdresse({
  valeur,
  onChange,
}: {
  valeur: Adresse;
  onChange: (a: Adresse) => void;
}) {
  const [manuel, setManuel] = useState(false);
  const [saisie, setSaisie] = useState(valeur.label);
  const [suggestions, setSuggestions] = useState<Adresse[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [charge, setCharge] = useState(false);
  const [surligne, setSurligne] = useState(-1);
  const boite = useRef<HTMLDivElement>(null);

  // Recherche différée (300 ms) : une requête par frappe saturerait l'API.
  useEffect(() => {
    if (manuel || saisie.length < 4 || saisie === valeur.label) { setSuggestions([]); return; }
    const stop = new AbortController();
    const t = setTimeout(async () => {
      setCharge(true);
      try {
        const r = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(saisie)}&limit=6`,
          { signal: stop.signal }
        );
        const j = await r.json();
        setSuggestions((j.features || []).map((f: any) => ({
          label: f.properties.label,
          nom: f.properties.name || f.properties.label,
          codePostal: f.properties.postcode || "",
          ville: f.properties.city || "",
          lat: String(f.geometry.coordinates[1]),
          lon: String(f.geometry.coordinates[0]),
        })));
        setOuvert(true); setSurligne(-1);
      } catch { /* requête annulée ou réseau indisponible : le repli manuel reste */ }
      finally { setCharge(false); }
    }, 300);
    return () => { clearTimeout(t); stop.abort(); };
  }, [saisie, valeur.label, manuel]);

  // Fermeture au clic hors du champ
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (boite.current && !boite.current.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const retenir = (s: Adresse) => {
    setSaisie(s.label); setOuvert(false); setSuggestions([]); onChange(s);
  };

  // Une seule suggestion : retenue d'office.
  useEffect(() => {
    if (suggestions.length === 1 && ouvert) retenir(suggestions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions, ouvert]);

  const auClavier = (e: React.KeyboardEvent) => {
    if (!ouvert || suggestions.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSurligne((i) => (i + 1) % suggestions.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSurligne((i) => (i - 1 + suggestions.length) % suggestions.length); }
    else if (e.key === "Enter" && surligne >= 0) { e.preventDefault(); retenir(suggestions[surligne]); }
    else if (e.key === "Escape") setOuvert(false);
  };

  const basculerManuel = (m: boolean) => {
    setManuel(m); setOuvert(false); setSuggestions([]);
    setSaisie(""); onChange(VIDE);
  };

  const IconPin = () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <div ref={boite} className="adresse-wrap">
      <style>{`
        .adresse-wrap { position: relative; }
        .adresse-input-wrap { position: relative; }
        .adresse-input-wrap input { padding-right: 40px !important; }
        .adresse-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #8A9BB0; display: flex; pointer-events: none; }
        .adresse-icon.ok { color: #2e7d32; }
        .adresse-spin { animation: adresseSpin 0.8s linear infinite; }
        @keyframes adresseSpin { to { transform: rotate(360deg); } }
        .adresse-list { position: absolute; z-index: 20; left: 0; right: 0; margin: 4px 0 0; padding: 0; list-style: none; background: #fff; border: 1px solid #e0e4ea; border-radius: 8px; overflow: hidden; box-shadow: 0 12px 32px rgba(27,42,62,0.15); }
        .adresse-list button { width: 100%; text-align: left; padding: 10px 14px; background: none; border: none; cursor: pointer; font-family: inherit; display: block; }
        .adresse-list button.hl, .adresse-list button:hover { background: rgba(201,168,76,0.12); }
        .adresse-nom { display: block; font-size: 14px; color: #1B2A3E; }
        .adresse-ville { display: block; font-size: 12px; color: #8A9BB0; }
        .adresse-ok { display: flex; align-items: flex-start; gap: 8px; margin-top: 8px; padding: 10px 12px; background: #f1f8f3; border: 1px solid rgba(46,125,50,0.3); border-radius: 6px; font-size: 13px; color: #2E4A6B; line-height: 1.5; }
        .adresse-ok small { color: #8A9BB0; display: block; }
        .adresse-lien { background: none; border: none; padding: 0; margin-top: 8px; cursor: pointer; font-family: inherit; font-size: 12px; color: #8A9BB0; text-decoration: underline; }
        .adresse-lien:hover { color: #C9A84C; }
        .adresse-manuel-row { display: grid; grid-template-columns: 1fr 2fr; gap: 12px; margin-top: 12px; }
        @media (max-width: 480px) { .adresse-manuel-row { grid-template-columns: 1fr; } }
      `}</style>

      {!manuel ? (
        <>
          <div className="adresse-input-wrap">
            <input
              type="text"
              id="address"
              value={saisie}
              onChange={(e) => { setSaisie(e.target.value); if (valeur.label) onChange(VIDE); }}
              onKeyDown={auClavier}
              onFocus={() => !valeur.label && suggestions.length > 0 && setOuvert(true)}
              placeholder="Adresse, lieu-dit, ville…"
              autoComplete="off"
              role="combobox"
              aria-expanded={ouvert}
              aria-autocomplete="list"
            />
            <span className={`adresse-icon ${valeur.lat ? "ok" : ""}`} aria-hidden="true">
              {charge ? (
                <svg className="adresse-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : <IconPin />}
            </span>
          </div>

          {ouvert && suggestions.length > 0 && (
            <ul role="listbox" className="adresse-list">
              {suggestions.map((s, i) => (
                <li key={s.label + i} role="option" aria-selected={i === surligne}>
                  <button type="button" className={i === surligne ? "hl" : ""} onClick={() => retenir(s)} onMouseEnter={() => setSurligne(i)}>
                    <span className="adresse-nom">{s.nom}</span>
                    <span className="adresse-ville">{s.codePostal} {s.ville}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {valeur.lat && (
            <div className="adresse-ok">
              <span style={{ color: "#2e7d32" }}>✓</span>
              <span>{valeur.nom}<small>{valeur.codePostal} {valeur.ville}</small></span>
            </div>
          )}

          <button type="button" className="adresse-lien" onClick={() => basculerManuel(true)}>
            Mon adresse n'apparaît pas — la saisir manuellement
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            id="address"
            value={valeur.nom}
            onChange={(e) => onChange({ ...valeur, nom: e.target.value, label: e.target.value })}
            placeholder="Ex : 12 rue des Lilas, Zone artisanale…"
          />
          <div className="adresse-manuel-row">
            <input type="text" value={valeur.codePostal} onChange={(e) => onChange({ ...valeur, codePostal: e.target.value })} placeholder="Code postal" maxLength={5} aria-label="Code postal" />
            <input type="text" value={valeur.ville} onChange={(e) => onChange({ ...valeur, ville: e.target.value })} placeholder="Ville" aria-label="Ville" />
          </div>
          <button type="button" className="adresse-lien" onClick={() => basculerManuel(false)}>
            ← Revenir à la recherche d'adresse
          </button>
        </>
      )}
    </div>
  );
}
