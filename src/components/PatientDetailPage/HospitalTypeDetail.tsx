import { Diagnoses, HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnoses[];
}

const HospitalTypeDetail = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>diagonosed by {entry.specialist}</p>
    </div>
  );
};

export default HospitalTypeDetail;
