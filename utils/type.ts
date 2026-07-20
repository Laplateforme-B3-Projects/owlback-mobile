import { CategoryType, DocumentStatusEnum } from './enum';

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
  company_name: string;
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

export type Breadcrumb = {
  path: string;
  parents: ParentsBreadcrumb[];
};

export type ParentsBreadcrumb = { name: string; id: number };

// Here represents some record retrive by filters
type DocumentData = {
  total_documents: number;
  total_documents_monthly: number;
  total_documents_to_process: number;
};

export interface DocumentAPIData {
  documents: Folder[] | OwlbackFile[];
  last_uploaded: OwlbackFile[];
  to_process: OwlbackFile[];
}

interface Document {
  id: number;
  user_id: number;
  user_fullname: string;
  parent_id?: number;
  name: string;
  note?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  breadcrumb: Breadcrumb;
}

export interface OwlbackFile extends Document {
  filename: string;
  status?: DocumentStatusEnum;
  category?: CategoryType;
  is_folder: 0;
  content?: string;
  preview_url?: string;
  media_url: string;
  mime_type: string;
  size: string;
}

export interface Folder extends Document {
  get_children_count?: number;
  is_folder: 1;
}

export enum GenderEnum {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}
