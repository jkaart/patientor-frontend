import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { HealthCheckRating, UseFieldReturn } from '../../../../types';

interface Props {
  required: boolean
  field: UseFieldReturn<HealthCheckRating | ''>
}

const healthCheckMenuItems = Object.keys(HealthCheckRating)
  .filter(key => isNaN(Number(key)))
  .map(labelText => ({
    labelText,
    value: HealthCheckRating[labelText as keyof typeof HealthCheckRating]
  }));

const HealthCheckSelect = ({ required, field }: Props) => {
  return (
    <FormControl variant='standard' fullWidth required={required}>
      <InputLabel>{field.label}</InputLabel>
      <Select {...field}>
        {healthCheckMenuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.labelText}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HealthCheckSelect;