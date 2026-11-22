"use client";

import { Input } from "@/app/component/ui/input";
import { getInitialValue, setLocalStorageItem } from "@/lib/getInitialValue";
import { Controller } from "react-hook-form";

type CustomNumberProps = {
  label?: string;
  placeholder: string;
  variableName: string;
};

export const CustomNumberInput = ({
  label,
  placeholder,
  variableName,
}: CustomNumberProps) => (
  <Controller
    render={({ field: { onChange, value } }) => (
      <Input
        id={variableName}
        name={variableName}
        label={label}
        placeholder={placeholder}
        value={value}
        type="text"
        pattern="[0-9.]*"
        onChange={(e) => {
          const updatedValue = e.target.value;
          if (/^\d*\.?\d*$/.test(updatedValue)) {
            setLocalStorageItem(variableName, updatedValue);
            onChange(updatedValue);
          }
        }}
      />
    )}
    defaultValue={getInitialValue(variableName)}
    name={variableName}
  />
);

export default CustomNumberInput;
