import * as Type from '../../../../types';
import BaseForm from './BaseForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

interface Props {
  entryType: Type.SelectEntryType
  diagnosisCodes: Type.Diagnosis[]
  baseFields: Type.BaseFormFields
  occupationalHealthcareFields: Type.OccupationalHealthcareFormFields
  hospitalFields: Type.HospitalFormFields
}

const SelectForm = ({ entryType, diagnosisCodes, baseFields, occupationalHealthcareFields, hospitalFields }: Props) => {
  const styles = {
    marginTop: '0.2em',
    marginBottom: '0.5em',
    padding: '0,2em'
  };

  switch (entryType) {
    case 'HealthCheck':
      return (<><BaseForm styles={styles} fields={baseFields} diagnosisCodes={diagnosisCodes} entryType={entryType} /></>);
    case 'OccupationalHealthcare':
      return (
        <>
          <BaseForm styles={styles} fields={baseFields} diagnosisCodes={diagnosisCodes} entryType={entryType} />
          <OccupationalHealthcareForm fields={occupationalHealthcareFields} />
        </>);
    case 'Hospital':
      return (<><BaseForm styles={styles} fields={baseFields} diagnosisCodes={diagnosisCodes} entryType={entryType} /><HospitalForm fields={hospitalFields} /></>);
    default:
      return null;
  }
};

export default SelectForm;
