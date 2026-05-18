/* checksum : 0a2d30a5680ea64980ba0651eab2096f */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service S4_API_RFQ_PROCESS {
  @cds.external : true
  @cds.persistence.skip : true
  @sap.content.version : '1'
  @sap.label : 'Request for Quotation'
  entity A_RequestForQuotation {
    @sap.display.format : 'UpperCase'
    @sap.label : 'RFQ'
    @sap.quickinfo : 'Request for Quotation'
    key RequestForQuotation : String(10) not null;
    @sap.display.format : 'UpperCase'
    @sap.label : 'Company Code'
    CompanyCode : String(4);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Purch. Doc. Category'
    @sap.quickinfo : 'Purchasing Document Category'
    PurchasingDocumentCategory : String(1);
    @sap.display.format : 'UpperCase'
    @sap.label : 'RFQ Type'
    @sap.quickinfo : 'RFQ Document Type'
    PurchasingDocumentType : String(4);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Created By'
    @sap.quickinfo : 'User of person who created a purchasing document'
    CreatedByUser : String(12);
    @sap.display.format : 'Date'
    @sap.label : 'Created On'
    @sap.quickinfo : 'Creation Date of Purchasing Document'
    CreationDate : Date;
    @odata.Type : 'Edm.DateTimeOffset'
    @odata.Precision : 7
    @sap.label : 'Last Changed'
    @sap.quickinfo : 'Change Time Stamp'
    LastChangeDateTime : Timestamp;
    @sap.label : 'Language Key'
    Language : String(2);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Purchasing Organization'
    PurchasingOrganization : String(4);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Purchasing Group'
    PurchasingGroup : String(3);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Currency'
    @sap.quickinfo : 'Currency Key'
    @sap.semantics : 'currency-code'
    DocumentCurrency : String(5);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Incoterms'
    @sap.quickinfo : 'Incoterms (Part 1)'
    IncotermsClassification : String(3);
    @sap.label : 'Incoterms (Part 2)'
    IncotermsTransferLocation : String(28);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Incoterms Version'
    IncotermsVersion : String(4);
    @sap.label : 'Incoterms Location 1'
    IncotermsLocation1 : String(70);
    @sap.label : 'Incoterms Location 2'
    IncotermsLocation2 : String(70);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Payment Terms'
    @sap.quickinfo : 'Terms of Payment Key'
    PaymentTerms : String(4);
    @sap.label : 'Days 1'
    @sap.quickinfo : 'Cash Discount Days 1'
    CashDiscount1Days : Decimal(3, 0);
    @sap.label : 'Days 2'
    @sap.quickinfo : 'Cash Discount Days 2'
    CashDiscount2Days : Decimal(3, 0);
    @sap.label : 'Disc. Percent 1'
    @sap.quickinfo : 'Cash discount percentage 1'
    CashDiscount1Percent : Decimal(5, 3);
    @sap.label : 'Disc. Percent 2'
    @sap.quickinfo : 'Cash discount percentage 2'
    CashDiscount2Percent : Decimal(5, 3);
    @sap.label : 'Days Net'
    @sap.quickinfo : 'Net Payment Terms Period'
    NetPaymentDays : Decimal(3, 0);
    @sap.display.format : 'Date'
    @sap.label : 'Publishing Date'
    @sap.quickinfo : 'RFQ Publishing Date'
    RFQPublishingDate : Date;
    @sap.display.format : 'Date'
    @sap.label : 'Quotation Deadline'
    @sap.quickinfo : 'Deadline for Submission of Bid/Quotation'
    QuotationLatestSubmissionDate : Date;
    @sap.display.format : 'Date'
    @sap.label : 'Binding Period'
    @sap.quickinfo : 'Binding Period for Quotation'
    BindingPeriodValidityEndDate : Date;
    @sap.unit : 'DocumentCurrency'
    @sap.variable.scale : 'true'
    @sap.label : 'Target Value'
    @sap.quickinfo : 'Target Value for Header Area per Distribution'
    TargetAmount : Decimal(15, 3);
    @sap.label : 'Our Reference'
    CorrespncInternalReference : String(12);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Status'
    @sap.quickinfo : 'RFQ Lifecycle Status'
    RFQLifecycleStatus : String(2);
    @sap.label : 'RFQ Description'
    @sap.quickinfo : 'Short description or the title of the RFQ'
    RequestForQuotationName : String(40);
    @sap.display.format : 'Date'
    @sap.label : 'Quotation Start Date'
    @sap.quickinfo : 'The date as of which Quotations can be submitted'
    QuotationEarliestSubmsnDate : Date;
    @sap.display.format : 'Date'
    @sap.label : 'Apply By'
    @sap.quickinfo : 'Closing Date for Applications'
    LatestRegistrationDate : Date;
    @sap.display.format : 'UpperCase'
    @sap.label : 'Follow-On Document Category'
    @sap.quickinfo : 'Follow-On Purchasing Document Category'
    FollowOnDocumentCategory : String(1);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Follow-On Document Type'
    @sap.quickinfo : 'Follow-On Purchasing Document Type'
    FollowOnDocumentType : String(4);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Busin. Purp. Cmpltd.'
    @sap.quickinfo : 'Business Purpose Completed'
    IsEndOfPurposeBlocked : String(1);
    @sap.field.control : 'YY1_Contactpersonname1_PDHF'
    @sap.label : 'Contact person name1'
    @sap.quickinfo : 'Contact Person Name1'
    @sap.is.extension.field : 'true'
    YY1_Contactpersonname1_PDH : String(20);
    @sap.field.control : 'YY1_ContactMobile3_PDHF'
    @sap.label : 'Contact Mobile 3'
    @sap.is.extension.field : 'true'
    YY1_ContactMobile3_PDH : String(30);
    @sap.field.control : 'YY1_POPurpose1_PDHF'
    @sap.label : 'PO Purpose'
    @sap.is.extension.field : 'true'
    YY1_POPurpose1_PDH : String(100);
    @sap.field.control : 'YY1_QuotationDate_PO_PDHF'
    @sap.label : 'Quotation Date'
    @sap.is.extension.field : 'true'
    YY1_QuotationDate_PO_PDH : String(12);
    @sap.field.control : 'YY1_PurchaseSubject_PDHF'
    @sap.label : 'Purchase Subject'
    @sap.is.extension.field : 'true'
    YY1_PurchaseSubject_PDH : String(250);
    @sap.field.control : 'YY1_ImportType_PDHF'
    @sap.text : 'YY1_ImportType_PDHT'
    @sap.label : 'Import Type'
    @sap.value.list : 'standard'
    @sap.is.extension.field : 'true'
    YY1_ImportType_PDH : String(3);
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_ContactMobile3_PDHF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_Contactpersonname1_PDHF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_ImportType_PDHF : Integer;
    @sap.field.control : 'YY1_ImportType_PDHF'
    @sap.label : 'Import Type (Desc.)'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_ImportType_PDHT : String(60);
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_POPurpose1_PDHF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_PurchaseSubject_PDHF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_QuotationDate_PO_PDHF : Integer;
    to_RequestForQuotationBidder : Composition of many A_RequestForQuotationBidder {  };
    to_RequestForQuotationItem : Composition of many A_RequestForQuotationItem {  };
  };

  @cds.external : true
  @cds.persistence.skip : true
  @sap.content.version : '1'
  @sap.label : 'Bidder'
  entity A_RequestForQuotationBidder {
    @sap.display.format : 'UpperCase'
    @sap.label : 'Purchasing Document'
    @sap.quickinfo : 'Purchasing Document Number'
    key RequestForQuotation : String(10) not null;
    @sap.display.format : 'NonNegative'
    @sap.label : 'Partner counter'
    key PartnerCounter : String(3) not null;
    @sap.display.format : 'UpperCase'
    @sap.label : 'Partner Function'
    PartnerFunction : String(2);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Supplier'
    @sap.quickinfo : 'Account Number of Supplier'
    Supplier : String(10);
  };

  @cds.external : true
  @cds.persistence.skip : true
  @sap.content.version : '1'
  @sap.label : 'Item'
  entity A_RequestForQuotationItem {
    @sap.display.format : 'NonNegative'
    @sap.label : 'RFQ Item'
    @sap.quickinfo : 'Item Number of Request For Quotation'
    key RequestForQuotationItem : String(5) not null;
    @sap.display.format : 'UpperCase'
    @sap.label : 'Purchasing Document'
    @sap.quickinfo : 'Purchasing Document Number'
    key RequestForQuotation : String(10) not null;
    @sap.display.format : 'UpperCase'
    @sap.label : 'Purch. Doc. Category'
    @sap.quickinfo : 'Purchasing Document Category'
    PurchasingDocumentCategory : String(1);
    @sap.label : 'Short Text'
    PurchasingDocumentItemText : String(40);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Material'
    @sap.quickinfo : 'Material Number'
    Material : String(40);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Material'
    @sap.quickinfo : 'Manufacturer Material'
    ManufacturerMaterial : String(40);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Mfr. Part Number'
    @sap.quickinfo : 'Manufacturer Part Number'
    ManufacturerPartNmbr : String(40);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Manufacturer'
    @sap.quickinfo : 'Number of a Manufacturer'
    Manufacturer : String(10);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Material Group'
    MaterialGroup : String(9);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Plant'
    Plant : String(4);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Address'
    @sap.quickinfo : 'Manual address number in purchasing document item'
    ManualDeliveryAddressID : String(10);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Address'
    @sap.quickinfo : 'Number of delivery address'
    ReferenceDeliveryAddressID : String(10);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Incoterms'
    @sap.quickinfo : 'Incoterms (Part 1)'
    IncotermsClassification : String(3);
    @sap.label : 'Incoterms (Part 2)'
    IncotermsTransferLocation : String(28);
    @sap.label : 'Incoterms Location 1'
    IncotermsLocation1 : String(70);
    @sap.label : 'Incoterms Location 2'
    IncotermsLocation2 : String(70);
    @sap.display.format : 'Date'
    @sap.label : 'Delivery Date'
    ScheduleLineDeliveryDate : Date;
    @sap.unit : 'OrderQuantityUnit'
    @sap.label : 'Requested Quantity'
    ScheduleLineOrderQuantity : Decimal(13, 3);
    @sap.label : 'Order Unit'
    @sap.quickinfo : 'Purchase Order Unit of Measure'
    @sap.semantics : 'unit-of-measure'
    OrderQuantityUnit : String(3);
    @sap.label : 'Equal To'
    @sap.quickinfo : 'Numerator for Conversion of Order Unit to Base Unit'
    OrderItemQtyToBaseQtyNmrtr : Decimal(5, 0);
    @sap.label : 'Denominator'
    @sap.quickinfo : 'Denominator for Conversion of Order Unit to Base Unit'
    OrderItemQtyToBaseQtyDnmntr : Decimal(5, 0);
    @sap.label : 'Base Unit of Measure'
    @sap.semantics : 'unit-of-measure'
    BaseUnit : String(3);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Purchase Requisition'
    @sap.quickinfo : 'Purchase Requisition Number'
    PurchaseRequisition : String(10);
    @sap.display.format : 'NonNegative'
    @sap.label : 'Item of requisition'
    @sap.quickinfo : 'Item Number of Purchase Requisition'
    PurchaseRequisitionItem : String(5);
    @sap.label : 'Info Record Update'
    @sap.quickinfo : 'Indicator for Info Record Update'
    IsInfoRecordUpdated : Boolean;
    @sap.field.control : 'YY1_AwardedQuoteItem_PDIF'
    @sap.label : 'Awarded Quote item'
    @sap.quickinfo : 'Awarded Quotation Item'
    @sap.is.extension.field : 'true'
    YY1_AwardedQuoteItem_PDI : String(6);
    @sap.field.control : 'YY1_Awarded_Quote_VLI_PDIF'
    @sap.label : 'Awarded Quotation Number'
    @sap.is.extension.field : 'true'
    YY1_Awarded_Quote_VLI_PDI : Decimal(10, 0);
    @sap.field.control : 'YY1_MaterialMake_PDIF'
    @sap.label : 'Material Make'
    @sap.is.extension.field : 'true'
    YY1_MaterialMake_PDI : String(70);
    @sap.field.control : 'YY1_RFQ_TITLE_VLI_PDIF'
    @sap.label : 'RFQ TITLE'
    @sap.is.extension.field : 'true'
    YY1_RFQ_TITLE_VLI_PDI : String(20);
    @sap.field.control : 'YY1_Specifications_PDIF'
    @sap.label : 'Specifications'
    @sap.is.extension.field : 'true'
    YY1_Specifications_PDI : String(200);
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_AwardedQuoteItem_PDIF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_Awarded_Quote_VLI_PDIF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_MaterialMake_PDIF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_RFQ_TITLE_VLI_PDIF : Integer;
    @odata.Type : 'Edm.Byte'
    @sap.visible : 'false'
    @sap.label : 'UI Field Control'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.filterable : 'false'
    @sap.is.extension.field : 'true'
    YY1_Specifications_PDIF : Integer;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.deletable : 'false'
  @sap.content.version : '1'
  @sap.label : 'Material Make'
  entity YY1_MaterialMake {
    @sap.required.in.filter : 'false'
    @sap.label : 'Material Make'
    @sap.quickinfo : 'Characteristic Value'
    key CharcValue : String(70) not null;
    @sap.required.in.filter : 'false'
    @sap.label : 'Material Number'
    ClfnObjId : String(90);
  };

  @cds.external : true
  @cds.persistence.skip : true
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.deletable : 'false'
  @sap.content.version : '1'
  @sap.countable : 'true'
  @sap.searchable : 'true'
  @sap.semantics : 'aggregate'
  @sap.value.list : 'true'
  entity YY1_ImportTypeSet {
    @sap.text : 'Description'
    @sap.label : 'Import Type'
    key Code : String(3) not null;
    @sap.label : 'Import Type (Desc.)'
    Description : String(60);
  };

  @cds.external : true
  type ChangeStatusExportParameters {
    @sap.label : 'RFQ Lifecycle Status'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    RFQLifecycleStatus : String(2) not null;
  };

  @cds.external : true
  action Complete(
    @sap.label : 'Request for Quotation'
    RequestForQuotation : String(10)
  ) returns ChangeStatusExportParameters;

  @cds.external : true
  action Cancel(
    @sap.label : 'Request for Quotation'
    RequestForQuotation : String(10)
  ) returns ChangeStatusExportParameters;

  @cds.external : true
  action SubmitForApproval(
    @sap.label : 'Request for Quotation'
    RequestForQuotation : String(10)
  ) returns ChangeStatusExportParameters;
};

