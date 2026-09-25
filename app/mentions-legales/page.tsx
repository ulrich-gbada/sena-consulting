import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Mentions légales — SENA CONSULTING",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <PageShell tag="Informations légales" title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        SENA CONSULTING<br />
        Contact : <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a> · 07 68 93 48 37
      </p>

      <h2>Directeur de la publication</h2>
      <p>Ulrich GBADA</p>

      <h2>Hébergement</h2>
      <p>
        Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, visuels, logo, structure) est la propriété de SENA CONSULTING
        et ne peut être reproduit sans autorisation préalable écrite.
      </p>

      <div className="placeholder">
        À compléter : forme juridique, capital, SIREN/SIRET, adresse du siège, numéro de TVA intracommunautaire.
      </div>
    </PageShell>
  );
}
