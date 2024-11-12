import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnoses } from "../types";

export const getDiagnoses = async () => {
  try {
    const { data } = await axios.get<Diagnoses[]>(`${apiBaseUrl}/diagnoses`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
