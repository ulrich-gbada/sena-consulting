import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Réalisations — SENA CONSULTING",
  description: "Missions et résultats obtenus par SENA CONSULTING auprès de dirigeants de PME/TPE.",
};

export default function RealisationsPage() {
  return (
    <PageShell tag="Nos réalisations" title="Des résultats concrets, mesurables">
      <div className="placeholder">
        Cette page présentera prochainement une sélection de missions réalisées :
        contexte, démarche, résultats obtenus.
      </div>
    </PageShell>
  );
}
