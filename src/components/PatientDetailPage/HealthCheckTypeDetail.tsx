import { Diagnoses, HealthCheckEntry, HealthCheckRating } from "../../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnoses[];
}
const HealthCheckTypeDetail = ({ entry, diagnoses }: Props) => {
  const healthRateSymbolizer = (healthRate: HealthCheckRating) => {
    switch (healthRate) {
      case 0:
        return <FavoriteIcon color="success" />;
      case 1:
        return <FavoriteIcon color="secondary" />;
      case 2:
        return <FavoriteIcon color="info" />;
      case 3:
        return <FavoriteIcon color="error" />;
    }
  };
  return (
    <div>
      <p>
        {entry.date} <HealthAndSafetyIcon />
      </p>
      <p>{entry.description}</p>
      {healthRateSymbolizer(entry.healthCheckRating)}
      <p>diagonosed by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckTypeDetail;
