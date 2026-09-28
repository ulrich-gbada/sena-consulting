// app/lib/branches.ts
// -----------------------------------------------------------------------------
// Registre des branches « Activité » du formulaire d'audit.
// Règle (décision d'Ulrich du 28/09/2026) : chaque segment dont l'offre est
// construite et validée — plaquette + exemple concret publié dans /realisations —
// reçoit une branche : questions qualifiantes, score, mails adaptés, lien vers
// le cas concret. Pour ajouter une branche : créer app/lib/<branche>.ts sur le
// modèle de formation.ts, l'inscrire dans BRANCHES et dans CAS ci-dessous.
// -----------------------------------------------------------------------------

import { type Branche, type Reponses } from "./branche";
import { BRANCHE_CARROSSERIE, SECTEUR_CARROSSERIE, estAgree } from "./carrosserie";
import { BRANCHE_FORMATION, SECTEUR_FORMATION } from "./formation";

export const BRANCHES: Branche[] = [BRANCHE_CARROSSERIE, BRANCHE_FORMATION];

/** Branche associée à un secteur du formulaire, ou null (parcours standard). */
export const branchePour = (secteur: string | undefined | null): Branche | null =>
  BRANCHES.find((b) => b.secteur === secteur) ?? null;

/** Branche associée à une valeur de ?offre= (liens e-mail, QR code de plaquette). */
export const branchePourOffre = (offre: string | null): Branche | null =>
  BRANCHES.find((b) => b.offre === offre) ?? null;

// ── Cas concret joint au mail de confirmation (SPECS v1.1 §2) ───────────────
const SITE = "https://www.sena-consulting.fr";
const CAS: Record<"agrements" | "formation" | "audit", { slug: string; phrase: string }> = {
  agrements: { slug: "bilan-agrements-carrosserie-mystere",
    phrase: "Pour voir à quoi ressemble un Bilan, voici un exemple complet sur une carrosserie fictive :" },
  formation: { slug: "bilan-financements-linea-formation",
    phrase: "Pour voir à quoi ressemble un Bilan Financements, voici un exemple complet sur un organisme de formation fictif :" },
  audit: { slug: "audit-strategique-pizzeria-bella-nocta",
    phrase: "Pour voir à quoi ressemble un audit, voici un exemple complet sur une entreprise fictive :" },
};

/**
 * Cas concret à citer dans le mail de confirmation, ou null (aucun lien).
 * - Garagiste / Carrossier : lien UNIQUEMENT si l'atelier fait de la carrosserie et est agréé (direct ou réseau).
 *   Non agréé, mécanique seule ou réponses absentes : null.
 * - Organisme de formation : Bilan Financements (quelles que soient les réponses — décision v1.1 §2.1).
 * - Tout autre secteur (y compris « Autre : … ») : audit stratégique.
 * `existe` permet de vérifier que le slug est bien publié (getRealisation) ; sinon null.
 */
export function casConcretPour(
  secteur: string,
  r: Reponses | null,
  existe: (slug: string) => boolean = () => true,
): { url: string; phrase: string } | null {
  let cle: keyof typeof CAS;
  if (secteur === SECTEUR_CARROSSERIE) {
    if (!r || r.carrosserie !== "oui" || !estAgree(r)) return null;
    cle = "agrements";
  } else if (secteur === SECTEUR_FORMATION) {
    cle = "formation";
  } else {
    cle = "audit";
  }
  const { slug, phrase } = CAS[cle];
  if (!existe(slug)) return null;
  const q = new URLSearchParams({ utm_source: "mail_confirmation", utm_medium: "email", utm_campaign: slug });
  return { url: `${SITE}/realisations/${slug}?${q.toString()}`, phrase };
}
