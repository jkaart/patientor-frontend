import { SelectChangeEvent } from '@mui/material';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntryWithoutId {
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface BaseEntry extends BaseEntryWithoutId {
  id: string;
}

export enum EntryType {
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck'
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  healthCheckRating?: HealthCheckRating;
  employerName?: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  healthCheckRating?: HealthCheckRating;
  discharge?: Discharge;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, 'id'>;

export interface MenuContent {
  value: string | number
  labelText: string
}

export enum NoneEntryType {
  None = 'None'
}

export type SelectEntryType = NoneEntryType | EntryType;

export interface BoxStyle {
  marginTop: string,
  marginBottom: string,
  padding: string
}
export interface UseFieldReturn<T> {
  value: T
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<T>) => void
  onReset: () => void
}

export interface BaseFormFields {
  descriptionField: UseFieldReturn<EntryWithoutId['description']>
  dateField: UseFieldReturn<EntryWithoutId['date']>
  specialistField: UseFieldReturn<EntryWithoutId['specialist']>
  healthCheckRatingField: UseFieldReturn<HealthCheckRating | ''>
  diagnosisCodesField: UseFieldReturn<Diagnosis['code']>
}

export interface OccupationalHealthcareFormFields {
  employerNameField: UseFieldReturn<OccupationalHealthcareEntry['employerName']>
  sickLeave: {
    startDateField: UseFieldReturn<SickLeave['startDate']>
    endDateField: UseFieldReturn<SickLeave['endDate']>
  }
}

export interface HospitalFormFields {
  discharge: {
    dateField: UseFieldReturn<Discharge['date']>
    criteriaField: UseFieldReturn<Discharge['criteria']>
  }
}

export interface SelectFormProps {
  entryType: EntryType
  diagnosisCodes: Diagnosis['code']
  baseFields: BaseFormFields
  occupationalHealthcareFields: OccupationalHealthcareFormFields
  hospitalFields: HospitalFormFields
}
