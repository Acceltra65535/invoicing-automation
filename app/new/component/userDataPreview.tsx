"use client";
import { PreviewDetails } from "@/app/component/form/previewDetails";
import { useData } from "@/app/hooks/useData";
import { setLocalStorageItem } from "@/lib/getInitialValue";
import { useFormContext } from "react-hook-form";

export const UserDataPreview = () => {
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();
  const { setValue } = useFormContext();

  const onClick = (step: string) => {
    setValue("step", step);
    setLocalStorageItem("step", step);
  };

  return (
    <PreviewDetails
      onClick={onClick}
      companyDetails={companyDetails}
      invoiceDetails={invoiceDetails}
      invoiceTerms={invoiceTerms}
      paymentDetails={paymentDetails}
      yourDetails={yourDetails}
    />
  );
};
