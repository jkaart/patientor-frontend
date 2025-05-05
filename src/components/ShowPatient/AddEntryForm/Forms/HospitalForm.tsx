import { Box, InputLabel, TextField } from '@mui/material';
import { HospitalFormFields } from '../../../../types';

const HospitalForm = ({ fields }: { fields: HospitalFormFields }) => {
  return (
    <Box paddingTop='0.5em'>
      <InputLabel>Discharge</InputLabel>
      <Box marginLeft='0.4em'>
        <TextField {...fields.discharge.dateField} type='date' variant='standard' size='small' fullWidth InputLabelProps={{ shrink: true }} />
        <TextField {...fields.discharge.criteriaField} variant='standard' size='small' fullWidth />
      </Box>
    </Box>
  );
};

export default HospitalForm;
