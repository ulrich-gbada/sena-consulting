// app/data/stripe.ts
// -----------------------------------------------------------------------------
// Liens de paiement Stripe des offres actionnables (créés par scripts/stripe-setup.mjs).
// Clé = nom interne de l'offre (= ?offre= du site, = metadata.slug du produit Stripe).
//
// Mode (NEXT_PUBLIC_STRIPE_MODE, variable Vercel) :
//   "live"  → liens LIENS_LIVE ;
//   "test"  → liens LIENS_TEST (bandeau « mode test » sur le bouton) ;
//   absent  → aucun bouton de commande (le site renvoie au pré-diagnostic).
//
// Bascule de palier : quand le quota de lancement d'une offre est atteint, passer
// PALIER_ACTIF[offre] à "standard" et désactiver le lien lancement dans Stripe.
// -----------------------------------------------------------------------------

export type Palier = "lancement" | "standard" | "mensuel";
type Liens = Record<string, Partial<Record<Palier, string>>>;

export const LIENS_TEST: Liens = {
  "bilan-financements":             { lancement: "https://buy.stripe.com/test_cNifZgcCbd0Bfiw6ytaEE00", standard: "https://buy.stripe.com/test_dRm6oGdGfe4F2vKe0VaEE01" },
  "bilan-commissions":              { lancement: "https://buy.stripe.com/test_eVq9AS8lV4u5fiwf4ZaEE02", standard: "https://buy.stripe.com/test_3cIbJ059J2lXees0a5aEE03" },
  "bilan-commissions-activites":    { lancement: "https://buy.stripe.com/test_5kQcN4cCbbWx8U8aOJaEE04", standard: "https://buy.stripe.com/test_9B6fZg45FgcN7Q47CxaEE05" },
  "bilan-commissions-restauration": { lancement: "https://buy.stripe.com/test_9B66oGby7gcN1rGaOJaEE06", standard: "https://buy.stripe.com/test_fZu4gydGf0dPfiwbSNaEE07" },
  "plan-argent-dormant":            { lancement: "https://buy.stripe.com/test_6oU8wOau31hT5HWg93aEE08", standard: "https://buy.stripe.com/test_3cI4gycCbbWxgmA6ytaEE09" },
  "pack-dracar-express":            { lancement: "https://buy.stripe.com/test_8x2cN4gSr7Gh7Q4f4ZaEE0a", standard: "https://buy.stripe.com/test_dRm3cu1XxaSt4DS4qlaEE0b" },
  "veille-titres-30":               { mensuel: "https://buy.stripe.com/test_fZu8wO0Tt2lXc6kbSNaEE0c" },
  "veille-titres-80":               { mensuel: "https://buy.stripe.com/test_cNidR859J3q10nC2idaEE0d" },
};

/** À remplir avec la sortie du script lancé avec la clé live. */
export const LIENS_LIVE: Liens = {};

export const PALIER_ACTIF: Record<string, Palier> = {
  "bilan-financements": "lancement",
  "bilan-commissions": "lancement",
  "bilan-commissions-activites": "lancement",
  "bilan-commissions-restauration": "lancement",
  "plan-argent-dormant": "lancement",
  "pack-dracar-express": "lancement",
  "veille-titres-30": "mensuel",
  "veille-titres-80": "mensuel",
};

export const MODE_STRIPE = process.env.NEXT_PUBLIC_STRIPE_MODE === "live" ? "live" : process.env.NEXT_PUBLIC_STRIPE_MODE === "test" ? "test" : null;

/** Lien de paiement actif d'une offre, ou null si aucun (mode absent, offre sans lien). */
export function lienPaiement(offre: string): { url: string; palier: Palier; test: boolean } | null {
  if (!MODE_STRIPE) return null;
  const palier = PALIER_ACTIF[offre];
  const url = (MODE_STRIPE === "live" ? LIENS_LIVE : LIENS_TEST)[offre]?.[palier];
  return url ? { url, palier, test: MODE_STRIPE === "test" } : null;
}
