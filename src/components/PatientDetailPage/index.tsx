import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PatientEntries from "./PatientEntries";
import { Button } from "@mui/material";
import AddNewEntryForm from "./AddNewEntryForm";

const PatientDetailPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();
  const [isFormVisible, setIsFormVisible] = useState(false);
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getPatient(id);
        setPatient(data);
      }
    };
    fetchPatient();
  }, []);

  const handleNewFormDisplay = () => {
    setIsFormVisible(true);
  };

  return (
    <div>
      <h2>
        {patient?.name}{" "}
        {patient?.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <p>ssh: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      {isFormVisible && <AddNewEntryForm type="HealthCheck" id={patient?.id} />}
      <PatientEntries entries={patient?.entries} />
      <Button onClick={handleNewFormDisplay} variant="contained">
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default PatientDetailPage;
