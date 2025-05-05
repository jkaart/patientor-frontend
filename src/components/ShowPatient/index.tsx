import { useEffect } from 'react';
import patientsService from '../../services/patients';
import { Diagnosis, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import EntriesList from './EntriesList';

interface Props {
  diagnosisCodes: Diagnosis[]
  patient: Patient | null
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
  children?: JSX.Element | null
}

const ShowPatient = ({ diagnosisCodes, setPatient, patient, children }: Props) => {
  const id = useParams<{ id: string }>().id;

  useEffect(() => {
    const getPatient = async () => {
      const patient = await patientsService.getPatient(id as string) as Patient;
      setPatient(patient);
    };
    void getPatient();
  }, [id, setPatient]);

  if (patient) {
    return (
      <Box>
        <Typography component={'span'} variant='h6' style={{ marginBottom: '0.5em' }}>
          {patient.name} {
            patient.gender === 'male' ? <Male />
              : patient.gender === 'female' ? <Female />
                : patient.gender === 'other' ? <Transgender />
                  : null
          }
        </Typography>
        <Typography variant='body1'>
          ssn: {patient.ssn}
        </Typography>
        <Typography variant='body1'>
          occupation: {patient.occupation}
        </Typography>
        {children}
        <Typography variant='h5' style={{ marginBottom: '0.5em', marginTop: '1em' }}>
          entries
        </Typography>
        <Box>
          {patient.entries.length === 0
            ? <Typography><i>no entries</i></Typography>
            : <EntriesList entries={patient.entries} diagnosisCodes={diagnosisCodes} />}
        </Box>
      </Box>
    );
  }
};

export default ShowPatient;
