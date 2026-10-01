// app/lib/antispam.js — protections communes des routes de formulaire (contact, newsletter).
// 1. Pot de miel : un champ caché (`site`) que seuls les robots remplissent → on répond
//    « succès » sans rien envoyer, pour ne pas leur apprendre à contourner.
// 2. Limite de débit par adresse IP, en mémoire : 5 envois par 10 minutes. Sur Vercel, le
//    compteur vit le temps de l'instance (suffisant contre les rafales d'un même robot).
const FENETRE_MS = 10 * 60 * 1000;
const MAX_PAR_FENETRE = 5;
const compteurs = new Map();

export function ip(request) {
  const h = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  return h.split(',')[0].trim() || 'inconnue';
}

/** true si l'adresse a dépassé la limite (l'appel compte comme une tentative). */
export function tropDeRequetes(request) {
  if (process.env.ANTISPAM_OFF === '1') return false; // banc de test local uniquement
  const cle = ip(request); const t = Date.now();
  const liste = (compteurs.get(cle) || []).filter((x) => t - x < FENETRE_MS);
  liste.push(t); compteurs.set(cle, liste);
  if (compteurs.size > 5000) for (const [k, v] of compteurs) if (t - v[v.length - 1] > FENETRE_MS) compteurs.delete(k);
  return liste.length > MAX_PAR_FENETRE;
}

/** true si le pot de miel est rempli (robot). */
export const potDeMiel = (body) => typeof body?.site === 'string' && body.site.trim() !== '';
