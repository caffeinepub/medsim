import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { icmrDiseaseData } from "../utils/icmrSeedData";
import { useActor } from "./useActor";
import { useIsAdmin } from "./useQueries";

export function useSeedDiseases() {
  const { actor, isFetching } = useActor();
  const { data: isAdmin } = useIsAdmin();
  const seedAttempted = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || !isAdmin) return;
    if (seedAttempted.current) return;

    const alreadySeeded =
      localStorage.getItem("medsim_diseases_seeded") === "true";
    if (alreadySeeded) return;

    seedAttempted.current = true;

    const seedInBackground = async () => {
      try {
        const existing = await actor.getAllDiseases();
        if (existing.length > 0) {
          localStorage.setItem("medsim_diseases_seeded", "true");
          return;
        }

        const toastId = toast.loading(
          "Database mein ICMR disease data load ho raha hai...",
        );

        let seeded = 0;
        for (const disease of icmrDiseaseData) {
          try {
            await actor.addDisease(disease);
            seeded++;
            if (seeded % 5 === 0) {
              toast.loading(
                `ICMR data loading... ${seeded}/${icmrDiseaseData.length} diseases`,
                { id: toastId },
              );
            }
          } catch {
            // Continue with next disease if one fails
          }
        }

        localStorage.setItem("medsim_diseases_seeded", "true");
        toast.success(`${seeded} ICMR diseases successfully loaded!`, {
          id: toastId,
        });
      } catch {
        // Silent failure — don't block UI
      }
    };

    seedInBackground();
  }, [actor, isFetching, isAdmin]);
}
