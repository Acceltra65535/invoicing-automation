"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";

const normalizeLogoForPdf = async (
  logo?: string | null
): Promise<string | null | undefined> => {
  if (!logo) return logo;
  if (
    logo.startsWith("data:image/svg+xml") ||
    logo.toLowerCase().endsWith(".svg")
  ) {
    try {
      const response = await fetch(logo);
      if (!response.ok) return undefined;
      const svgText = await response.text();
      const pngDataUri = await svgToDataUri(svgText);
      return pngDataUri || undefined;
    } catch (error) {
      console.error("Failed to convert SVG logo for PDF:", error);
      return undefined;
    }
  }
  return logo;
};

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();

  useEffect(() => {
    if (status === "downloaded") {
      const timer = setTimeout(() => {
        setStatus("not-downloaded");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div>
        <h1 className="text-5xl font-semibold pb-6">Your invoice is ready</h1>
        <p className="text-neutral-500 text-xl pb-7">
          Please review the details carefully before downloading your invoice.
        </p>
        <Button
          disabled={status === "downloading"}
          onClick={async () => {
            try {
              setStatus("downloading");
              const currencyCode = (invoiceDetails.currency || "INR").toLowerCase();
              const currencyDetails = currencyList.find(
                (currencyDetail) =>
                  currencyDetail.value.toLowerCase() === currencyCode
              )?.details;

              const defaultCurrency = currencyList.find(
                (currencyDetail) =>
                  currencyDetail.value.toLowerCase() === "inr"
              )?.details;

              const data = await fetch(
                `/flag/1x1/${
                  currencyDetails?.iconName || defaultCurrency?.iconName
                }.svg`
              );
              if (!data.ok) {
                throw new Error(`Failed to load currency flag: ${data.status}`);
              }
              const svgFlag = await data.text();
              const [countryImageUrl, normalizedYourLogo, normalizedCompanyLogo] =
                await Promise.all([
                  svgToDataUri(svgFlag),
                  normalizeLogoForPdf(yourDetails.yourLogo),
                  normalizeLogoForPdf(companyDetails.companyLogo),
                ]);

              if (countryImageUrl) {
                const blob = await pdf(
                  <Document>
                    <Page size="A4" style={pdfContainers.page}>
                      <PdfDetails
                        companyDetails={{
                          ...companyDetails,
                          companyLogo: normalizedCompanyLogo,
                        }}
                        invoiceDetails={invoiceDetails}
                        invoiceTerms={invoiceTerms}
                        paymentDetails={paymentDetails}
                        yourDetails={{
                          ...yourDetails,
                          yourLogo: normalizedYourLogo,
                        }}
                        countryImageUrl={countryImageUrl}
                      />
                    </Page>
                  </Document>
                ).toBlob();
                saveAs(blob, "invoice.pdf");
                setStatus("downloaded");
              } else {
                setStatus("not-downloaded");
              }
            } catch (e) {
              console.error(e);
              setStatus("not-downloaded");
            }
          }}
          type="button"
          className="w-full h-12 rounded-lg text-lg"
        >
          {status === "not-downloaded" && (
            <>
              <Download className="mr-2 h-6 w-6" /> Download Invoice
            </>
          )}
          {status === "downloading" && (
            <>
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />{" "}
              Downloading...
            </>
          )}
          {status === "downloaded" && (
            <>
              <CheckCircle2 className="mr-2 h-6 w-6" /> Downloaded
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

Font.register({
  family: "Geist",
  fonts: [
    {
      src: "/font/Geist-Thin.ttf",
      fontWeight: "thin",
    },
    {
      src: "/font/Geist-UltraLight.ttf",
      fontWeight: "ultralight",
    },
    {
      src: "/font/Geist-Light.ttf",
      fontWeight: "light",
    },
    {
      src: "/font/Geist-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/font/Geist-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/font/Geist-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/font/Geist-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/font/Geist-UltraBlack.ttf",
      fontWeight: "ultrabold",
    },
  ],
});
