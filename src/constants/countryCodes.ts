import { CountryValidator } from "@/types/Requisites";

export const countryCodes = [
  {
    name: "Казахстан",
    value: "kazakh" as CountryValidator,
    flag: "/countries/kazakh.svg",
    currency: "KZT",
    currencyDesc: "Казахстанский тенге",
  },
  {
    name: "Россия",
    value: "russia" as CountryValidator,
    flag: "/countries/russian.svg",
    currency: "RUB",
    currencyDesc: "Российский рубль",
  },
];
