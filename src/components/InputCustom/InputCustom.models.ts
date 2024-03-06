import { Control, FieldValues } from 'react-hook-form';

export interface Props {
  control:     Control<{[x: string]: any}> | undefined;
  name:        string;
  label:       string;
  placeholder: string;
}
