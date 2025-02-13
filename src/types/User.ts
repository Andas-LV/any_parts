export type User = {
    id: number;
    email: string;
    phone: string;
    apWallet: boolean;
    username: string;
    avatarUrl?: string | null;
}

export type Login = {
    email: string;
    agreed: boolean;
}

export type Register = {
    email: string;
    username: string;
}

export type ConfirmCode = {
    email: string;
    code: string;
}