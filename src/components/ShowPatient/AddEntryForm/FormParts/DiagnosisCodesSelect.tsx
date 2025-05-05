import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Diagnosis, UseFieldReturn } from '../../../../types';

const DiagnosisCodesSelect = ({ field, diagnosisCodes }: { field: UseFieldReturn<Diagnosis['code']>, diagnosisCodes: Diagnosis[] }) => {
  const diagnosisCodesArray = diagnosisCodes.map(item => ({ value: item.code, label: `${item.code} ${item.name}` }));
  return (
    <FormControl variant='standard' fullWidth>
      <InputLabel>{field.label}</InputLabel>
      <Select
        {...field}
        multiple
        renderValue={value => Array.isArray(value) ? value.join(', ') : ''} >
        {diagnosisCodesArray.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodesSelect;
