import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from '../../types';
import { Favorite } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckIcon = ({ healthCheckRating }: { healthCheckRating: HealthCheckRating }) => {
  switch (healthCheckRating) {
    case 0:
      return <div><Favorite sx={{ color: green[500] }} /></div>;
    case 1:
      return <div><Favorite sx={{ color: yellow[500] }} /></div>;
    case 2:
      return <div><Favorite sx={{ color: yellow[900] }} /></div>;
    case 3:
      return <div><Favorite sx={{ color: red[900] }} /></div>;
    default:
      return;
  }
};

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => (
  <>
    {entry.healthCheckRating !== undefined ? <HealthCheckIcon healthCheckRating={entry.healthCheckRating} /> : null}
    {entry.discharge ? `${entry.discharge.date} ${entry.discharge.criteria}` : null}
  </>
);

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <HealthCheckIcon healthCheckRating={entry.healthCheckRating} />
);

const OccupationalHealthcareDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => (
  <>
    {entry.healthCheckRating !== undefined
      ? <HealthCheckIcon healthCheckRating={entry.healthCheckRating} />
      : null
    }
    {entry.sickLeave
      ? (
        <>
          <Grid container spacing={0.5}>
            <Grid item xs={0}>Start date:</Grid>
            <Grid item xs={0}>{entry.sickLeave.startDate}</Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={0}>End date:</Grid>
            <Grid item xs={0}>{entry.sickLeave.endDate}</Grid>
          </Grid>
        </>
      )
      : null
    }
  </>
);

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
