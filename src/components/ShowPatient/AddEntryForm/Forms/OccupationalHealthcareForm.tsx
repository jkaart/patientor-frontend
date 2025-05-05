import { Box, InputLabel, TextField } from '@mui/material';
import { OccupationalHealthcareFormFields } from '../../../../types';

const OccupationalHealthcareForm = ({ fields }: { fields: OccupationalHealthcareFormFields }) => {
  return (
    <>
      <TextField {...fields.employerNameField} size="small" variant='standard' fullWidth />
      <Box paddingTop='0.5em'>
        <InputLabel>Sick leave</InputLabel>
        <Box marginLeft='0.4em'>
          <TextField {...fields.sickLeave.startDateField} size='small' variant='standard' fullWidth type='date' InputLabelProps={{ shrink: true }} />
          <TextField {...fields.sickLeave.endDateField} size='small' variant='standard' fullWidth type='date' InputLabelProps={{ shrink: true }} />
        </Box>
      </Box>
    </>
  );
};

export default OccupationalHealthcareForm;
