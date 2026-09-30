import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Conditions générales de vente — SENA CONSULTING",
  robots: { index: false },
};

// Conditions générales de vente des prestations de conseil (version du 30/09/2026).
// Les prix et garanties par offre viennent des plaquettes ; ils sont repris ici
// dans un tableau unique pour être modifiés en un point.
const OFFRES: { offre: string; prix: string; delai: string; garantie: string }[] = [
  { offre: "Bilan Agréments Assureurs (carrossiers agréés)", prix: "190 € à la remise du dossier, puis 30 % du gain obtenu la 1re année (190 € déduits), payés en 3 prélèvements, seulement si un avenant est signé avec l'assureur", delai: "7 jours ouvrés après réception des pièces", garantie: "Si aucun avenant n'est signé, seuls les 190 € restent dus" },
  { offre: "Plan Libre Choix (carrossiers non agréés)", prix: "600 €, en 3 prélèvements de 200 € (signature, J30, J60)", delai: "Installation en 7 jours, suivi à 30, 60 et 90 jours", garantie: "300 € remboursés si moins de 3 dossiers en cession de créance à 90 jours, kit appliqué" },
  { offre: "Bilan Financements (organismes de formation)", prix: "790 € (tarif de lancement, 5 premiers organismes), puis 1 290 €, réglés à la commande", delai: "5 jours ouvrés après réception des pièces", garantie: "—" },
  { offre: "Bilan Commissions (hôtels)", prix: "890 € (tarif de lancement, 5 premiers hôtels), puis 1 490 €, réglés à la commande", delai: "5 jours ouvrés après réception des pièces", garantie: "—" },
  { offre: "Bilan Commissions · Activités", prix: "690 € (tarif de lancement, 5 premiers opérateurs), puis 990 €, réglés à la commande", delai: "5 jours ouvrés après réception des pièces", garantie: "—" },
  { offre: "Bilan Commissions · Restauration · Express 72 h", prix: "490 € (tarif de lancement), puis 790 €, réglés à la commande", delai: "72 heures ouvrées après réception des pièces", garantie: "—" },
  { offre: "Plan Argent Dormant (bâtiment)", prix: "490 € (tarif de lancement, 10 premières entreprises), puis 790 €, réglés à la commande", delai: "3 jours ouvrés après réception des 4 exports", garantie: "Remboursement intégral si moins de 5 000 € de factures, retenues et travaux à encaisser (hors devis) sont identifiés" },
  { offre: "Pack Dracar Express (sécurité privée)", prix: "290 € (tarif de lancement, 10 premières sociétés), puis 490 € ; jusqu'à 30 agents, +8 € par agent au-delà ; réglés à la commande", delai: "72 heures après la visio guidée", garantie: "Livré en 72 h ou remboursé" },
  { offre: "Veille Titres (sécurité privée)", prix: "79 € par mois jusqu'à 30 agents, 149 € jusqu'à 80 ; engagement de 6 mois, prélèvement SEPA ; 1er mois inclus avec le Pack Dracar Express", delai: "Rapport sous 48 h ouvrées après réception de l'export mensuel", garantie: "—" },
  { offre: "Bilan Vacations 6 h (sécurité privée)", prix: "190 € à la remise du dossier, puis 30 % du gain de la 1re année (190 € déduits), en 3 prélèvements SEPA, seulement si l'avenant est signé par le client final", delai: "10 jours ouvrés après réception des contrats", garantie: "Sur un site où le client refuse l'avenant, aucun honoraire variable n'est dû" },
  { offre: "Plein Phare — Kit Inscriptions 2026 (auto-écoles)", prix: "490 € (tarif pilote, 5 premières auto-écoles), puis 690 €, réglés à la commande", delai: "5 jours ouvrés", garantie: "Livré en 5 jours ouvrés ou remboursé" },
  { offre: "Acomptis (événementiel)", prix: "890 € de mise en service puis 79 € par mois sans engagement, ou 290 € puis 129 € par mois avec engagement de 12 mois", delai: "Mise en service sous 48 h", garantie: "Aucune commission sur les encaissements" },
  { offre: "Mandatis (agences immobilières)", prix: "2 500 € de mise en service, puis 490 € par mois, sans engagement de durée", delai: "Opérationnel sous 7 jours ouvrés", garantie: "—" },
];

