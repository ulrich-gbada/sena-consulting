import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Politique de confidentialité — SENA CONSULTING",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <PageShell tag="Protection des données" title="Politique de confidentialité">
      <h2>Responsable du traitement</h2>
      <p>
        SENA CONSULTING — <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a>
      </p>

      <h2>Données collectées</h2>
      <p>
        Via le formulaire de demande d&apos;audit : nom, adresse e-mail, société, téléphone, adresse, taille de l&apos;entreprise,
        chiffre d&apos;affaires, secteur d&apos;activité et attentes exprimées.
      </p>

      <h2>Finalité et base légale</h2>
      <p>
        Ces données servent exclusivement à traiter votre demande d&apos;audit et à vous recontacter.
        Le traitement repose sur votre consentement et sur l&apos;exécution de mesures précontractuelles.
      </p>

      <h2>Durée de conservation</h2>
      <p>Les données sont conservées pendant la durée nécessaire au traitement de la demande, puis au maximum 3 ans sans contact de votre part.</p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition.
        Pour l&apos;exercer : <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a>.
      </p>

      <div className="placeholder">
        À compléter : sous-traitants (hébergeur, service d&apos;envoi d&apos;e-mails), cookies et outils de mesure d&apos;audience éventuels.
      </div>
    </PageShell>
  );
}
