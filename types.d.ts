interface CompanyDetails {
  email?: string | null;
  companyName?: string | null;
  companyAddress?: string | null;
  companyCity?: string | null;
  companyState?: string | null;
  companyCountry?: string | null;
  companyLogo?: string | null;
  companyTaxId?: string | null;
  companyZip?: string | null;
}

interface YourDetails {
  yourEmail?: string | null;
  yourName?: string | null;
  yourAddress?: string | null;
  yourCity?: string | null;
  yourState?: string | null;
  yourCountry?: string | null;
  yourLogo?: string | null;
  yourTaxId?: string | null;
  yourZip?: string | null;
}

interface InvoiceItemDetails {
  note?: string | null;
  discount?: string | null;
  taxRate?: string | null;
  items: Item[];
  currency?: string;
}

interface Item {
  itemDescription: string;
  qty?: number | string;
  amount?: number | string;
}

interface InvoiceTerms {
  invoiceNumber?: string | null;
  orderNumber?: string | null;
  customerNumber?: string | null;
  pageNumber?: string | null;
  issueDate?: string | null;
  dueDate?: string | null;
  headerWebsite?: string | null;
  headerPhone?: string | null;
  headerAddress?: string | null;
  headerCity?: string | null;
  headerState?: string | null;
  headerZip?: string | null;
  headerCountry?: string | null;
  billToName?: string | null;
  billToAddress?: string | null;
  billToCity?: string | null;
  billToState?: string | null;
  billToZip?: string | null;
  billToCountry?: string | null;
}

interface PaymentDetails {
  bankName?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  routingCode?: string | null;
  swiftCode?: string | null;
  ifscCode?: string | null;
  currency?: string;
}

type InvoiceData = PaymentDetails &
  InvoiceTerms &
  InvoiceItemDetails &
  YourDetails &
  CompanyDetails;
