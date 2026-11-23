"use client";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import CustomTextInput from "@/app/component/ui/customTextInput";
import DateInput from "@/app/component/ui/dateInput";

export const InvoiceTermsForm = () => (
  <div className="pt-12">
    <p className="text-2xl font-semibold pb-3">Invoice terms</p>
    <CustomTextInput
      label="Order #"
      placeholder="e.g. 121866266"
      variableName="orderNo"
    />
    <CustomTextInput
      label="Customer #"
      placeholder="e.g. 9353133670"
      variableName="customerNo"
    />
    <CustomNumberInput
      label="Page #"
      placeholder="1"
      variableName="pageNo"
    />
    <DateInput label="Issue date" variableName="issueDate" />
    <DateInput label="Due date" variableName="dueDate" />

    <p className="pb-2 pt-6 text-sm font-medium text-neutral-500">
      Company details (Under Logo)
    </p>
    <CustomTextInput
      label="Website"
      placeholder="e.g. www.usps.com"
      variableName="headerWebsite"
    />
    <CustomTextInput
      label="Phone"
      placeholder="e.g. 1(844)737-7826"
      variableName="headerPhone"
    />
    <CustomTextInput
      label="Address"
      placeholder="8300 NE Underground Drive"
      variableName="headerAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="Kansas City"
      variableName="headerCity"
    />
    <CustomTextInput
      label="State"
      placeholder="MO"
      variableName="headerState"
    />
    <CustomNumberInput
      label="Zip"
      placeholder="64144"
      variableName="headerZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="USA"
      variableName="headerCountry"
    />

    <p className="pb-2 pt-6 text-sm font-medium text-neutral-500">
      Bill To details
    </p>
    <CustomTextInput
      label="Name"
      placeholder="Zhipeng Yuan"
      variableName="billToName"
    />
    <CustomTextInput
      label="Address"
      placeholder="230 A St, Apt 10"
      variableName="billToAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="Davis"
      variableName="billToCity"
    />
    <CustomTextInput
      label="State"
      placeholder="CA"
      variableName="billToState"
    />
    <CustomNumberInput
      label="Zip"
      placeholder="95616"
      variableName="billToZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="USA"
      variableName="billToCountry"
    />
  </div>
);
