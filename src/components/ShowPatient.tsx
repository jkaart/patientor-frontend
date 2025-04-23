import { useEffect, useState } from "react";
import patientsService from "../services/patients";
import { Patient } from "../types";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

const ShowPatient = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams<{ id: string }>().id;

  useEffect(() => {
    (async () => {
      const patient: Patient = await patientsService.getPatient(id as string) as Patient;
      setPatient(patient);
    })();
  }, [id]);

  if (patient) {
    return (
      <div>
        <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
          {patient.name} {
              patient.gender === 'male' ? <Male />
            : patient.gender === 'female' ? <Female />
            : patient.gender === 'other' ? <Transgender />
            : null
          }
        </Typography>
        <Typography variant="body1">
          ssn: {patient.ssn}
        </Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
      </div>

    );
  }
};

export default ShowPatient;