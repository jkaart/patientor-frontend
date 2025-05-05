import { Diagnosis } from '../../types';

const DiagnosisList = ({ diagnosis, diagnosisCodes }: { diagnosis: Array<string>, diagnosisCodes: Array<Diagnosis> }) => {
  return (
    <>
      <ul>
        {diagnosis.map((code, index) => (<li key={index}>{code} {diagnosisCodes.find(d => d.code === code)?.name}</li>))}
      </ul>
    </>
  );
};

export default DiagnosisList;
