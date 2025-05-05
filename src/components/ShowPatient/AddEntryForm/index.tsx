import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import * as Type from '../../../types';
import { useField } from '../../../hooks/useField';
import SelectForm from './Forms/SelectForm';
import { Alert, Box, Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import patientService from '../../../services/patients';

interface AddEntryFormProps {
  diagnosisCodes: Type.Diagnosis[]
  patient: Type.Patient
  patients: Type.Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Type.Patient[]>>
}

interface EntryTypeSelectProps {
  value: Type.SelectEntryType
  setValue: React.Dispatch<React.SetStateAction<Type.SelectEntryType>>
}

const EntryTypeSelect = ({ value, setValue }: EntryTypeSelectProps) => {
  const options = Object.keys({ ...Type.NoneEntryType, ...Type.EntryType })
    .filter(key => isNaN(Number(key)))
    .map(labelText => ({
      labelText,
      value: labelText
    }));

  const handleSelectChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as Type.SelectEntryType);
  };

  return (
    <>
      <FormControl>
        <Select
          value={value}
          onChange={handleSelectChange}
          variant='standard'>
          {options.map((item, index) => <MenuItem key={index} value={item.value}>{item.labelText}</MenuItem>)}
        </Select>
      </FormControl>
    </>
  );
};

const AddEntryForm = ({ diagnosisCodes, patients, setPatients, patient }: AddEntryFormProps) => {
  const descriptionField = useField<Type.BaseEntryWithoutId['description']>('Description', '');
  const dateField = useField<Type.BaseEntryWithoutId['date']>('Date', '');
  const specialistField = useField<Type.BaseEntryWithoutId['specialist']>('Specialist', '');
  const diagnosisCodesField = useField<Type.Diagnosis['code'] | []>('Diagnosis codes', []);
  const healthCheckRatingField = useField<Type.HealthCheckRating | ''>('HealthCheckRating', '');
  const employerNameField = useField<Type.OccupationalHealthcareEntry['employerName']>('Employer', '');
  const sickLeaveStartField = useField<Type.SickLeave['startDate']>('Start date', '');
  const sickLeaveEndField = useField<Type.SickLeave['endDate']>('End date', '');
  const dischargeDateField = useField<Type.Discharge['date']>('Date', '');
  const dischargeCriteriaField = useField<Type.Discharge['criteria']>('Criteria', '');

  const [entryType, setEntryType] = useState<Type.SelectEntryType>(Type.NoneEntryType.None);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  const baseFields = {
    descriptionField,
    dateField,
    specialistField,
    diagnosisCodesField,
    healthCheckRatingField
  } as Type.BaseFormFields;

  const occupationalHealthcareFields = {
    employerNameField,
    sickLeave: {
      startDateField: sickLeaveStartField,
      endDateField: sickLeaveEndField
    }
  } as Type.OccupationalHealthcareFormFields;

  const hospitalFields = {
    discharge: {
      dateField: dischargeDateField,
      criteriaField: dischargeCriteriaField
    }
  } as Type.HospitalFormFields;

  const createEntry = async (entry: Type.EntryWithoutId) => {
    try {
      if (patient) {
        const receivedEntry = await patientService.addEntry(patient.id, entry);
        patient.entries.push(receivedEntry);
        const updatedPatients = patients.map(p => p.id === patient.id ? patient : p);
        setPatients(updatedPatients);
      }
    }
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === 'string') {
          const message = error.response.data.replace('Something went wrong. Error: ', '');
          setErrorMessage(message);
          console.error(message);
        } if (error?.response?.data && typeof error?.response?.data === 'object' && typeof error?.response?.data.error[0] === 'object') {
          const errorObject = error?.response?.data.error[0];
          if (errorObject.code === 'invalid_union') {
            if (errorObject.unionErrors.length > 0) {
              const unionError = errorObject.unionErrors[errorObject.unionErrors.length - 1].issues;
              const messages = String(unionError.map((error: { message: string; }) => error.message));
              setErrorMessage(messages);
              console.error('error', messages);
            }
          }
        } else {
          console.error('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', error);
        setErrorMessage('Unknown error');
      }
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntryObject = {
      type: entryType,
      description: descriptionField.value,
      date: dateField.value,
      specialist: specialistField.value,
    } as Type.EntryWithoutId;
    if (diagnosisCodesField.value.length > 0) {
      baseEntryObject.diagnosisCodes = diagnosisCodesField.value as Array<Type.Diagnosis['code']>;
    }

    switch (entryType) {
      case Type.NoneEntryType.None:
        break;
      case Type.EntryType.OccupationalHealthcare:
        const occupationalHealthcareObject = {} as Type.OccupationalHealthcareEntry;
        if (healthCheckRatingField.value !== '') {
          occupationalHealthcareObject.healthCheckRating = healthCheckRatingField.value;
        }
        if (sickLeaveStartField.value !== '' && sickLeaveEndField.value !== '') {
          occupationalHealthcareObject.sickLeave = {
            startDate: sickLeaveStartField.value,
            endDate: sickLeaveStartField.value
          };
        }
        if (employerNameField.value !== '') {
          occupationalHealthcareObject.employerName = employerNameField.value;
        }

        createEntry({ ...baseEntryObject, ...occupationalHealthcareObject });
        break;
      case Type.EntryType.Hospital:
        const hospitalObject = {} as Type.HospitalEntry;
        if (healthCheckRatingField.value !== '') {
          hospitalObject.healthCheckRating = healthCheckRatingField.value;
        }
        if (dischargeDateField.value !== '' && dischargeCriteriaField.value !== '') {
          hospitalObject.discharge = {
            date: dischargeDateField.value,
            criteria: dischargeCriteriaField.value
          };
        }

        createEntry({ ...baseEntryObject, ...hospitalObject });
        break;
      case Type.EntryType.HealthCheck:
        const healthCheckObject = {
          healthCheckRating: healthCheckRatingField.value,
        } as Type.HealthCheckEntry;

        createEntry({ ...baseEntryObject, ...healthCheckObject });
        break;
      default:
        break;
    }
    handleReset();
    setEntryType(Type.NoneEntryType.None);
  };

  const handleReset = () => {
    Object.keys(baseFields)
      .forEach(key => {
        baseFields[key as keyof Type.BaseFormFields].onReset();
      });
    occupationalHealthcareFields.employerNameField.onReset();
    occupationalHealthcareFields.sickLeave.endDateField.onReset();
    occupationalHealthcareFields.sickLeave.startDateField.onReset();
    hospitalFields.discharge.criteriaField.onReset();
    hospitalFields.discharge.dateField.onReset();
    healthCheckRatingField.onReset();
  };

  return (
    <>
      {errorMessage ? <Alert severity='error'>{errorMessage}</Alert> : null}
      {entryType === Type.NoneEntryType.None
        ? <Box>Select <EntryTypeSelect value={entryType} setValue={setEntryType} /> entry</Box>
        : <><Box>New <EntryTypeSelect value={entryType} setValue={setEntryType} /> entry</Box>
          <Box marginTop='0.2em' padding='0.8em' paddingBlock='3em' border='dotted' borderRadius='8px'>
            <form onSubmit={handleSubmit} onReset={handleReset} >
              <SelectForm
                diagnosisCodes={diagnosisCodes}
                entryType={entryType}
                baseFields={baseFields}
                occupationalHealthcareFields={occupationalHealthcareFields}
                hospitalFields={hospitalFields} />
              <Grid paddingTop='2em'>
                <Grid item style={{ float: 'left' }}>
                  <Button variant='contained' type='submit'>Add</Button>
                </Grid>
                <Grid item style={{ float: 'right' }}>
                  <Button variant='contained' color='error' type='reset'>reset</Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </>}
    </>
  );
};

export default AddEntryForm;
