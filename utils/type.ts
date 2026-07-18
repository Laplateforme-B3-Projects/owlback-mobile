export interface UserAuth {
  message: string;
  token?: Token;
  user?: User;
}

export type Token = {
  value: string;
  expiresAt: any;
};

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  gender: GenderEnum;
  email: string;
  birthdate: string | null;
  metadata: Record<string, any> | null;
  company_id: number;
  created_at: string;
  password_created_at_human: string;
  updated_at: string;
  phone_number?: string;
  isFullyRegistered?: boolean;
}

export interface DashboardData {
  documentData: DocumentData;
  totalAmount: number;
}

// Here represents some record retrive by filters
type DocumentData = {
  total_documents: number;
  total_documents_monthly: number;
  total_documents_to_process: number;
};

export enum GenderEnum {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}
