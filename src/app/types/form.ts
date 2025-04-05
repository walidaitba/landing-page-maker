export type FormFieldType = 'text' | 'number';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
}

export interface FormSection {
  id: string;
  type: 'form';
  title: string;
  content: string;
  isActive: boolean;
  fields: FormField[];
  whatsappNumber: string;
}