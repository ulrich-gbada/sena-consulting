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
        SENA CONSULTING, entreprise individuelle de M. Ulrich GBADA, 25 rue Jeanne Gleuzer, 92700 Colombes — SIREN 883 493 702 —{" "}
        <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a>. Aucun délégué à la protection des données n&apos;est désigné ;
        toute demande est traitée par le responsable du traitement.
      </p>

      <h2>Données collectées</h2>
      <p>
        <strong>Formulaire de demande d&apos;audit.</strong> Nom, nom, adresse e-mail, société, téléphone, adresse, taille de l&apos;entreprise,
        chiffre d&apos;affaires, secteur d&apos;activité et attentes exprimées. Pour les carrossiers et garagistes : informations
        sur l&apos;activité de l&apos;atelier (agréments, nombre d&apos;assureurs, délais de paiement, sinistres, cession de créance, avis clients…) et, si vous en joignez une,
        une page de barème ou de convention. Pour les organismes de formation : informations sur l&apos;activité de
        l&apos;organisme (certification Qualiopi, part du CPF, prix moyens, évolution des inscriptions…) et, si vous en joignez
        un, votre catalogue tarifaire ou une fiche formation. Pour les hôtels et hébergements : informations sur
        l&apos;activité de l&apos;établissement (type, nombre de chambres, part des plateformes, participation au programme
        Genius, réservation directe…) et, si vous en joignez un, un relevé de commissions ou une facture de plateforme. Pour
        les opérateurs d&apos;activités : informations sur l&apos;activité (catégorie, nombre de participants, part des
        plateformes, bons cadeaux, réservation directe…) et, si vous en joignez un, un relevé de paiement de plateforme.
        Pour les restaurants : informations sur l&apos;activité (type d&apos;établissement, part de la livraison, formule et
        promotions des plateformes, prix en livraison, commande directe…) et, si vous en joignez un, un relevé de versement
        de plateforme. Pour les entreprises du bâtiment : informations sur l&apos;entreprise (effectif, type de clients,
        retards de paiement, retenues de garantie, devis sans réponse) et, le cas échéant, l&apos;identifiant de prospection
        figurant dans le lien que vous avez suivi. Pour les sociétés de sécurité privée : informations sur la société (effectif,
        compte Dracar, vérification des cartes professionnelles, contrats de vacation…) ; aucune donnée nominative d&apos;agent
        n&apos;est demandée. Ces pièces ne sont pas stockées sur le site : elles sont
        transmises par e-mail à SENA CONSULTING uniquement.
      </p>
      <p>
        <strong>Adresse d&apos;exercice.</strong> Pour vous aider à saisir votre adresse, le formulaire interroge la Base Adresse
        Nationale (api-adresse.data.gouv.fr, service public français) avec le texte que vous tapez ; seules les coordonnées
        géographiques de l&apos;adresse retenue sont transmises à SENA CONSULTING.
      </p>
      <p>
        <strong>Liens de campagne.</strong> Les liens que nous diffusons (e-mail, courrier, QR code de plaquette) peuvent contenir
        une source (<code>src</code>), une offre et un identifiant de prospection (<code>id</code>) : ils servent uniquement à savoir par
        quel canal vous nous avez trouvés et sont repris dans le lien de prise de rendez-vous.
      </p>
      <p>
        <strong>Newsletter.</strong> Prénom, nom et adresse e-mail, avec votre consentement, pour vous annoncer nos nouveaux cas
        concrets. Chaque envoi contient un lien de désinscription.
      </p>
      <p>
        <strong>Prise de rendez-vous.</strong> Le pré-diagnostic se réserve sur Calendly, service tiers soumis à sa propre politique de
        confidentialité ; le lien est prérempli avec votre nom, votre e-mail et votre société pour vous éviter de les ressaisir.
      </p>

      <h2>Finalité et base légale</h2>
      <p>
        Les données du formulaire servent exclusivement à traiter votre demande d&apos;audit, à préparer le pré-diagnostic et à vous
        recontacter : le traitement repose sur l&apos;exécution de mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD).
        La newsletter repose sur votre consentement (art. 6.1.a), que vous pouvez retirer à tout moment. Aucune décision automatisée
        n&apos;est prise : le score de priorité calculé à partir de vos réponses sert uniquement à préparer l&apos;appel.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données d&apos;une demande d&apos;audit sont conservées pendant la durée nécessaire à son traitement, puis au maximum 3 ans
        après votre dernier contact. Les abonnés à la newsletter sont conservés jusqu&apos;à leur désinscription. Les pièces jointes
        transmises par e-mail sont supprimées à la fin de la mission ou, sans mission, dans les 3 mois suivant la demande.
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées à SENA CONSULTING uniquement ; elles ne sont ni vendues ni transmises à des tiers à des fins
        commerciales. Pour fonctionner, le site s&apos;appuie sur des prestataires qui traitent les données pour notre compte :
      </p>
      <ul>
        <li><strong>Vercel Inc.</strong> (États-Unis) — hébergement du site et exécution du formulaire ; transferts hors Union européenne
          encadrés par les clauses contractuelles types de la Commission européenne.</li>
        <li><strong>Resend</strong> — envoi des e-mails (notification interne, confirmation, newsletter) ; données traitées dans la région
          Union européenne.</li>
        <li><strong>O2switch</strong> (France) — boîtes e-mail de SENA CONSULTING, où arrivent les demandes.</li>
        <li><strong>Base Adresse Nationale</strong> (service public français) — aide à la saisie de l&apos;adresse.</li>
        <li><strong>Calendly</strong> — prise de rendez-vous, sur son propre site, selon sa propre politique.</li>
      </ul>

      <h2>Cookies et mesure d&apos;audience</h2>
      <p>
        Un bandeau vous permet, à votre première visite, d&apos;accepter, de refuser ou de paramétrer les cookies. Votre choix est
        mémorisé dans votre navigateur (clé <code>sena-consulting-cookies</code>, sans donnée personnelle) et peut être modifié en
        effaçant les données du site. Les cookies essentiels, nécessaires au fonctionnement des pages, ne peuvent pas être désactivés.
        Les cookies d&apos;analyse ne sont déposés qu&apos;avec votre accord ; à ce jour, aucun outil de mesure d&apos;audience ni aucun
        service publicitaire n&apos;est installé sur le site.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition.
        Pour l&apos;exercer : <a href="mailto:contact@sena-consulting.fr">contact@sena-consulting.fr</a> ou par courrier à l&apos;adresse
        du siège. Nous répondons sous un mois. Vous pouvez également introduire une réclamation auprès de la CNIL
        (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
      </p>

      <h2>Mise à jour</h2>
      <p>Dernière mise à jour : 30 septembre 2026. Cette politique évolue avec les offres du site ; la version en ligne fait foi.</p>
    </PageShell>
  );
}
