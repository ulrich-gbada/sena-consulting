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
        SENA CONSULTING — entreprise individuelle de M. Ulrich GBADA (GBADA Yaovi Ulrich Candide)<br />
        Siège : 25 rue Jeanne Gleuzer, 92700 Colombes, France<br />
        SIREN 883 493 702 · SIRET 883 493 702 00038 · code APE 7022Z (conseil pour les affaires et autres conseils de gestion)<br />
        TVA non applicable, art. 293 B du CGI (franchise en base)<br />
        Contact : <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a> · 07 68 93 48 37
      </p>

      <h2>Directeur de la publication</h2>
      <p>Ulrich GBADA, fondateur de SENA CONSULTING.</p>

      <h2>Hébergement</h2>
      <p>
        Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
        Le nom de domaine et les adresses e-mail sont gérés par O2switch (SAS), 222-224 boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, visuels, logos, structure, cas concrets et documents téléchargeables) est la
        propriété de SENA CONSULTING et ne peut être reproduit, en tout ou partie, sans autorisation préalable écrite. Les noms
        d&apos;offres (Bilan Agréments, Plan Libre Choix, Bilan Financements, Bilan Commissions, Plan Argent Dormant, Pack Dracar Express,
        Veille Titres, Bilan Vacations 6 h, Plein Phare, Acomptis, Mandatis) désignent des prestations de SENA CONSULTING.
      </p>

      <h2>Cas concrets et exemples</h2>
      <p>
        Les cas concrets publiés dans la rubrique Réalisations portent sur des entreprises fictives ; leurs chiffres sont construits
        sur des ordres de grandeur du secteur et ne représentent aucune entreprise réelle. Les gains présentés sont des estimations :
        ils dépendent de la mise en œuvre par le client et ne sont pas garantis, sauf mention expresse d&apos;une garantie dans l&apos;offre.
      </p>

      <h2>Informations réglementaires</h2>
      <p>
        SENA CONSULTING n&apos;est ni un organisme agréé par le CNAPS, ni un cabinet d&apos;avocats, ni un expert-comptable : les
        informations juridiques ou réglementaires figurant sur ce site sont des informations générales, pas un avis juridique.
        SENA CONSULTING ne procède à aucun recouvrement de créances pour le compte d&apos;autrui et ne négocie jamais à la place
        de ses clients.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données collectées sur ce site est décrit dans la{" "}
        <a href="/politique-de-confidentialite">politique de confidentialité</a>.
      </p>
    </PageShell>
  );
}
