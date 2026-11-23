import { Path, Svg, View } from "@react-pdf/renderer";
import { BrandLogoPdf } from "./brandLogoPdf";
import { YourDetailsPDF } from "./yourDetails/yourDetailsPdf";
import { InvoiceTermsPdf } from "./invoiceTerms/InvoiceTermsPdf";
import { CompanyDetailsPdf } from "./companyDetails/companyDetailsPdf";
import { InvoiceDetailsPdf } from "./invoiceDetails/invoiceDetailsPdf";
import { PaymentDetailsPdf } from "./paymentDetails/paymentDetailsPdf";
import {
  JIS_X_0510_QR_PATH,
  JIS_X_0510_QR_VIEWBOX,
  PDF417_PATH,
  PDF417_VIEWBOX,
} from "@/lib/headerCodes";
import { pdfUtils } from "@/lib/pdfStyles";

export const PdfDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  countryImageUrl,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  countryImageUrl: string;
}) => (
  <View style={{ display: "flex", flexDirection: "column" }}>
    <InvoiceTermsPdf {...invoiceTerms} />
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        ...pdfUtils.borderTop,
        ...pdfUtils.borderBottom,
      }}
    >
      <YourDetailsPDF {...yourDetails} />
      <CompanyDetailsPdf {...companyDetails} />
    </View>
    <View>
      <View style={pdfUtils.borderBottom}>
        <InvoiceDetailsPdf {...invoiceDetails} />
      </View>
      <View>
        <PaymentDetailsPdf
          {...paymentDetails}
          countryImageUrl={countryImageUrl}
        />
      </View>
    </View>
    <View
      wrap={false}
      style={{
        paddingHorizontal: 40,
        paddingTop: 8,
        paddingBottom: 14,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <BrandLogoPdf />
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
);
