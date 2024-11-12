import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { BaseEntryFormValues, EntryFormValues } from "../../types";
import patientService from "../../services/patients";

interface Props {
  id: string | undefined;
}

type type = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

const AddNewEntryForm = ({ id }: Props) => {
  const [type, setType] = useState<type>("HealthCheck");

  const createEntry = (formData: FormData): EntryFormValues => {
    const baseData: BaseEntryFormValues = {
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      specialist: formData.get("specialist") as string,
      diagnosisCodes: formData.get("diagnosesCode")?.toString().split(","),
    };
    switch (type) {
      case "Hospital":
        return {
          ...baseData,
          type: type,
          discharge: {
            date: formData.get("dischargeDate") as string,
            criteria: formData.get("criteria") as string,
          },
        };
      case "HealthCheck":
        return {
          ...baseData,
          type: type,
          healthCheckRating: parseInt(
            formData.get("healthCheckRating") as string
          ),
        };
      case "OccupationalHealthcare":
        return {
          ...baseData,
          type: type,
          sickLeave: {
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
          },
        };
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const data = createEntry(formData);
      if (id) {
        patientService.addEntry(data, id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectedForm = () => {
    switch (type) {
      case "HealthCheck":
        return <TextField name="healthCheckRating" label="Health Rating" />;
      case "OccupationalHealthcare":
        return (
          <InputLabel>
            Sick Leave
            <TextField name="startDate" label="Start Date" />
            <TextField name="endDate" label="End Date" />
          </InputLabel>
        );
      case "Hospital":
        return (
          <InputLabel>
            Discharge
            <TextField name="dischargeDate" label="Date" />
            <TextField name="criteria" label="criteria" />
          </InputLabel>
        );
    }
  };
  return (
    <Box>
      <Select value={type} onChange={(e) => setType(e.target.value as type)}>
        <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
        <MenuItem value={"Hospital"}>Hospital</MenuItem>
        <MenuItem value={"OccupationalHealthcare"}>
          Occupational Healthcare
        </MenuItem>
      </Select>

      <form onSubmit={handleSubmit}>
        <TextField name="description" label="Description" />
        <TextField name="date" label="Date" />
        <TextField name="specialist" label="Specialist" />
        <TextField name="diagnosesCode" label="Diagnosis Code" />
        {selectedForm()}
        <Button color="error" variant="contained">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Done
        </Button>
      </form>
    </Box>
  );
};

export default AddNewEntryForm;
