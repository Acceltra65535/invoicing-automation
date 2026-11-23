/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { pdfContainers, pdfTypography } from "@/lib/pdfStyles";

export const CompanyDetailsPdf: React.FC<CompanyDetails> = ({
  email,
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyCountry,
  companyLogo,
  companyTaxId,
  companyZip,
}) => {
  const cityStateZip = [
    companyCity,
    [companyState, companyZip].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={pdfContainers.CompanyDetails}>
      <Text style={{ ...pdfTypography.title, marginBottom: 8 }}>To</Text>
      <View style={pdfContainers.imageContainer}>
        {companyLogo && (
          <Image src={companyLogo} style={{ height: 40, borderRadius: 6 }} />
        )}
      </View>
      {companyName && (
        <Text style={{ ...pdfTypography.text2xl, flexWrap: "wrap" }}>
          {companyName}
        </Text>
      )}
      {email && (
        <Text style={{ ...pdfTypography.description, marginBottom: 6 }}>
          {email}
        </Text>
      )}
      <View style={pdfTypography.description}>
        {companyAddress && <Text>{companyAddress}</Text>}
        {cityStateZip && (
          <Text style={{ marginBottom: 2 }}>{cityStateZip}</Text>
        )}
        {companyCountry && (
          <Text style={{ marginBottom: 4 }}>{companyCountry}</Text>
        )}
        {companyTaxId && <Text>Tax ID: {companyTaxId}</Text>}
      </View>
    </View>
  );
};
