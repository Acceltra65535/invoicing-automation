"use client";

import { Input } from "@/app/component/ui/input";
import { getInitialValue, setLocalStorageItem } from "@/lib/getInitialValue";
import { Controller } from "react-hook-form";

type CustomInputProps = {
  label?: string;
  placeholder: string;
  variableName: string;
};

const CustomTextInput = ({
  label,
  placeholder,
  variableName,
}: CustomInputProps) => (
  <Controller
    render={({ field: { onChange, value } }) => (
      <Input
        id={variableName}
        name={variableName}
        label={label}
        placeholder={placeholder}
        value={value}
        type="text"
        onChange={(e) => {
          const updatedValue = e.target.value;
          setLocalStorageItem(variableName, updatedValue);
          onChange(updatedValue);
        }}
      />
    )}
    name={variableName}
    defaultValue={getInitialValue(variableName)}
  />
);

export default CustomTextInput;
