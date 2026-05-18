/* checksum : 12120db7ea3ace5baac19a7867e182a8 */
@cds.external : true
@CodeList.CurrencyCodes.Url : '../../../../default/iwbep/common/0001/$metadata'
@CodeList.CurrencyCodes.CollectionPath : 'Currencies'
@CodeList.UnitsOfMeasure.Url : '../../../../default/iwbep/common/0001/$metadata'
@CodeList.UnitsOfMeasure.CollectionPath : 'UnitsOfMeasure'
@Common.ApplyMultiUnitBehaviorForSortingAndFiltering : true
@Capabilities.FilterFunctions : [
  'eq',
  'ne',
  'gt',
  'ge',
  'lt',
  'le',
  'and',
  'or',
  'contains',
  'startswith',
  'endswith',
  'any',
  'all'
]
@SAP__support.TechnicalInfoLinks.Url : '../../../../default/iwbep/common/0001/$metadata'
@SAP__support.TechnicalInfoLinks.FunctionImport : 'GetTechnicalInfoLinks'
@Capabilities.SupportedFormats : [ 'application/json', 'application/pdf' ]
@PDF.Features.DocumentDescriptionReference : '../../../../default/iwbep/common/0001/$metadata'
@PDF.Features.DocumentDescriptionCollection : 'MyDocumentDescriptions'
@PDF.Features.ArchiveFormat : true
@PDF.Features.Border : true
@PDF.Features.CoverPage : true
@PDF.Features.FitToPage : true
@PDF.Features.FontName : true
@PDF.Features.FontSize : true
@PDF.Features.HeaderFooter : true
@PDF.Features.IANATimezoneFormat : true
@PDF.Features.Margin : true
@PDF.Features.Padding : true
@PDF.Features.ResultSizeDefault : 20000
@PDF.Features.ResultSizeMaximum : 20000
@PDF.Features.Signature : true
@PDF.Features.TextDirectionLayout : true
@PDF.Features.Treeview : true
@PDF.Features.UploadToFileShare : true
@Capabilities.KeyAsSegmentSupported : true
@Capabilities.AsynchronousRequestsSupported : true
service S4_API_SUPPLIER_QUOTATION {
  @cds.external : true
  type SAP__Message {
    code : String not null;
    message : String not null;
    target : String;
    additionalTargets : many String not null;
    transition : Boolean not null;
    @odata.Type : 'Edm.Byte'
    numericSeverity : Integer not null;
    longtextUrl : String;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Supplier Quotation'
  @Common.SemanticKey : [ 'SupplierQuotation' ]
  @Common.Messages : SAP__Messages
  @Capabilities.NavigationRestrictions.RestrictedProperties : [
    {
      NavigationProperty: _SupplierQuotationItem,
      InsertRestrictions: { Insertable: true }
    }
  ]
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.UpdateRestrictions.DeltaUpdateSupported : true
  @Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_SupplierQuotationItem' ]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.DeepUpdateSupport.ContentIDSupported : true
  @Core.OptimisticConcurrency : true
  entity SupplierQuotation {
    @Core.Computed : true
    @Common.IsUpperCase : true
    @Common.Label : 'Supplier Quotation'
    @Common.Heading : 'Quotation'
    @Common.QuickInfo : 'Supplier Quotation Number'
    key SupplierQuotation : String(10) not null;
    @Common.SAPObjectNodeTypeReference : 'CompanyCode'
    @Common.IsUpperCase : true
    @Common.Label : 'Company Code'
    @Common.Heading : 'CoCd'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BUKRS'
    CompanyCode : String(4) not null;
    @Core.Computed : true
    @Common.IsUpperCase : true
    @Common.Label : 'Purch. Doc. Category'
    @Common.Heading : 'C'
    @Common.QuickInfo : 'Purchasing Document Category'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EBSTYP'
    PurchasingDocumentCategory : String(1) not null;
    @Common.SAPObjectNodeTypeReference : 'PurchasingDocumentType'
    @Common.IsUpperCase : true
    @Common.Label : 'Quotation Type'
    @Common.Heading : 'Supplier Quotation Type'
    @Common.QuickInfo : 'Supplier Quotation Document Type'
    PurchasingDocumentType : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Supplier'
    Supplier : String(10) not null;
    @Core.Computed : true
    @Common.IsUpperCase : true
    @Common.Label : 'Created By'
    @Common.QuickInfo : 'User of person who created a purchasing document'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MMPUR_ERNAM'
    CreatedByUser : String(12) not null;
    @Core.Computed : true
    @Common.Label : 'Created On'
    @Common.Heading : 'Created'
    @Common.QuickInfo : 'Creation Date of Purchasing Document'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MMPUR_ERDAT'
    CreationDate : Date;
    @Common.Label : 'Language Key'
    @Common.Heading : 'Language'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SPRAS'
    Language : String(2) not null;
    @Common.SAPObjectNodeTypeReference : 'Currency'
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Currency'
    @Common.Heading : 'Crcy'
    @Common.QuickInfo : 'Currency Key'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERS'
    DocumentCurrency : String(3) not null;
    @Common.SAPObjectNodeTypeReference : 'IncotermsClassification'
    @Common.IsUpperCase : true
    @Common.Label : 'Incoterms'
    @Common.Heading : 'IncoT'
    @Common.QuickInfo : 'Incoterms (Part 1)'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO1'
    IncotermsClassification : String(3) not null;
    @Common.Label : 'Incoterms (Part 2)'
    @Common.Heading : 'Inco. 2'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2'
    IncotermsTransferLocation : String(28) not null;
    @Common.SAPObjectNodeTypeReference : 'IncotermsVersion'
    @Common.IsUpperCase : true
    @Common.Label : 'Incoterms Version'
    @Common.Heading : 'IncoV'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCOV'
    IncotermsVersion : String(4) not null;
    @Common.Label : 'Incoterms Location 1'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2_L'
    IncotermsLocation1 : String(70) not null;
    @Common.Label : 'Incoterms Location 2'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO3_L'
    IncotermsLocation2 : String(70) not null;
    @Common.SAPObjectNodeTypeReference : 'PaymentTerms'
    @Common.IsUpperCase : true
    @Common.Label : 'Payment Terms'
    @Common.Heading : 'PayT'
    @Common.QuickInfo : 'Terms of Payment Key'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FARP_DZTERM'
    PaymentTerms : String(4) not null;
    @Common.Label : 'Days 1'
    @Common.Heading : 'Day1'
    @Common.QuickInfo : 'Cash Discount Days 1'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZBD1T'
    CashDiscount1Days : Decimal(precision: 3) not null;
    @Common.Label : 'Days 2'
    @Common.Heading : 'Day2'
    @Common.QuickInfo : 'Cash Discount Days 2'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZBD2T'
    CashDiscount2Days : Decimal(precision: 3) not null;
    @Common.Label : 'CD Percentage 1'
    @Common.Heading : 'CD P.1'
    @Common.QuickInfo : 'Cash Discount Percentage 1'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZBD1P'
    CashDiscount1Percent : Decimal(5, 3) not null;
    @Common.Label : 'CD Percentage 2'
    @Common.Heading : 'CD P.2'
    @Common.QuickInfo : 'Cash Discount Percentage 2'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZBD2P'
    CashDiscount2Percent : Decimal(5, 3) not null;
    @Common.Label : 'Days Net'
    @Common.Heading : 'Net'
    @Common.QuickInfo : 'Net Payment Terms Period'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=DZBD3T'
    NetPaymentDays : Decimal(precision: 3) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Procedure'
    @Common.Heading : 'Proc.'
    @Common.QuickInfo : 'Procedure (Pricing, Output Control, Acct. Det., Costing,...)'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KALSM_D'
    PricingProcedure : String(6) not null;
    @Common.SAPObjectNodeTypeReference : 'PurchasingOrganization'
    @Common.IsUpperCase : true
    @Common.Label : 'Purchasing Organization'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EKORG_LL'
    PurchasingOrganization : String(4) not null;
    @Common.SAPObjectNodeTypeReference : 'PurchasingGroup'
    @Common.IsUpperCase : true
    @Common.Label : 'Purchasing Group'
    @Common.Heading : 'PGr'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BKGRP'
    PurchasingGroup : String(3) not null;
    @Common.Label : 'Document Date'
    @Common.Heading : 'Doc. Date'
    @Common.QuickInfo : 'Purchasing Document Date'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EBDAT'
    PurchasingDocumentOrderDate : Date;
    @Common.Label : 'Absolute Exchange Rate'
    AbsoluteExchangeRate : Decimal(9, 5) not null;
    @Core.Computed : true
    @Common.Label : 'Exchange Rate Is Indirect Quotation'
    ExchRateIsIndirectQuotation : Boolean not null;
    @Core.Computed : true
    @Common.Label : 'Effective Exch. Rate'
    @Common.Heading : 'Effective Exchange Rate'
    @Common.QuickInfo : 'Effective Exchange Rate'
    EffectiveExchangeRate : Decimal(12, 5) not null;
    @Common.Label : 'Fixed Exchange Rate'
    @Common.Heading : 'Fix'
    @Common.QuickInfo : 'Indicator for Fixed Exchange Rate'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KUFIX'
    ExchangeRateIsFixed : Boolean not null;
    @Common.Label : 'Valid From'
    @Common.QuickInfo : 'Start of Validity Period'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KDATB_LL'
    PurContrValidityStartDate : Date;
    @Common.Label : 'Valid To'
    @Common.QuickInfo : 'End of Validity Period'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KDATE_LL'
    PurContrValidityEndDate : Date;
    @Common.IsUpperCase : true
    @Common.Label : 'Busin. Purp. Cmpltd.'
    @Common.Heading : 'Business Purpose Completed'
    @Common.QuickInfo : 'Business Purpose Completed'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EOPBLOCKED'
    IsEndOfPurposeBlocked : String(1) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Deletion Indicator'
    @Common.Heading : 'D'
    @Common.QuickInfo : 'Deletion Indicator in Purchasing Document'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ELOEK'
    PurchasingDocumentDeletionCode : String(1) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'RFQ'
    @Common.QuickInfo : 'Request for Quotation'
    RequestForQuotation : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Quotation'
    @Common.QuickInfo : 'Quotation Number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ANGNR'
    SupplierQuotationExternalID : String(10) not null;
    @Common.Label : 'Quotation Date'
    @Common.Heading : 'Quot. Date'
    @Common.QuickInfo : 'Quotation Submission Date'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=IHRAN'
    QuotationSubmissionDate : Date;
    @Common.Label : 'Quotation Deadline'
    @Common.Heading : 'QuotDdln'
    @Common.QuickInfo : 'Deadline for Submission of Bid/Quotation'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ANGAB'
    QuotationLatestSubmissionDate : Date;
    @Common.Label : 'Binding Period'
    @Common.Heading : 'Bindg Per.'
    @Common.QuickInfo : 'Binding Period for Quotation'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EBNDT'
    BindingPeriodValidityEndDate : Date;
    @Common.IsUpperCase : true
    @Common.Label : 'Status'
    @Common.QuickInfo : 'Supplier Quotation Lifecycle Status'
    QtnLifecycleStatus : String(2) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Follow-On Document Category'
    @Common.QuickInfo : 'Follow-On Purchasing Document Category'
    FollowOnDocumentCategory : String(1) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Follow-On Document Type'
    @Common.QuickInfo : 'Follow-On Purchasing Document Type'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FOLLOWONDOCTYPE'
    PurgDocFollowOnDocumentType : String(4) not null;
    SAP__Messages : many SAP__Message not null;
    @Common.Composition : true
    _SupplierQuotationItem : Composition of many SupplierQuotationItem on _SupplierQuotationItem._SupplierQuotation = $self;
  } actions {
    action Cancel();
    action CreateSuplrQtnFromRFQAllItems(
      @Common.FieldControl : #Mandatory
      @Common.IsUpperCase : true
      @Common.Label : 'Purchasing Document'
      @Common.Heading : 'Pur. Doc.'
      @Common.QuickInfo : 'Purchasing Document Number'
      @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EBELN'
      RequestForQuotation : String(10) not null,
      @Common.FieldControl : #Mandatory
      @Common.IsUpperCase : true
      @Common.Label : 'Supplier'
      Supplier : String(10) not null,
      @Common.FieldControl : #Mandatory
      @Common.Label : 'Quotation Date'
      @Common.Heading : 'Quot. Date'
      @Common.QuickInfo : 'Quotation Submission Date'
      @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=IHRAN'
      QuotationSubmissionDate : Date
    ) returns SupplierQuotation not null;
    action SubmitSuplrQtnForApproval();
    action Complete();
    action Submit();
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Supplier Quotation Item'
  @Common.SemanticKey : [ 'SupplierQuotationItem', 'SupplierQuotation' ]
  @Common.Messages : SAP__Messages
  @Capabilities.NavigationRestrictions.RestrictedProperties : [
    {
      NavigationProperty: _SupplierQuotation,
      InsertRestrictions: { Insertable: false },
      DeepUpdateSupport: { Supported: false }
    }
  ]
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.UpdateRestrictions.DeltaUpdateSupported : true
  @Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_SupplierQuotation' ]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.DeepUpdateSupport.ContentIDSupported : true
  @Capabilities.InsertRestrictions.Insertable : false
  @Capabilities.DeleteRestrictions.Deletable : false
  @Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
    { Property: ScheduleLineOrderQuantity, AllowedExpressions: 'MultiValue' },
    { Property: AwardedQuantity, AllowedExpressions: 'MultiValue' },
    { Property: NetAmount, AllowedExpressions: 'MultiValue' },
    { Property: GrossAmount, AllowedExpressions: 'MultiValue' },
    { Property: EffectiveAmount, AllowedExpressions: 'MultiValue' },
    { Property: NetPriceAmount, AllowedExpressions: 'MultiValue' },
    { Property: NetPriceQuantity, AllowedExpressions: 'MultiValue' }
  ]
  entity SupplierQuotationItem {
    @Core.Computed : true
    @Common.IsUpperCase : true
    @Common.Label : 'Purchasing Document'
    @Common.Heading : 'Pur. Doc.'
    @Common.QuickInfo : 'Purchasing Document Number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EBELN'
    key SupplierQuotation : String(10) not null;
    @Core.Computed : true
    @Common.IsDigitSequence : true
    @Common.Label : 'Supplier Quotation Item'
    @Common.QuickInfo : 'Item Number of Supplier Quotation'
    key SupplierQuotationItem : String(5) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Purch. Doc. Category'
    @Common.Heading : 'Cat'
    @Common.QuickInfo : 'Purchasing Document Category'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BSTYP'
    PurchasingDocumentCategory : String(1) not null;
    @Common.Label : 'Short Text'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=TXZ01'
    PurchasingDocumentItemText : String(40) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Material'
    @Common.QuickInfo : 'Material Number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MATNR'
    Material : String(18) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Product Type Group'
    @Common.Heading : 'Product Type Grp'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PRODUCT_TYPE'
    ProductTypeCode : String(2) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Material'
    @Common.QuickInfo : 'Material number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EMATNR'
    ManufacturerMaterial : String(18) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Supplier Mat. No.'
    @Common.Heading : 'Supplier Material Number'
    @Common.QuickInfo : 'Material Number Used by Supplier'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=IDNLF'
    SupplierMaterialNumber : String(35) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Mfr. Part Number'
    @Common.Heading : 'MPN'
    @Common.QuickInfo : 'Manufacturer Part Number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MFRPN'
    ManufacturerPartNmbr : String(40) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Manufacturer'
    @Common.Heading : 'Manufact.'
    @Common.QuickInfo : 'Number of a Manufacturer'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MFRNR'
    Manufacturer : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Material Group'
    @Common.Heading : 'Matl Group'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MATKL'
    MaterialGroup : String(9) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Plant'
    @Common.Heading : 'Plnt'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EWERK'
    Plant : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Address'
    @Common.QuickInfo : 'Manual address number in purchasing document item'
    ManualDeliveryAddressID : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Address'
    @Common.QuickInfo : 'Number of delivery address'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ADRN2'
    ReferenceDeliveryAddressID : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Address'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ADRNR'
    AddressID : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Address'
    @Common.QuickInfo : 'Manual address number in purchasing document item'
    ItemDeliveryAddressID : String(10) not null;
    @Common.SAPObjectNodeTypeReference : 'IncotermsClassification'
    @Common.IsUpperCase : true
    @Common.Label : 'Incoterms'
    @Common.Heading : 'IncoT'
    @Common.QuickInfo : 'Incoterms (Part 1)'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO1'
    IncotermsClassification : String(3) not null;
    @Common.Label : 'Incoterms (Part 2)'
    @Common.Heading : 'Inco. 2'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2'
    IncotermsTransferLocation : String(28) not null;
    @Common.Label : 'Incoterms Location 1'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO2_L'
    IncotermsLocation1 : String(70) not null;
    @Common.Label : 'Incoterms Location 2'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INCO3_L'
    IncotermsLocation2 : String(70) not null;
    @Common.Label : 'Delivery Date'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=MM_A_DELIVERY_DATE'
    ScheduleLineDeliveryDate : Date;
    @Measures.Unit : OrderQuantityUnit
    @Common.Label : 'Scheduled Quantity'
    @Common.Heading : 'Scheduled Qty'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ETMEN'
    ScheduleLineOrderQuantity : Decimal(13, 3) not null;
    @Measures.Unit : OrderQuantityUnit
    @Common.Label : 'Awarded Quantity'
    AwardedQuantity : Decimal(13, 3) not null;
    @Common.Label : 'Start of Performance Period'
    @Common.QuickInfo : 'Start Date for Period of Performance'
    PerformancePeriodStartDate : Date;
    @Common.Label : 'End of Performance Period'
    @Common.QuickInfo : 'End Date for Period of Performance'
    PerformancePeriodEndDate : Date;
    @Common.IsUnit : true
    @Common.Label : 'Order Price Unit'
    @Common.Heading : 'OPU'
    @Common.QuickInfo : 'Order Price Unit (Purchasing)'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BBPRM'
    OrderPriceUnit : String(3) not null;
    @Common.Label : 'Quantity Conversion'
    @Common.Heading : 'Conv.'
    @Common.QuickInfo : 'Numerator for Conversion of Order Price Unit into Order Unit'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BPUMZ'
    OrderPriceUnitToOrderUnitNmrtr : Decimal(precision: 5) not null;
    @Common.Label : 'Quantity Conversion'
    @Common.Heading : 'Conv.'
    @Common.QuickInfo : 'Denominator for Conv. of Order Price Unit into Order Unit'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BPUMN'
    OrdPriceUnitToOrderUnitDnmntr : Decimal(precision: 5) not null;
    @Common.IsUnit : true
    @Common.Label : 'Order Unit'
    @Common.Heading : 'OUn'
    @Common.QuickInfo : 'Purchase Order Unit of Measure'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BSTME'
    OrderQuantityUnit : String(3) not null;
    @Common.Label : 'Equal To'
    @Common.Heading : 'Eq. To'
    @Common.QuickInfo : 'Numerator for Conversion of Order Unit to Base Unit'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=UMBSZ'
    OrderItemQtyToBaseQtyNmrtr : Decimal(precision: 5) not null;
    @Common.Label : 'Denominator'
    @Common.Heading : 'Denom.'
    @Common.QuickInfo : 'Denominator for Conversion of Order Unit to Base Unit'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=UMBSN'
    OrderItemQtyToBaseQtyDnmntr : Decimal(precision: 5) not null;
    @Common.Label : 'Price Date'
    @Common.QuickInfo : 'Date of Price Determination'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PREDT'
    PurgDocPriceDate : Date;
    @Common.IsUnit : true
    @Common.Label : 'Base Unit of Measure'
    @Common.Heading : 'BUn'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=LAGME'
    BaseUnit : String(3) not null;
    @Measures.ISOCurrency : DocumentCurrency
    @Common.Label : 'Quotation Net Value'
    NetAmount : Decimal(precision: 13) not null;
    @Measures.ISOCurrency : DocumentCurrency
    @Common.Label : 'Gross order value'
    @Common.Heading : 'Gross value'
    @Common.QuickInfo : 'Gross order value in PO currency'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BBWERT'
    GrossAmount : Decimal(precision: 13) not null;
    @Measures.ISOCurrency : DocumentCurrency
    @Common.Label : 'Effective value'
    @Common.QuickInfo : 'Effective value of item'
    EffectiveAmount : Decimal(precision: 13) not null;
    @Measures.ISOCurrency : DocumentCurrency
    @Common.Label : 'Net Order Price'
    @Common.Heading : 'Net Price'
    @Common.QuickInfo : 'Net Price in Purchasing Document (in Document Currency)'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BPREI'
    NetPriceAmount : Decimal(precision: 11) not null;
    @Measures.Unit : OrderQuantityUnit
    @Common.Label : 'Price Unit'
    @Common.Heading : 'Per'
    NetPriceQuantity : Decimal(precision: 5) not null;
    @Common.SAPObjectNodeTypeReference : 'Currency'
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Currency'
    @Common.Heading : 'Crcy'
    @Common.QuickInfo : 'Currency Key'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERS'
    DocumentCurrency : String(3) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Purchase Requisition'
    @Common.Heading : 'Purch.Req.'
    @Common.QuickInfo : 'Purchase Requisition Number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BANFN'
    PurchaseRequisition : String(10) not null;
    @Common.IsDigitSequence : true
    @Common.Label : 'Item of requisition'
    @Common.Heading : 'Item'
    @Common.QuickInfo : 'Item Number of Purchase Requisition'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BNFPO'
    PurchaseRequisitionItem : String(5) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Req. for Quotation'
    @Common.Heading : 'RFQ'
    @Common.QuickInfo : 'Identifier for Request for Quotation'
    RequestForQuotation : String(10) not null;
    @Common.IsDigitSequence : true
    @Common.Label : 'Item Number for RFQ'
    @Common.QuickInfo : 'Item Number for Request for Quotation'
    RequestForQuotationItem : String(5) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Info Record Update'
    @Common.Heading : 'I'
    @Common.QuickInfo : 'Indicator: Update Info Record'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=SPINF'
    PurchasingInfoRecordUpdateCode : String(1) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Purchasing Info Rec.'
    @Common.Heading : 'Info Rec.'
    @Common.QuickInfo : 'Purchasing Info Record Number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=INFNR'
    PurchasingInfoRecord : String(10) not null;
    @Common.SAPObjectNodeTypeReference : 'PurchasingDocumentItemCategory'
    @Common.IsUpperCase : true
    @Common.Label : 'Item Category'
    @Common.Heading : 'I'
    @Common.QuickInfo : 'Item category in purchasing document'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=PSTYP'
    PurchasingDocumentItemCategory : String(1) not null;
    @odata.Precision : 7
    @odata.Type : 'Edm.DateTimeOffset'
    @Core.Computed : true
    @Common.Label : 'Last Changed'
    @Common.QuickInfo : 'Change Time Stamp'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=CHANGEDATETIME'
    LastChangeDateTime : Timestamp;
    SAP__Messages : many SAP__Message not null;
    _SupplierQuotation : Association to one SupplierQuotation on _SupplierQuotation.SupplierQuotation = SupplierQuotation;
  };
};

