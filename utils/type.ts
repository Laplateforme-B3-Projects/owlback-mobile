export interface UserAuth {
    message: string;
    token?: string;
    user?: User;
}

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
    updated_at: string;
    phone_number?: string;
    isFullyRegistered?: boolean;
}

export enum GenderEnum {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
}
