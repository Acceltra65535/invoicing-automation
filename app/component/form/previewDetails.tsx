import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import {
  JIS_X_0510_QR_PATH,
  JIS_X_0510_QR_VIEWBOX,
  PDF417_PATH,
  PDF417_VIEWBOX,
} from "@/lib/headerCodes";
import { ChevronDown } from "lucide-react";

export const PreviewDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  onClick,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
}) => (
  <div className="overflow-x-auto">
    <div className="w-[595px] bg-white rounded-2xl border border-dashed flex flex-col">
      <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} />
      <div className="border-b  grid grid-cols-2 justify-between border-dashed">
        <div
          className="py-3 px-10 border-r border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("1")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <YourDetailsPreview {...yourDetails} />
        </div>
        <div
          className="py-3 px-10 border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("2")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <CompanyDetailsPreview {...companyDetails} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="border-b justify-between border-dashed">
          <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} />
        </div>
        <div className="">
          <PaymentDetailsPreview {...paymentDetails} onClick={onClick} />
        </div>
      </div>
      <div className="px-10 pt-2 pb-4 flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cjtest.svg"
          alt="Cyberjar logo"
          className="h-8 w-auto block"
        />
        <div
          className="flex items-center gap-[6px]"
          title="Temporary invalid 2D codes (JIS X 0510 & PDF417)"
        >
          <svg
            viewBox={JIS_X_0510_QR_VIEWBOX}
            className="w-[42px] h-[42px] shrink-0"
            aria-label="JIS X 0510 QR Code"
          >
            <path d={JIS_X_0510_QR_PATH} fill="#111827" />
          </svg>
          <svg
            viewBox={PDF417_VIEWBOX}
            className="w-[84px] h-[42px] shrink-0"
            preserveAspectRatio="none"
            aria-label="PDF417 2D Barcode"
          >
            <path d={PDF417_PATH} fill="#111827" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);
