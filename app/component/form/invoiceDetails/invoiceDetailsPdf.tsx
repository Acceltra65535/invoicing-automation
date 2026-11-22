import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { currencyList } from "@/lib/currency";
import {
  addCommasToNumber,
  calculateInvoiceTotals,
  getItemLineTotal,
  parseNumber,
} from "@/lib/invoiceCalculations";
import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";

export const InvoiceDetailsPdf: React.FC<InvoiceItemDetails> = ({
  note,
  discount,
  taxRate,
  items = [],
  currency = "INR",
}) => {
  const currencyType = currency || "INR";
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === currencyType.toLowerCase()
  )?.details;
  const { subtotal, discountValue, taxRateValue, taxAmount, totalAmount } =
    calculateInvoiceTotals(items, discount, taxRate);

  return (
    <View>
      <View style={pdfUtils.flexRowItemCenter}>
        <View style={{ flex: 1, paddingHorizontal: 40, paddingVertical: 12 }}>
          <Text style={pdfTypography.title}>Description</Text>
        </View>
        <View
          style={{
            flex: 1,
            ...pdfUtils.flexRowItemCenter,
            paddingHorizontal: 40,
            paddingVertical: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={pdfTypography.title}>QTY</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={pdfTypography.title}>Price</Text>
          </View>
          <View style={{ flex: 1, textAlign: "right" }}>
            <Text style={pdfTypography.title}>Amount</Text>
          </View>
        </View>
      </View>
      {items.map(({ itemDescription, amount, qty }, index) => {
        const containerStyle = {
          marginHorizontal: 40,
          paddingVertical: 11,
          ...pdfUtils.borderBottom,
          ...pdfUtils.flexRowItemCenter,
        };
        const borderStyle = index === 0 ? pdfUtils.borderTop : {};
        const numericQty = parseNumber(qty);
        const numericAmount = parseNumber(amount);
        const lineTotal = getItemLineTotal({ itemDescription, amount, qty });

        return (
          <View
            key={index}
            style={{
              ...containerStyle,
              ...borderStyle,
            }}
          >
            <Text style={{ flex: 1, ...pdfTypography.itemDescription }}>
              {itemDescription}
            </Text>
            <View
              style={{
                flex: 1,
                ...pdfUtils.flexRowItemCenter,
                paddingLeft: 80,
              }}
            >
              <Text style={{ flex: 1, ...pdfTypography.itemDescription }}>
                {numericQty > 0 ? numericQty : "-"}
              </Text>
              <Text style={{ flex: 1, ...pdfTypography.itemDescription }}>
                {numericAmount > 0 ? addCommasToNumber(numericAmount) : ""}
              </Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  textAlign: "right",
                }}
              >
                {numericAmount > 0
                  ? `${currencyDetails?.currencySymbol || ""}${addCommasToNumber(
                      lineTotal
                    )}`
                  : ""}
              </Text>
            </View>
          </View>
        );
      })}
      <View style={pdfUtils.flexRowItemCenter}>
        <View style={{ flex: 1, paddingTop: 16 }}>
          {note && (
            <View style={{ paddingHorizontal: 40 }}>
              <Text style={pdfTypography.title}>Note</Text>
              <Text style={pdfTypography.itemDescription}>{note}</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginHorizontal: 40,
              paddingVertical: 11,
              ...pdfUtils.flexRowItemCenter,
              ...pdfUtils.borderBottom,
            }}
          >
            <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
              Subtotal
            </Text>
            <Text
              style={{
                ...pdfTypography.itemDescription,
                flex: 1,
                textAlign: "right",
              }}
            >
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(subtotal)}
            </Text>
          </View>
          {discountValue > 0 && (
            <View
              style={{
                marginHorizontal: 40,
                paddingVertical: 11,
                ...pdfUtils.flexRowItemCenter,
                ...pdfUtils.borderBottom,
              }}
            >
              <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
                Discount
              </Text>
              <Text
                style={{
                  ...pdfTypography.itemDescription,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(discountValue)}
              </Text>
            </View>
          )}
          {taxRateValue > 0 && (
            <View
              style={{
                marginHorizontal: 40,
                paddingVertical: 11,
                ...pdfUtils.flexRowItemCenter,
                ...pdfUtils.borderBottom,
              }}
            >
              <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
                Tax ({taxRateValue}%)
              </Text>
              <Text
                style={{
                  ...pdfTypography.itemDescription,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(taxAmount)}
              </Text>
            </View>
          )}
          <View
            style={{
              marginHorizontal: 40,
              paddingVertical: 11,
              ...pdfUtils.flexRowItemCenter,
            }}
          >
            <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
              Amount
            </Text>
            <Text
              style={{ ...pdfTypography.amount, textAlign: "right", flex: 1 }}
            >
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(totalAmount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
