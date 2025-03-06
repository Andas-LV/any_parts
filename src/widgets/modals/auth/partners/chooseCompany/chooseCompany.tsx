"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import styles from "./chooseCompany.module.css";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import { Button } from "@components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useCompanyStore } from "@/entities/partners/company/useCompanyStore";
import { useRouter } from "next/navigation";
import { Company } from "@/types/Company";

interface ChooseCompanyProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function ChooseCompany({ onPrev, onNext }: ChooseCompanyProps) {
  const { getCompanies, companies, isLoading, error } = useCompanyStore();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredCompanies = useMemo(() => {
    return (
      companies?.filter((item) =>
        item.marketName.toLowerCase().includes(search.toLowerCase()),
      ) || []
    );
  }, [search, companies]);

  useEffect(() => {
    // getCompanies();
    console.log(companies);
  }, []);

  const handleSubmit = async () => {
    // await запрос;
    console.log(selectedCompany);
    router.push("/partners");
  };

  return (
    <PartnersModalLayout title={"Выберите компанию"}>
      <p className={styles.instruction}>
        Вам доступно несколько компаний для работы
      </p>

      <div className={styles.searchWrapper}>
        <SearchIcon className={styles.searchIcon} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Поиск..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.scrollableContent}>
        <div className={styles.addCompanyWrapper}>
          <div onClick={onNext} className={styles.companyCreateCard}>
            <Plus />
            Добавить компанию
          </div>
        </div>
        {filteredCompanies.map((company, index) => (
          <div
            key={index}
            className={
              selectedCompany?.id === company.id
                ? styles.addedCompanyWrapper
                : styles.companyWrapper
            }
            onClick={() => setSelectedCompany(company)}
          >
            <div className={styles.companyInfo}>
              <h3>{company.marketName}</h3>
              <p>Тип: {company.organizationType}</p>
              <p>
                Страна: {company.country === "russia" ? "Россия" : "Казахстан"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <Button
          variant="ghost"
          className={styles.changeEmailButton}
          onClick={onPrev}
          disabled={isLoading}
        >
          Назад
        </Button>

        <Button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Войти
        </Button>
      </div>
    </PartnersModalLayout>
  );
}
