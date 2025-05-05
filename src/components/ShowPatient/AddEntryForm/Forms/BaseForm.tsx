import { Box, TextField } from '@mui/material';
import { BaseFormFields, BoxStyle, Diagnosis, EntryType } from '../../../../types';
import DiagnosisCodesSelect from '../FormParts/DiagnosisCodesSelect';
import HealthCheckSelect from '../FormParts/HealthCheckSelect';


interface BaseFormProps {
  fields: BaseFormFields
  diagnosisCodes: Diagnosis[]
  entryType: EntryType
  styles: BoxStyle
}

const BaseForm = ({ fields, diagnosisCodes, entryType, styles }: BaseFormProps) => {
  return (
    <>
      <Box style={styles}>
        <TextField {...fields.descriptionField} size='small' variant='standard' required fullWidth />
      </Box>
      <Box style={styles}>
        <TextField {...fields.dateField} size='small' type='Date' variant='standard' required fullWidth InputLabelProps={{ shrink: true }} />
      </Box>
      <Box style={styles}>
        <TextField {...fields.specialistField} size='small' variant='standard' required fullWidth />
      </Box>
      <Box style={styles}>
        {entryType === 'HealthCheck'
          ? <HealthCheckSelect field={fields.healthCheckRatingField} required={true} />
          : <HealthCheckSelect field={fields.healthCheckRatingField} required={false} />}
      </Box>
      <Box style={styles}>
        <DiagnosisCodesSelect field={fields.diagnosisCodesField} diagnosisCodes={diagnosisCodes} />
      </Box>
    </>
  );
};

export default BaseForm;