export default function CgvPage() {
  return (
    <PageShell tag="Informations légales" title="Conditions générales de vente">
      <p>
        Version du 30 septembre 2026. Les présentes conditions s&apos;appliquent à toute prestation de conseil vendue par SENA CONSULTING,
        entreprise individuelle de M. Ulrich GBADA, 25 rue Jeanne Gleuzer, 92700 Colombes, SIREN 883 493 702 (ci-après « le Prestataire »),
        à un client professionnel (ci-après « le Client »). Toute commande vaut acceptation sans réserve des présentes.
      </p>

      <h2>1. Objet et périmètre</h2>
      <p>
        Le Prestataire fournit des prestations de conseil en performance business : diagnostics, bilans chiffrés, plans d&apos;action,
        documents et messages prêts à l&apos;emploi, accompagnement, et, pour Acomptis et Mandatis, la mise à disposition d&apos;un service en
        ligne. Le contenu précis de chaque offre, ses livrables et son délai figurent sur la page de l&apos;offre du site et dans la lettre
        de mission ou le bon de commande. Le Prestataire n&apos;est ni avocat, ni expert-comptable, ni organisme agréé par le CNAPS : les
        informations réglementaires fournies sont des informations générales, pas un avis juridique. Il ne recouvre aucune créance pour le
        compte du Client et ne négocie jamais à sa place : les messages, courriers et avenants sont envoyés et signés par le Client.
      </p>

      <h2>2. Pré-diagnostic</h2>
      <p>
        Le pré-diagnostic de 20 minutes au téléphone est offert et sans engagement. Il permet au Prestataire de dire au Client si
        l&apos;offre vaut le coup pour lui ; le Prestataire peut refuser une commande lorsque l&apos;enjeu identifié ne la justifie pas,
        notamment lorsqu&apos;une garantie de résultat ne pourrait pas être tenue.
      </p>

      <h2>3. Commande</h2>
      <p>
        La commande est ferme à la signature de la lettre de mission ou du bon de commande (un accord écrit par e-mail vaut signature), et,
        pour les offres réglées à la commande, à réception du paiement. Le Client s&apos;engage à transmettre les pièces listées sur la page de
        l&apos;offre ; les délais de livraison courent à compter de la réception de pièces complètes et exploitables.
      </p>

      <h2>4. Prix</h2>
      <p>
        Les prix sont nets, en euros. TVA non applicable, article 293 B du CGI. Les tarifs de lancement sont réservés aux premiers clients
        de chaque offre, dans la limite indiquée ; le tarif applicable est celui affiché sur le site au jour de la commande.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 12 }}>
          <thead>
            <tr style={{ background: "#1B2A3E", color: "#F4F5F7", textAlign: "left" }}>
              {["Offre", "Prix et modalités", "Délai de livraison", "Garantie"].map((h) => <th key={h} style={{ padding: "10px 12px", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {OFFRES.map((o) => (
              <tr key={o.offre} style={{ borderBottom: "1px solid #e6e9ee", verticalAlign: "top" }}>
                <td style={{ padding: "10px 12px", fontWeight: 700, color: "#1B2A3E" }}>{o.offre}</td>
                <td style={{ padding: "10px 12px" }}>{o.prix}</td>
                <td style={{ padding: "10px 12px" }}>{o.delai}</td>
                <td style={{ padding: "10px 12px" }}>{o.garantie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>5. Paiement</h2>
      <p>
        Paiement par virement bancaire (RIB sur la facture ou le bon de commande), par lien de paiement sécurisé ou par prélèvement SEPA
        pour les échéances et abonnements. Les prestations « réglées à la commande » sont payables avant le début des travaux. Les
        honoraires au résultat (Bilan Agréments, Bilan Vacations 6 h) sont calculés sur le gain de la première année constaté à la
        signature de l&apos;avenant, selon la formule indiquée dans la lettre de mission, et facturés en 3 prélèvements ; ils ne sont pas dus
        si aucun avenant n&apos;est signé. Les abonnements (Veille Titres, Acomptis, Mandatis) sont prélevés mensuellement ; sauf engagement
        indiqué, ils sont résiliables à tout moment pour la fin du mois en cours.
      </p>
      <p>
        Toute facture est payable à réception, au plus tard à 30 jours. En cas de retard, sont dus de plein droit des pénalités calculées au
        taux de la Banque centrale européenne majoré de 10 points et une indemnité forfaitaire de recouvrement de 40 € par facture
        (art. L441-10 du Code de commerce). Le Prestataire peut suspendre la prestation jusqu&apos;au paiement.
      </p>

      <h2>6. Garanties</h2>
      <p>
        Le Prestataire garantit ce qui dépend de lui : un livrable complet, remis dans le délai, et les garanties propres à chaque offre
        (tableau ci-dessus). Il ne garantit pas de résultat commercial : un assureur, un client final, une plateforme ou un stagiaire
        restent libres de leurs décisions ; les gains présentés sur le site sont des estimations issues de cas fictifs. Une garantie
        « remboursé » s&apos;exerce par écrit dans les 30 jours suivant la livraison ; le remboursement intervient sous 14 jours.
      </p>

      <h2>7. Obligations du Client</h2>
      <p>
        Le Client fournit des informations exactes et complètes, dans les délais convenus, et reste seul responsable de leur usage. Il
        est responsable de l&apos;envoi des messages, relances et courriers préparés par le Prestataire, et du respect de ses propres
        obligations légales (Code de la consommation, RGPD, réglementation sectorielle). Pour Acomptis et Mandatis, le Client reste
        responsable de traitement des données de ses propres clients ; le Prestataire agit comme sous-traitant au sens de l&apos;article 28
        du RGPD, dans les conditions d&apos;un contrat signé avant toute extraction.
      </p>

      <h2>8. Confidentialité et données</h2>
      <p>
        Les chiffres, fichiers et documents transmis par le Client sont confidentiels, utilisés pour la seule mission, jamais transmis
        à un tiers, et supprimés à la fin de la mission (ou dans les 30 jours suivant la livraison) sauf obligation légale de conservation.
        Le Prestataire s&apos;interdit de solliciter les clients, agents ou salariés du Client dont il aurait eu connaissance pendant la
        mission, pendant 24 mois. Le traitement des données personnelles est décrit dans la{" "}
        <a href="/politique-de-confidentialite">politique de confidentialité</a>.
      </p>

      <h2>9. Propriété des livrables</h2>
      <p>
        Les livrables remis (bilans, plans, messages, argumentaires, registres) deviennent la propriété du Client pour ses besoins
        internes, après paiement complet. Les méthodes, grilles, outils de calcul et modèles du Prestataire restent sa propriété ; le
        Client s&apos;interdit de les diffuser ou de les revendre. Le Prestataire peut faire état de la mission de façon anonyme.
      </p>

      <h2>10. Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L221-3 du Code de la consommation, le Client employant cinq salariés au plus, qui conclut hors
        établissement (à distance ou en visite) un contrat n&apos;entrant pas dans le champ de son activité principale, dispose d&apos;un délai
        de rétractation de 14 jours à compter de la commande. Il peut demander expressément que la prestation commence avant la fin de ce
        délai ; en cas de rétractation après ce commencement, il doit le prix de ce qui a été fourni jusqu&apos;à sa décision. Le formulaire
        de rétractation est joint au bon de commande.
      </p>

      <h2>11. Responsabilité</h2>
      <p>
        La responsabilité du Prestataire est limitée aux dommages directs prouvés et ne peut excéder le montant payé par le Client pour
        la prestation en cause. Le Prestataire n&apos;est pas responsable des décisions prises par le Client, par ses clients, par ses
        fournisseurs ou par les administrations sur la base des livrables, ni des conséquences d&apos;informations inexactes fournies par le Client.
      </p>

      <h2>12. Droit applicable et litiges</h2>
      <p>
        Les présentes sont soumises au droit français. En cas de désaccord, les parties recherchent d&apos;abord une solution amiable.
        À défaut, le litige relève des tribunaux compétents du ressort de Nanterre (Hauts-de-Seine). Les clients ayant la qualité de
        consommateur au sens du Code de la consommation conservent le bénéfice des règles impératives qui les protègent.
      </p>

      <p style={{ marginTop: 32, fontSize: 13, color: "#8A9BB0" }}>
        SENA CONSULTING · contact@sena-consulting.fr · 07 68 93 48 37 · Mentions légales et politique de confidentialité accessibles en pied de page.
      </p>
    </PageShell>
  );
}
