import { Diagnoses, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnoses[];
}
const OccupationalTypeDetail = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>
        {entry.date} <WorkIcon />
      </p>
      <p>{entry.description}</p>
    </div>
  );
};

export default OccupationalTypeDetail;
