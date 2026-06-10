/* checksum : 3842d7aa5524462949e61079563c9a70 */
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
service S4_API_QUOTATION_COMPARISON {
  @cds.external : true
  type QuotationComparisonCbAControl {
    @Common.Label : 'Dynamic CbA-Control'
    @Common.Heading : 'Dynamic Create by Association Control'
    @Common.QuickInfo : 'Dynamic Create via Association Control Property'
    _CompareQuotationItem : Boolean not null;
  };

  @cds.external : true
  type EntityControl {
    @Common.Label : 'Dyn. Method Control'
    @Common.Heading : 'Dynamic Method Control'
    @Common.QuickInfo : 'Dynamic Method Property'
    Deletable : Boolean not null;
    @Common.Label : 'Dyn. Method Control'
    @Common.Heading : 'Dynamic Method Control'
    @Common.QuickInfo : 'Dynamic Method Property'
    Updatable : Boolean not null;
  };

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
  @Common.Label : 'Quotation Comparison Header'
  @Common.Messages : SAP__Messages
  @Capabilities.NavigationRestrictions.RestrictedProperties : [
    {
      NavigationProperty: _CompareQuotationItem,
      InsertRestrictions: { Insertable: ![__CreateByAssociationControl/_CompareQuotationItem] }
    }
  ]
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.FilterRestrictions.NonFilterableProperties : [ '__CreateByAssociationControl', '__EntityControl' ]
  @Capabilities.SortRestrictions.NonSortableProperties : [ '__CreateByAssociationControl', '__EntityControl' ]
  @Capabilities.UpdateRestrictions.DeltaUpdateSupported : true
  @Capabilities.UpdateRestrictions.Updatable : ![__EntityControl/Updatable]
  @Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_CompareQuotationItem' ]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.DeepUpdateSupport.ContentIDSupported : true
  @Capabilities.DeleteRestrictions.Deletable : ![__EntityControl/Deletable]
  entity QuotationComparison {
    @Core.ComputedDefaultValue : true
    key QuotationComparison : String(10) not null;
    RequestForQuotation : String(10) not null;
    CompanyCode : String(4) not null;
    CompanyName : String(40) not null;
    CompativeStatementTitle : String(100) not null;
    NameOfRequester : String(40) not null;
    AccountAssignment : String(30) not null;
    RequisitionNumber : String(10) not null;
    RequisitionDate : Date;
    Purpose : String(250) not null;
    ComparisonDate : Date;
    @Common.IsUpperCase : true
    @Common.Label : 'Created By'
    @Common.QuickInfo : 'Created By User'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ABP_CREATION_USER'
    CreatedBy : String(12) not null;
    @odata.Precision : 7
    @odata.Type : 'Edm.DateTimeOffset'
    @Common.Label : 'Created On'
    @Common.QuickInfo : 'Creation Date Time'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ABP_CREATION_TSTMPL'
    CreatedAt : Timestamp;
    @Common.IsUpperCase : true
    @Common.Label : 'Changed By'
    @Common.QuickInfo : 'Last Changed By User'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ABP_LASTCHANGE_USER'
    LastChangedBy : String(12) not null;
    @odata.Precision : 7
    @odata.Type : 'Edm.DateTimeOffset'
    @Common.Label : 'Changed On'
    @Common.QuickInfo : 'Last Change Date Time'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=ABP_LASTCHANGE_TSTMPL'
    LastChangedAt : Timestamp;
    @Core.Computed : true
    @UI.HiddenFilter : true
    @UI.Hidden : true
    __CreateByAssociationControl : QuotationComparisonCbAControl;
    @Core.Computed : true
    @UI.HiddenFilter : true
    @UI.Hidden : true
    __EntityControl : EntityControl;
    SAP__Messages : many SAP__Message not null;
    @Common.Composition : true
    _CompareQuotationItem : Composition of many QuotationComparisonItem on _CompareQuotationItem._Header = $self;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Quotation Comparison Item'
  @Common.Messages : SAP__Messages
  @Capabilities.NavigationRestrictions.RestrictedProperties : [
    {
      NavigationProperty: _Header,
      InsertRestrictions: { Insertable: false },
      DeepUpdateSupport: { Supported: false }
    }
  ]
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.FilterRestrictions.NonFilterableProperties : [ '__EntityControl' ]
  @Capabilities.SortRestrictions.NonSortableProperties : [ '__EntityControl' ]
  @Capabilities.UpdateRestrictions.DeltaUpdateSupported : true
  @Capabilities.UpdateRestrictions.Updatable : ![__EntityControl/Updatable]
  @Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_Header' ]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.DeepUpdateSupport.ContentIDSupported : true
  @Capabilities.InsertRestrictions.Insertable : false
  @Capabilities.DeleteRestrictions.Deletable : ![__EntityControl/Deletable]
  entity QuotationComparisonItem {
    @Core.ComputedDefaultValue : true
    key QuotationComparison : String(10) not null;
    @Core.ComputedDefaultValue : true
    @Common.IsDigitSequence : true
    key SNo : String(5) not null;
    Description : String(200) not null;
    Material : String(40) not null;
    Supplierquotation : String(10) not null;
    Supplierquotationitem : String(5) not null;
    @Measures.Unit : Units
    Quantity : Decimal(13, 2) not null;
    @Common.IsUnit : true
    Units : String(3) not null;
    SupplierCode : String(10) not null;
    SupplierName : String(80) not null;
    @Measures.ISOCurrency : Currency
    UnitRate : Decimal(precision: 15) not null;
    @Measures.ISOCurrency : Currency
    TotalAmount : Decimal(precision: 15) not null;
    @Common.IsCurrency : true
    Currency : String(5) not null;
    MaterialMake : String(70) not null;
    Specifications : String(200) not null;
    ModelNumber : String(40) not null;
    ContactPerson : String(40) not null;
    PhoneNumber : String(20) not null;
    @Core.Computed : true
    @UI.HiddenFilter : true
    @UI.Hidden : true
    __EntityControl : EntityControl;
    SAP__Messages : many SAP__Message not null;
    _Header : Association to one QuotationComparison on _Header.QuotationComparison = QuotationComparison;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Supplier Quotation Header'
  @Capabilities.NavigationRestrictions.RestrictedProperties : [
    {
      NavigationProperty: _SupplierQuotationItem,
      InsertRestrictions: { Insertable: false }
    }
  ]
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.InsertRestrictions.Insertable : false
  @Capabilities.DeleteRestrictions.Deletable : false
  @Capabilities.UpdateRestrictions.Updatable : false
  @Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_SupplierQuotationItem' ]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  entity SupplierQuotation {
    @Common.IsUpperCase : true
    @Common.Label : 'Supplier Quotation'
    @Common.Heading : 'Quotation'
    @Common.QuickInfo : 'Supplier Quotation Number'
    key SupplierQuotation : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'RFQ'
    @Common.QuickInfo : 'Request for Quotation'
    RequestForQuotation : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Company Code'
    @Common.Heading : 'CoCd'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BUKRS'
    CompanyCode : String(4) not null;
    @Common.Label : 'Company Name'
    @Common.QuickInfo : 'Name of Company Code or Company'
    CompanyCodeName : String(25) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Supplier'
    @Common.QuickInfo : 'Account Number of Supplier'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=LIFNR'
    SupplierCode : String(10) not null;
    @Common.Label : 'Name of Supplier'
    @Common.Heading : 'Supplier'
    SupplierName : String(80) not null;
    @Common.Label : 'Quotation Date'
    @Common.Heading : 'Quot. Date'
    @Common.QuickInfo : 'Quotation Submission Date'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=IHRAN'
    QuotationDate : Date;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Currency'
    @Common.Heading : 'Crcy'
    @Common.QuickInfo : 'Currency Key'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERS'
    Currency : String(5) not null;
    @Common.Label : 'Exchange Rate'
    ExchangeRate : Decimal(9, 5) not null;
    @Common.Label : 'Binding Period'
    @Common.Heading : 'Bindg Per.'
    @Common.QuickInfo : 'Binding Period for Quotation'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EBNDT'
    ValidityDate : Date;
    ContactPerson : String(80) not null;
    SupplierRemarks : String(255) not null;
    @Common.Composition : true
    _SupplierQuotationItem : Composition of many SupplierQuotationItem on _SupplierQuotationItem._Header = $self;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Supplier Quotation Item'
  @Capabilities.NavigationRestrictions.RestrictedProperties : [
    {
      NavigationProperty: _Header,
      InsertRestrictions: { Insertable: false }
    }
  ]
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.InsertRestrictions.Insertable : false
  @Capabilities.DeleteRestrictions.Deletable : false
  @Capabilities.UpdateRestrictions.Updatable : false
  @Capabilities.UpdateRestrictions.NonUpdatableNavigationProperties : [ '_Header' ]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
    { Property: ScheduleLineOrderQuantity, AllowedExpressions: 'MultiValue' },
    { Property: NetAmount, AllowedExpressions: 'MultiValue' },
    { Property: NetOrderPrice, AllowedExpressions: 'MultiValue' }
  ]
  entity SupplierQuotationItem {
    @Common.IsUpperCase : true
    @Common.Label : 'Purchasing Document'
    @Common.Heading : 'Pur. Doc.'
    @Common.QuickInfo : 'Purchasing Document Number'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=EBELN'
    key SupplierQuotation : String(10) not null;
    @Common.IsDigitSequence : true
    @Common.Label : 'Supplier Quotation Item'
    @Common.QuickInfo : 'Item Number of Supplier Quotation'
    key ItemNumber : String(5) not null;
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
    @Measures.Unit : OrderQuantityUnit
    @Common.Label : 'Order Quantity'
    @Common.Heading : 'PO Quantity'
    @Common.QuickInfo : 'Purchase Order Quantity'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BSTMG'
    ScheduleLineOrderQuantity : Decimal(13, 3) not null;
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
    @Common.Label : 'Net Order Price'
    @Common.Heading : 'Net Price'
    @Common.QuickInfo : 'Net Price in Purchasing Document (in Document Currency)'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BPREI'
    NetOrderPrice : Decimal(precision: 11) not null;
    @Common.Label : 'Price Unit'
    @Common.Heading : 'Per'
    NetPriceQuantity : Decimal(precision: 5) not null;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Currency'
    @Common.Heading : 'Crcy'
    @Common.QuickInfo : 'Currency Key'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=WAERS'
    DocumentCurrency : String(5) not null;
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
    @Common.Label : 'Specifications'
    YY1_Specifications_PDI : String(200) not null;
    @Common.Label : 'Material Make'
    YY1_MaterialMake_PDI : String(70) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Acct Assignment Cat.'
    @Common.Heading : 'A'
    @Common.QuickInfo : 'Account Assignment Category'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KNTTP'
    AccountingAssignment : String(1) not null;
    _Header : Association to one SupplierQuotation on _Header.SupplierQuotation = SupplierQuotation;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Quotation Terms'
  @Common.Messages : SAP__Messages
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.FilterRestrictions.NonFilterableProperties : [ '__EntityControl' ]
  @Capabilities.SortRestrictions.NonSortableProperties : [ '__EntityControl' ]
  @Capabilities.UpdateRestrictions.DeltaUpdateSupported : true
  @Capabilities.UpdateRestrictions.Updatable : ![__EntityControl/Updatable]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.DeepUpdateSupport.ContentIDSupported : true
  @Capabilities.DeleteRestrictions.Deletable : ![__EntityControl/Deletable]
  entity TermsAndConditions {
    @Core.ComputedDefaultValue : true
    key QuotationComparison : String(10) not null;
    @Core.ComputedDefaultValue : true
    @Common.IsDigitSequence : true
    key QuotationComparisonItem : String(5) not null;
    @Core.ComputedDefaultValue : true
    @Common.IsDigitSequence : true
    key ItemNo : String(5) not null;
    KeyField : String(80) not null;
    KeyFieldDesc : String(120) not null;
    ValueField : String(255) not null;
    Field_Property : String(80) not null;
    @Core.Computed : true
    @UI.HiddenFilter : true
    @UI.Hidden : true
    __EntityControl : EntityControl;
    SAP__Messages : many SAP__Message not null;
  };
};

