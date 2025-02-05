export type User = {
    id: number;
    phone: string;
    username: string;
}

export type Login = {
    phone: string;
    agreed: boolean;
}

export type Register = {
    phone: string;
    username: string;
}

export type ConfirmCode = {
    phone: string;
    code: string;
}