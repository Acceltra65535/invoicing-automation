"use client";
export const getInitialValue = (variableName: string, defaultValue?: string): string => {
  try {
    return localStorage.getItem(variableName) || defaultValue || "";
  } catch (error) {
    console.error("Error while getting item from local storage:", error);
    return defaultValue || "";
  }
};

export const setLocalStorageItem = (variableName: string, value: string): void => {
  try {
    localStorage.setItem(variableName, value);
  } catch (error) {
    console.error("Error while setting item in local storage:", error);
  }
};

export const getItemValue = (): Item[] => {
  try {
    return getItems(localStorage.getItem("items"));
  } catch (error) {
    console.error("Error while getting item from local storage:", error);
    return [
      {
        itemDescription: "",
      },
    ];
  }
};

const getItems = (items?: string | null): Item[] => {
  if (!items)
    return [
      {
        itemDescription: "",
      },
    ];
  try {
    const parsed = JSON.parse(items);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : [
          {
            itemDescription: "",
          },
        ];
  } catch {
    return [
      {
        itemDescription: "",
      },
    ];
  }
};
