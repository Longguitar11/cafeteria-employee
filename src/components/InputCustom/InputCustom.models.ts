import { Control } from 'react-hook-form';

export interface Props {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
}
