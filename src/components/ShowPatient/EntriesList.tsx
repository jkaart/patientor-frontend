import { Box, Typography } from '@mui/material';
import { Diagnosis, Entry, EntryWithoutId } from '../../types';

import EntryDetails from './EntryDetails';
import DiagnosisList from './DiagnosisList';

import { MedicalServices, Work, LocalHospital } from '@mui/icons-material';

const TypeIcon = ({ entry }: { entry: EntryWithoutId }) => {
  switch (entry.type) {
    case 'Hospital':
      return <LocalHospital />;
    case 'HealthCheck':
      return <MedicalServices />;
    case 'OccupationalHealthcare':
      const employerName = entry.employerName ? <i>{entry.employerName}</i> : null;
      return (<><Work />{employerName}</>);
    default:
      break;
  }
};

const EntryHeader = ({ entry, diagnosisCodes }: { entry: EntryWithoutId, diagnosisCodes: Array<Diagnosis> }) => {
  return (
    <>
      <Typography component={'span'}>{entry.date} <TypeIcon entry={entry} /></Typography>
      <Typography><i>{entry.description}</i></Typography>
      {entry.diagnosisCodes ? <DiagnosisList diagnosis={entry.diagnosisCodes} diagnosisCodes={diagnosisCodes} /> : null}
    </>
  );
};

const EntriesList = ({ entries, diagnosisCodes }: { entries: Array<Entry>, diagnosisCodes: Array<Diagnosis> }) => {
  return (
    <>
      {entries.map((entry, index) => (
        <Box key={index} marginBottom='0.3em' padding='0.2em' border='solid' borderRadius='8px'>
          <EntryHeader entry={entry} diagnosisCodes={diagnosisCodes} />
          <EntryDetails entry={entry} />
          <Typography>diagnose by {entry.specialist}</Typography>
        </Box>
      ))}
    </>
  );
};

export default EntriesList;
