/* eslint-disable @next/next/no-img-element */
import { format, isValid } from "date-fns";
import { ChevronDown } from "lucide-react";
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

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void }
> = ({
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
  onClick,
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
    <div
      className="border-b pt-3.5 pb-2.5 px-10 border-dashed group cursor-pointer relative"
      onClick={() => onClick && onClick("5")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}

      <div className="flex items-stretch justify-between gap-4">
        {/* Left column: Top-left logo (aligned at x=40px with bottom logo) + website, phone, address */}
        <div className="w-[185px] shrink-0 flex flex-col justify-between">
          <div>
            <img
              src="/cjtest.svg"
              alt="Cyberjar logo"
              className="h-8 w-auto block mb-2"
            />
            <div className="text-xs text-neutral-500/80 space-y-1">
              {headerWebsite ? (
                <p className="text-neutral-700 font-medium truncate">
                  {headerWebsite}
                </p>
              ) : (
                <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-4/5 animate-pulse" />
              )}
              {headerPhone ? (
                <p className="text-neutral-700 font-medium truncate">
                  {headerPhone}
                </p>
              ) : (
                <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-3/5 animate-pulse" />
              )}
              {headerAddress ? (
                <p className="truncate">{headerAddress}</p>
              ) : (
                <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-5/6 animate-pulse" />
              )}
              {headerCityStateZip ? (
                <p className="truncate">{headerCityStateZip}</p>
              ) : (
                <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-4/6 animate-pulse" />
              )}
              {headerCountry ? (
                <p className="truncate">{headerCountry}</p>
              ) : (
                <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-1/2 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Middle + Right area */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-start gap-3">
            {/* Middle: BILL TO only (no SHIP TO) */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-neutral-400 font-semibold uppercase mb-1.5">
                BILL TO
              </p>
              {billToName ? (
                <p className="text-sm font-medium text-neutral-800 truncate mb-0.5">
                  {billToName}
                </p>
              ) : (
                <div className="rounded-[3.5px] bg-neutral-100 h-4 w-4/5 animate-pulse mb-1.5" />
              )}
              <div className="text-xs text-neutral-500/80 space-y-1">
                {billToAddress ? (
                  <p className="truncate">{billToAddress}</p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-3/4 animate-pulse" />
                )}
                {billToCityStateZip ? (
                  <p className="truncate">{billToCityStateZip}</p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-5/6 animate-pulse" />
                )}
                {billToCountry ? (
                  <p className="truncate">{billToCountry}</p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-3.5 w-1/2 animate-pulse" />
                )}
              </div>
            </div>

            {/* Right: PAGE#, ISSUE DATE, DUE DATE (no PKG) + JIS X 0510 QR & PDF417 2D codes */}
            <div className="flex flex-col items-end shrink-0">
              <div className="w-[132px] space-y-1 mb-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                    PAGE
                  </span>
                  <span className="font-medium text-xs text-neutral-800">
                    {pageNumber?.trim() || "1"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                    ISSUE DATE
                  </span>
                  {formattedIssueDate ? (
                    <span className="font-medium text-xs text-neutral-800">
                      {formattedIssueDate}
                    </span>
                  ) : (
                    <span className="inline-block rounded-[3.5px] bg-neutral-100 h-3.5 w-16 animate-pulse" />
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                    DUE DATE
                  </span>
                  {formattedDueDate ? (
                    <span className="font-medium text-xs text-neutral-800">
                      {formattedDueDate}
                    </span>
                  ) : (
                    <span className="inline-block rounded-[3.5px] bg-neutral-100 h-3.5 w-16 animate-pulse" />
                  )}
                </div>
              </div>
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

          {/* Bottom row right above the dashed divider line: CUSTOMER # and ORDER # */}
          <div className="flex items-center justify-between pt-2.5 mt-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                CUSTOMER #
              </span>
              {customerNumber ? (
                <span className="font-medium text-xs text-neutral-800">
                  {customerNumber}
                </span>
              ) : (
                <span className="inline-block rounded-[3.5px] bg-neutral-100 h-3.5 w-20 animate-pulse" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                ORDER #
              </span>
              {orderNumber ? (
                <span className="font-medium text-xs text-neutral-800">
                  {orderNumber}
                </span>
              ) : (
                <span className="inline-block rounded-[3.5px] bg-neutral-100 h-3.5 w-20 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
