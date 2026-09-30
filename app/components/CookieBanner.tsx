"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Bandeau cookies — même mécanique que SenaLink (components/CookieBanner.tsx) :
// choix mémorisé dans localStorage (`sena-consulting-cookies`), trois actions
// (Tout accepter / Tout refuser / Paramétrer), catégories essentiels + analyse.
// Aucun outil d'analyse n'est installé à ce jour : la préférence est enregistrée
// pour le jour où il y en aura un, et rien n'est déposé sans accord.

const CLE = "sena-consulting-cookies";
type Prefs = { essential: true; analytics: boolean };

export function consentementCookies(): Prefs | null {
  try {
    const v = localStorage.getItem(CLE);
    return v ? (JSON.parse(v) as Prefs) : null;
  } catch { return null; }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [parametrer, setParametrer] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ essential: true, analytics: false });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!consentementCookies()) setVisible(true);
  }, []);

  const enregistrer = (p: Prefs) => {
    try { localStorage.setItem(CLE, JSON.stringify(p)); } catch { /* navigation privée : le bandeau reviendra */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .ck-wrap { position: fixed; bottom: 0; left: 0; right: 0; z-index: 1500; padding: 16px; }
        .ck-box { max-width: 760px; margin: 0 auto; background: #14213a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.45); padding: 22px 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
        .ck-text { color: rgba(244,245,247,0.72); font-size: 14px; line-height: 1.65; margin: 0 0 16px; }
        .ck-text a { color: #C9A84C; text-decoration: none; }
        .ck-text a:hover { text-decoration: underline; }
        .ck-btns { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .ck-accept { background: #C9A84C; color: #1B2A3E; font-weight: 700; font-size: 14px; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-family: inherit; }
        .ck-accept:hover { background: #e8c96a; }
        .ck-refuse { background: transparent; color: rgba(244,245,247,0.72); font-weight: 500; font-size: 14px; padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); cursor: pointer; font-family: inherit; }
        .ck-refuse:hover { border-color: rgba(255,255,255,0.4); }
        .ck-link { background: none; border: none; color: rgba(244,245,247,0.4); font-size: 14px; padding: 10px 12px; cursor: pointer; text-decoration: underline; font-family: inherit; }
        .ck-link:hover { color: #F4F5F7; }
        .ck-h3 { color: #F4F5F7; font-size: 16px; font-weight: 700; margin: 0 0 14px; }
        .ck-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-bottom: 10px; }
        .ck-row p { margin: 0; }
        .ck-row .t { color: #F4F5F7; font-size: 14px; font-weight: 500; }
        .ck-row .d { color: rgba(244,245,247,0.4); font-size: 12px; margin-top: 2px; }
        .ck-switch { width: 40px; height: 20px; border-radius: 10px; border: none; padding: 0 2px; flex-shrink: 0; cursor: pointer; display: flex; align-items: center; transition: background 0.2s; }
        .ck-switch.on { background: #C9A84C; } .ck-switch.off { background: rgba(255,255,255,0.2); } .ck-switch.fixed { background: #C9A84C; cursor: default; }
        .ck-knob { width: 16px; height: 16px; background: #fff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3); transition: transform 0.2s; }
        .ck-switch.on .ck-knob, .ck-switch.fixed .ck-knob { transform: translateX(20px); }
        .ck-accept, .ck-refuse { white-space: nowrap; }
        @media (max-width: 480px) { .ck-wrap { padding: 10px; } .ck-box { padding: 18px 16px; } .ck-accept, .ck-refuse { flex: 1; text-align: center; padding: 10px 14px; } }
      `}</style>
      <div className="ck-wrap" role="dialog" aria-label="Cookies" aria-live="polite">
        <div className="ck-box">
          {!parametrer ? (
            <>
              <p className="ck-text">
                SENA CONSULTING utilise des cookies techniques nécessaires au fonctionnement du site.
                Avec votre accord, nous pourrons également utiliser des cookies d&apos;analyse pour améliorer votre expérience.{" "}
                <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
              </p>
              <div className="ck-btns">
                <button type="button" className="ck-accept" onClick={() => enregistrer({ essential: true, analytics: true })}>Tout accepter</button>
                <button type="button" className="ck-refuse" onClick={() => enregistrer({ essential: true, analytics: false })}>Tout refuser</button>
                <button type="button" className="ck-link" onClick={() => setParametrer(true)}>Paramétrer</button>
              </div>
            </>
          ) : (
            <>
              <h3 className="ck-h3">Paramétrer les cookies</h3>
              <div className="ck-row">
                <div>
                  <p className="t">Cookies essentiels</p>
                  <p className="d">Nécessaires au fonctionnement du site — ne peuvent pas être désactivés</p>
                </div>
                <div className="ck-switch fixed" aria-hidden="true"><span className="ck-knob" /></div>
              </div>
              <div className="ck-row">
                <div>
                  <p className="t">Cookies d&apos;analyse</p>
                  <p className="d">Nous aident à comprendre comment vous utilisez le site</p>
                </div>
                <button type="button" role="switch" aria-checked={prefs.analytics} aria-label="Cookies d'analyse"
                  className={`ck-switch ${prefs.analytics ? "on" : "off"}`}
                  onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}>
                  <span className="ck-knob" />
                </button>
              </div>
              <div className="ck-btns" style={{ marginTop: 16 }}>
                <button type="button" className="ck-accept" onClick={() => enregistrer(prefs)}>Enregistrer mes préférences</button>
                <button type="button" className="ck-link" style={{ textDecoration: "none" }} onClick={() => setParametrer(false)}>← Retour</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
