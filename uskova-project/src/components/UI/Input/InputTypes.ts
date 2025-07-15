export interface IProps {
  placeholder?: string,
  type?: string,
  required?: boolean,
  fieldName?: string,
  disabled?: boolean,
 validator?: (value: string) => { isValid: boolean; message?: string }
}