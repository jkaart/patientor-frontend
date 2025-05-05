import { useRef, useState } from 'react';
import { UseFieldReturn } from '../types';
import { SelectChangeEvent } from '@mui/material';

export const useField = <T,>(label: string, initialValue: T): UseFieldReturn<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<T>) => {
    setValue(event.target.value as T);
  };

  const initialRef = useRef(initialValue);
  const reset = () => {
    setValue(initialRef.current);
  };

  return {
    value,
    label,
    onChange,
    onReset: reset
  };
};
