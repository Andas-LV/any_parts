export type CountryValidator = 'kazakh' | 'russia';

export type Requisites = {
    id: number;
    name: string;
    BIK: number;
    account: number;
    fullName: string;
}

export type RequisiteValidator = {
    country: CountryValidator;
    name: string;
    BIK: number;
    account: number;
    fullName: string;
}
