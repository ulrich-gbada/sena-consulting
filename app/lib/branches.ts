// app/lib/branches.ts
// -----------------------------------------------------------------------------
// Registre des branches « Activité » du formulaire d'audit.
// Règle (décision d'Ulrich du 28/09/2026) : chaque segment dont l'offre est
// construite et validée — plaquette + exemple concret publié dans /realisations —
// reçoit une branche : questions qualifiantes, score, mails adaptés, lien vers
// le cas concret. Pour ajouter une branche : créer app/lib/<branche>.ts sur le
// modèle de formation.ts, l'inscrire dans BRANCHES et dans CAS ci-dessous.
// -----------------------------------------------------------------------------

import { type Branche, type Reponses, offreDe } from "./branche";
import { BRANCHE_CARROSSERIE, SECTEUR_CARROSSERIE, OFFRE_BILAN, OFFRE_LIBRE_CHOIX } from "./carrosserie";
import { BRANCHE_FORMATION, SECTEUR_FORMATION } from "./formation";
import { BRANCHE_HOTELLERIE, SECTEUR_HOTELLERIE, OFFRE_ACTIVITES, estRestaurant } from "./hotellerie";
import { BRANCHE_RESTAURATION, SECTEUR_RESTAURATION } from "./restauration";
import { BRANCHE_BTP, SECTEUR_BTP } from "./btp";

export const BRANCHES: Branche[] = [BRANCHE_CARROSSERIE, BRANCHE_FORMATION, BRANCHE_HOTELLERIE, BRANCHE_RESTAURATION, BRANCHE_BTP];

/** Branche associée à un secteur du formulaire, ou null (parcours standard). */
export const branchePour = (secteur: string | undefined | null): Branche | null =>
  BRANCHES.find((b) => b.secteur === secteur) ?? null;

/** Branche (et réponses préremplies) associée à une valeur de ?offre= (liens e-mail, QR code de plaquette). */
export function branchePourOffre(offre: string | null): { branche: Branche; activite: Reponses } | null {
  if (!offre) return null;
  for (const b of BRANCHES) {
    const so = b.sousOffres?.find((o) => o.offre === offre);
    if (so) return { branche: b, activite: so.activite ?? {} };
    if (b.offre === offre) return { branche: b, activite: {} };
  }
  return null;
}

// ── Cas concret joint au mail de confirmation (SPECS v1.1 §2) ───────────────
const SITE = "https://www.sena-consulting.fr";
type CleCas = "agrements" | "libreChoix" | "formation" | "hotel" | "activites" | "restauration" | "btp" | "audit";
const CAS: Record<CleCas, { slug: string; phrase: string }> = {
  agrements: { slug: "bilan-agrements-carrosserie-mystere",
    phrase: "Pour voir à quoi ressemble un Bilan, voici un exemple complet sur une carrosserie fictive :" },
  libreChoix: { slug: "plan-libre-choix-carrosserie-mystere",
    phrase: "Pour voir à quoi ressemble un Plan Libre Choix, voici un exemple complet sur une carrosserie fictive :" },
  formation: { slug: "bilan-financements-linea-formation",
    phrase: "Pour voir à quoi ressemble un Bilan Financements, voici un exemple complet sur un organisme de formation fictif :" },
  hotel: { slug: "bilan-commissions-hotel-des-tilleuls",
    phrase: "Pour voir à quoi ressemble un Bilan Commissions, voici un exemple complet sur un hôtel fictif :" },
  activites: { slug: "bilan-commissions-activites-lumiere-tours",
    phrase: "Pour voir à quoi ressemble un Bilan Commissions · Activités, voici un exemple complet sur un opérateur fictif :" },
  restauration: { slug: "bilan-commissions-restauration-pizzeria-il-forno",
    phrase: "Pour voir à quoi ressemble un Bilan Commissions · Restauration, voici un exemple complet sur un restaurant fictif :" },
  btp: { slug: "plan-argent-dormant-mystere-plomberie-chauffage",
    phrase: "Pour voir à quoi ressemble un Plan Argent Dormant, voici un exemple complet sur une entreprise fictive :" },
  audit: { slug: "audit-strategique-pizzeria-bella-nocta",
    phrase: "Pour voir à quoi ressemble un audit, voici un exemple complet sur une entreprise fictive :" },
};

/**
 * Cas concret à citer dans le mail de confirmation, ou null (aucun lien).
 * - Garagiste / Carrossier : agréé (direct ou réseau) → Bilan Agréments ; non agréé → Plan Libre Choix (depuis le 29/09/2026,
 *   publication de la plaquette et du cas concret) ; mécanique seule ou réponses absentes → null.
 * - Organisme de formation : Bilan Financements (quelles que soient les réponses — décision v1.1 §2.1).
 * - Hôtellerie / Tourisme : opérateur d'activités → Lumière Tours ; restaurant seul → Pizzeria Il Forno ; sinon Hôtel des Tilleuls
 *   (tout répondant, y compris HORS CIBLE — SPECS Hôtellerie H-D5).
 * - Restauration : Pizzeria Il Forno. BTP : Mystère Plomberie Chauffage.
 * - Tout autre secteur (y compris « Autre : … ») : audit stratégique.
 * `existe` permet de vérifier que le slug est bien publié (getRealisation) ; sinon null.
 */
export function casConcretPour(
  secteur: string,
  r: Reponses | null,
  existe: (slug: string) => boolean = () => true,
): { url: string; phrase: string } | null {
  let cle: CleCas;
  if (secteur === SECTEUR_CARROSSERIE) {
    const o = offreDe(BRANCHE_CARROSSERIE, r).offre;
    if (!r || r.carrosserie !== "oui") return null;
    if (o === OFFRE_BILAN) cle = "agrements";
    else if (o === OFFRE_LIBRE_CHOIX) cle = "libreChoix";
    else return null;
  } else if (secteur === SECTEUR_FORMATION) {
    cle = "formation";
  } else if (secteur === SECTEUR_HOTELLERIE) {
    if (r && estRestaurant(r)) cle = "restauration";
    else if (r && (r.typeEtab === "activite" || offreDe(BRANCHE_HOTELLERIE, r).offre === OFFRE_ACTIVITES)) cle = "activites";
    else cle = "hotel";
  } else if (secteur === SECTEUR_RESTAURATION) {
    cle = "restauration";
  } else if (secteur === SECTEUR_BTP) {
    cle = "btp";
  } else {
    cle = "audit";
  }
  const { slug, phrase } = CAS[cle];
  if (!existe(slug)) return null;
  const q = new URLSearchParams({ utm_source: "mail_confirmation", utm_medium: "email", utm_campaign: slug });
  return { url: `${SITE}/realisations/${slug}?${q.toString()}`, phrase };
}
