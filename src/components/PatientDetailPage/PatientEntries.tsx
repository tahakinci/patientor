import { useEffect, useState } from "react";
import { Diagnoses, Entry } from "../../types";
import { getDiagnoses } from "../../services/diagnoses";
import HealthCheckTypeDetail from "./HealthCheckTypeDetail";
import HospitalTypeDetail from "./HospitalTypeDetail";
import OccupationalTypeDetail from "./OccupationalTypeDetail";
import { assertNever } from "../../utils";
import { Box } from "@mui/material";

interface Props {
  entries: Entry[] | undefined;
}

const PatientEntries = ({ entries }: Props) => {
  const [diagonoses, setDiagonoses] = useState<Diagnoses[]>([]);

  const fetchDiagnoses = async () => {
    const diagonoses = await getDiagnoses();
    if (diagonoses) setDiagonoses(diagonoses);
  };

  useEffect(() => {
    fetchDiagnoses();
  }, [entries]);
  if (!entries) return;
  return (
    <div>
      <h2>Entries</h2>
      {entries.map((entry) => {
        switch (entry.type) {
          case "HealthCheck":
            return (
              <Box
                key={entry.id}
                sx={{ p: 2, mb: 2, borderRadius: 3, border: "1px solid black" }}
              >
                <HealthCheckTypeDetail entry={entry} diagnoses={diagonoses} />
              </Box>
            );
          case "Hospital":
            return (
              <Box
                key={entry.id}
                sx={{ p: 2, mb: 2, borderRadius: 3, border: "1px solid black" }}
              >
                <HospitalTypeDetail
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagonoses}
                />
              </Box>
            );
          case "OccupationalHealthcare":
            return (
              <Box
                key={entry.id}
                sx={{ p: 2, mb: 2, borderRadius: 3, border: "1px solid black" }}
              >
                <OccupationalTypeDetail
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagonoses}
                />
              </Box>
            );
          default:
            assertNever(entry);
        }
      })}
    </div>
  );
};

export default PatientEntries;
