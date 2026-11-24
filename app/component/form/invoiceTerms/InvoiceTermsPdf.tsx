import React from "react";
import { Path, Svg, Text, View } from "@react-pdf/renderer";
import { format, isValid } from "date-fns";
import { BrandLogoPdf } from "../brandLogoPdf";
import { pdfTypography } from "@/lib/pdfStyles";
import {
  JIS_X_0510_QR_PATH,
  JIS_X_0510_QR_VIEWBOX,
  PDF417_PATH,
  PDF417_VIEWBOX,
} from "@/lib/headerCodes";

const formatInvoiceDate = (dateValue?: string | null): string => {
  if (!dateValue) return "";
  const parsed = new Date(dateValue);
  return isValid(parsed) ? format(parsed, "do MMM yyyy") : "";
};

export const InvoiceTermsPdf: React.FC<InvoiceTerms> = ({
  orderNumber,
  customerNumber,
  pageNumber,
  issueDate,
  dueDate,
  headerWebsite,
  headerPhone,
  headerAddress,
  headerCity,
  headerState,
  headerZip,
  headerCountry,
  billToName,
  billToAddress,
  billToCity,
  billToState,
  billToZip,
  billToCountry,
}) => {
  const headerCityStateZip = [
    headerCity,
    [headerState, headerZip].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  const billToCityStateZip = [
    billToCity,
    [billToState, billToZip].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  const formattedIssueDate = formatInvoiceDate(issueDate);
  const formattedDueDate = formatInvoiceDate(dueDate);

  return (
    <View
      style={{
        paddingHorizontal: 40,
        paddingTop: 10,
        paddingBottom: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
      }}
    >
      {/* Left column: Top-left logo (aligned at paddingLeft: 40 with bottom logo) + website, phone, address */}
      <View
        style={{
          width: 185,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: 10,
        }}
      >
        <View>
          <View style={{ marginBottom: 4 }}>
            <BrandLogoPdf />
          </View>
          <View style={pdfTypography.description}>
            {headerWebsite && (
              <Text style={{ color: "#374151", fontSize: 10, marginBottom: 1 }}>
                {headerWebsite}
              </Text>
            )}
            {headerPhone && (
              <Text style={{ color: "#374151", fontSize: 10, marginBottom: 1 }}>
                {headerPhone}
              </Text>
            )}
            {headerAddress && (
              <Text style={{ fontSize: 10 }}>{headerAddress}</Text>
            )}
            {headerCityStateZip && (
              <Text style={{ fontSize: 10 }}>{headerCityStateZip}</Text>
            )}
            {headerCountry && (
              <Text style={{ fontSize: 10 }}>{headerCountry}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Middle + Right area */}
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Middle: BILL TO only (no SHIP TO) */}
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ ...pdfTypography.title, marginBottom: 4 }}>
              BILL TO
            </Text>
            {billToName && (
              <Text
                style={{
                  ...pdfTypography.subTitle,
                  marginBottom: 2,
                }}
              >
                {billToName}
              </Text>
            )}
            <View style={pdfTypography.description}>
              {billToAddress && (
                <Text style={{ fontSize: 10 }}>{billToAddress}</Text>
              )}
              {billToCityStateZip && (
                <Text style={{ fontSize: 10 }}>{billToCityStateZip}</Text>
              )}
              {billToCountry && (
                <Text style={{ fontSize: 10 }}>{billToCountry}</Text>
              )}
            </View>
          </View>

          {/* Right: PAGE, ISSUE DATE, DUE DATE (no PKG) + JIS X 0510 QR & PDF417 2D codes */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <View style={{ width: 132, marginBottom: 4, gap: 2 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text style={{ ...pdfTypography.title, fontSize: 9, width: 60 }}>
                  PAGE
                </Text>
                <Text style={{ ...pdfTypography.subTitle, fontSize: 10, flex: 1, textAlign: "right" }}>
                  {pageNumber?.trim() || "1"}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text style={{ ...pdfTypography.title, fontSize: 9, width: 60 }}>
                  ISSUE DATE
                </Text>
                <Text style={{ ...pdfTypography.subTitle, fontSize: 10, flex: 1, textAlign: "right" }}>
                  {formattedIssueDate || "-"}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text style={{ ...pdfTypography.title, fontSize: 9, width: 60 }}>
                  DUE DATE
                </Text>
                <Text style={{ ...pdfTypography.subTitle, fontSize: 10, flex: 1, textAlign: "right" }}>
                  {formattedDueDate || "-"}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Svg viewBox={JIS_X_0510_QR_VIEWBOX} width={42} height={42}>
                <Path d={JIS_X_0510_QR_PATH} fill="#111827" />
              </Svg>
              <Svg viewBox={PDF417_VIEWBOX} width={84} height={42}>
                <Path d={PDF417_PATH} fill="#111827" />
              </Svg>
            </View>
          </View>
        </View>

        {/* Bottom row right above the dashed divider line: CUSTOMER # and ORDER # */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 6,
            marginTop: 4,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text style={{ ...pdfTypography.title, fontSize: 9 }}>
              CUSTOMER #
            </Text>
            <Text style={{ ...pdfTypography.subTitle, fontSize: 10 }}>
              {customerNumber || "-"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text style={{ ...pdfTypography.title, fontSize: 9 }}>
              ORDER #
            </Text>
            <Text style={{ ...pdfTypography.subTitle, fontSize: 10 }}>
              {orderNumber || "-"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
