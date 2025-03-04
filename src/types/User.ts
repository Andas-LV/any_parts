export type User = {
  id: number;
  email: string;
  phone: string;
  apWallet: boolean;
  username: string;
  avatarUrl?: string | null;
  male: MaleChoice;
  currency: Currency;
  role: Roles;
};

export type MaleChoice = "Male" | "Female";

export type Roles = "user" | "dealer";

export type Currency = "KZT" | "RUB";
