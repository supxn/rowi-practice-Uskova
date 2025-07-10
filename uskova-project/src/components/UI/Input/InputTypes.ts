export interface Props {
  placeholder?: string,
  type?: string,
  required?: boolean,
  fieldName?: string,
 validator?: (value: string) => { isValid: boolean; message?: string }
}