using QuotationService as service from '../../srv/quotationService';

annotate service.RFQs with @(UI.HeaderInfo: {
    TypeName      : '{i18n>RequestForQuotation}',
    TypeNamePlural: '{i18n>RequestForQuotation}',
    Title         : {
        $Type: 'UI.DataField',
        Value: RequestForQuotation
    },
    Description   : {
        $Type: 'UI.DataField',
        Value: CompanyCode
    },
}, );

annotate service.RFQs with @(UI: {
    SelectionFields: [
        RequestForQuotation,
        CompanyCode,
        PurchasingOrganization,
        Material
    ],
    LineItem       : [
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>RequestForQuotation}',
            Value                : RequestForQuotation,
            ![@HTML5.CssDefaults]: {width: 'auto'},
            ![UI.Importance]     : 'High'
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>RequestForQuotationDate}',
            Value                : CreationDate,
            ![@HTML5.CssDefaults]: {width: 'auto'},
            ![UI.Importance]     : 'High'
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>RequestForQuotationDescription}',
            Value                : RequestForQuotationName,
            ![@HTML5.CssDefaults]: {width: 'auto'},
            ![UI.Importance]     : 'High'
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>PurchasingOrganization}',
            Value                : PurchasingOrganization,
            ![@HTML5.CssDefaults]: {width: 'auto'},
            ![UI.Importance]     : 'High'
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>PurchasingGroup}',
            Value                : PurchasingGroup,
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>CompanyCode}',
            Value                : CompanyCode,
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>Supplier}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>Currency}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : 'RFQ Type',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>ValidityStartDate}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>ValidityEndDate}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>QuotationDeadline}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>Incoterms}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>RequestorName}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>Purpose}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>RequisitionNumber}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>RequisitionDate}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>AccountAssignment}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        },
        {
            $Type                : 'UI.DataField',
            Label                : '{i18n>ComparisonDate}',
            Value                : '',
            ![@HTML5.CssDefaults]: {width: 'auto'}
        }
    ],
});

annotate service.RFQs with @(UI.Facets: [
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneralInformation',
    },
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'RFQITemsSections',
        Label : 'RFQ Item',
        Target: 'to_RequestForQuotationItem/@UI.LineItem#RFQItems',
    },
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'SupplierQuotationSections',
        Label : 'Supplier Quotation',
        Target: 'SupplierQuotation/@UI.LineItem',
    },
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'QuotationComparisonsSections',
        Label : 'Quotation Comparison',
        Target: 'QuotationComparison/@UI.LineItem',
    },
], );

annotate service.RFQs with @(UI.FieldGroup #GeneralInformation: {Data: [
    {
        $Type: 'UI.DataField',
        Value: RequestForQuotation,
        Label: 'RFQ Number'
    },
    {
        $Type: 'UI.DataField',
        Label: 'RFQ Date',
        Value: CreationDate,
    },
    {
        $Type: 'UI.DataField',
        Label: 'RFQ Type',
        Value: ''
    },
    {
        $Type: 'UI.DataField',
        Label: 'Purchasing Organization',
        Value: PurchasingOrganization
    },
    {
        $Type: 'UI.DataField',
        Label: 'Purchasing Group',
        Value: PurchasingGroup
    },
    {
        $Type: 'UI.DataField',
        Label: 'Company Code',
        Value: CompanyCode,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Supplier',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Currency',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Validity Start Date',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Validity End Date',
        Value: LatestRegistrationDate,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Quotation Deadline',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Incoterms',
        Value: IncotermsLocation1,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Requestor Name',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Purpose',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Requisition Number',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Requisition Date',
        Value: QuotationLatestSubmissionDate,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Account Assignment',
        Value: '',
    },
    {
        $Type: 'UI.DataField',
        Label: 'Company Code',
        Value: CompanyCode,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Comparison Date',
        Value: BindingPeriodValidityEndDate,
    }
], }, );


annotate service.A_RequestForQuotationItem with @(UI: {
    HeaderInfo: {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'RFQ Item',
        TypeNamePlural: 'RFQ Items',
    },
    LineItem  : [
        {
            $Type: 'UI.DataField',
            Label: 'Item Number',
            Value: RequestForQuotationItem,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Material Code',
            Value: Material,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Quantity',
            Value: ScheduleLineOrderQuantity,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Units',
            Value: BaseUnit,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Delivery Date',
            Value: ScheduleLineDeliveryDate,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Plant',
            Value: Plant,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Storage Location',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Material Group',
            Value: MaterialGroup,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Account Assignment Category',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Cost Center',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'G/L Account',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Tracking Number',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Make',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Specifications',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Technical Remarks',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Warranty',
            Value: '',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Delivery Location',
            Value: '',
        },
    ],
});


// Supplier Quotation annotations

annotate service.SupplierQuotation with @(UI: {
    LineItem                            : [
        {
            $Type: 'UI.DataField',
            Label: 'Supplier Quotation',
            Value: SupplierQuotation,
        },
        
        {
            $Type: 'UI.DataField',
            Label: 'Supplier Name',
            Value: SupplierName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Supplier Code',
            Value: SupplierCode,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Quotation Date',
            Value: QuotationDate,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Quotation Deadline',
            Value: 'ValidityDate',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Currency',
            Value: 'Currency',
        },
        {
            $Type: 'UI.DataField',
            Label: 'Effective Exchange Rate',
            Value: ExchangeRate,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Supplier Remarks',
            Value: SupplierRemarks
        },
        {
            $Type: 'UI.DataField',
            Label: 'Contact phone',
            Value: ContactPerson
        }
    ],
    HeaderInfo                          : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Supplier Quotation',
        TypeNamePlural: 'Supplier Quotations',
        Title         : {
            $Type: 'UI.DataField',
            Value: SupplierQuotation,
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: SupplierName,
        },
    },
    Facets                              : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'SupplierQuotationGeneralInfo',
            Label : 'General Information',
            Target: '@UI.FieldGroup#SupplierQuotationDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'SupplierQuotationItem',
            Label : 'Supplier Quotation Item',
            Target: '_SupplierQuotationItem/@UI.LineItem',
        },
    ],
    FieldGroup #SupplierQuotationDetails: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Supplier Quotation Number',
                Value: SupplierQuotation,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Supplier Name',
                Value: SupplierName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Supplier Code',
                Value: SupplierCode,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Quotation Date',
                Value: QuotationDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Quotation Deadline',
                Value: 'ValidityDate',
            },
            {
                $Type: 'UI.DataField',
                Label: 'Currency',
                Value: 'Currency',
            },
            {
                $Type: 'UI.DataField',
                Label: 'Effective Exchange Rate',
                Value: ExchangeRate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Supplier Remarks',
                Value: SupplierRemarks
            },
            {
                $Type: 'UI.DataField',
                Label: 'Contact phone',
                Value: ContactPerson
            }
        ],
    },
});

annotate service.SupplierQuotationItem with @(UI: {LineItem: [
    {
        $Type: 'UI.DataField',
        Label: 'Item No',
        Value: ItemNumber,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Material',
        Value: Material,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Material Description',
        Value: PurchasingDocumentItemText,
    },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'Quantity',
    //     Value: ScheduleLineOrderQuantity,
    // },
    {
        $Type: 'UI.DataField',
        Label: 'Base unit of Measure',
        Value: BaseUnit,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Unit Price',
        Value: NetPriceQuantity,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Total Amount',
        Value: NetAmount,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Currency',
        Value: DocumentCurrency,
    },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'Delivery Date',
    //     Value: 'ScheduleLineDeliveryDate',
    // },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'Tax Percentage',
    //     Value: '',
    // },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'Discount',
    //     Value: '',
    // },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'Freight Charges',
    //     Value: '',
    // },
    // {
    //     $Type: 'UI.DataField',
    //     Label: 'Insurance Charges',
    //     Value: '',
    // },
    {
        $Type: 'UI.DataField',
        Label: 'Make',
        Value: YY1_MaterialMake_PDI,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Specifications',
        Value: YY1_Specifications_PDI,
    },
// {
//     $Type: 'UI.DataField',
//     Label: 'Warranty',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'Technical Compliance',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'Conversion @ Rs',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'BCD @ 10%',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'SWC 15% on BCD',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'HSN Code',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'GST',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'Bank Charges',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'Local Transportation Charges',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'Landing Cost',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'Density',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'PO Test',
//     Value: '',
// },
// {
//     $Type: 'UI.DataField',
//     Label: 'Phone Number',
//     Value: '',
// },
], });

annotate service.QuotationComparison with @(UI: {
    HeaderInfo                            : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Quotation Comparison',
        TypeNamePlural: 'Quotation Comparisons',
        Title         : {
            $Type: 'UI.DataField',
            Value: rfq,
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: companyName,
        },
    },
    LineItem                              : [
        {
            $Type: 'UI.DataField',
            Value: QuotationComparison,
            Label: 'Quotation Comparison',
        },
        {
            $Type: 'UI.DataField',
            Value: CompativeStatementTitle,
            Label: 'Title',
        },
        {
            $Type: 'UI.DataField',
            Value: RequisitionNumber,
            Label: 'Requisition Number',
        },
        {
            $Type: 'UI.DataField',
            Value: NameOfRequester,
            Label: 'Requestor',
        },
        {
            $Type: 'UI.DataField',
            Value: Purpose,
            Label: 'Purpose',
        },
        {
            $Type: 'UI.DataField',
            Value: ComparisonDate,
            Label: 'Comparison Date',
        },
        {
            $Type: 'UI.DataField',
            Value: CompanyName,
            Label: 'Company Name',
        },
        {
            $Type: 'UI.DataField',
            Value: CompanyCode,
            Label: 'Company Code',
        },

        {
            $Type: 'UI.DataField',
            Value: AccountAssignment,
            Label: 'Account Assignment',
        },
        {
            $Type: 'UI.DataField',
            Value: RequisitionNumber,
            Label: 'Requisition Number',
        },
        {
            $Type: 'UI.DataField',
            Value: RequisitionDate,
            Label: 'Requisition Date',
        },
    // {
    //     $Type  : 'UI.DataFieldForAction',
    //     Action : 'QuotationService.CREATEQuotationComparison',
    //     Label  : 'Create Comparison',
    //     Enabled: true,
    // },
    ],
    Facets                                : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'QuotationComparisonGeneralInfo',
            Label : 'General Information',
            Target: '@UI.FieldGroup#QuotationComparisonDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'QuotationComparisonItems',
            Label : 'Items',
            Target: 'items/@UI.LineItem',
        },
    ],
    FieldGroup #QuotationComparisonDetails: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'RFQ',
                Value: rfq,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Company Name',
                Value: companyName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Comparative Statement Title',
                Value: comparativeStatementTitle,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Requestor Name',
                Value: requestorName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Account Assignment',
                Value: accountAssignment,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Requisition Number',
                Value: requisitionNumber,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Requisition Date',
                Value: requisitionDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Purpose',
                Value: purpose,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Comparison Date',
                Value: comparisonDate,
            },
        ],
    },
});

annotate service.QuotationComparisonItems with @(UI: {LineItem: [
    {
        $Type: 'UI.DataField',
        Value: serialNumber,
        Label: 'Serial Number',
    },
    {
        $Type: 'UI.DataField',
        Value: description,
        Label: 'Description',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Quantity',
    },
    {
        $Type: 'UI.DataField',
        Value: units,
        Label: 'Units',
    },
    {
        $Type: 'UI.DataField',
        Value: supplier,
        Label: 'Supplier',
    },
    {
        $Type: 'UI.DataField',
        Value: unitRate,
        Label: 'Unit Rate',
    },
    {
        $Type: 'UI.DataField',
        Value: totalAmount,
        Label: 'Total Amount',
    },
    {
        $Type: 'UI.DataField',
        Value: currency,
        Label: 'Currency',
    },
], });

annotate service.QuotationComparison with @(
    Capabilities: {
        DeleteRestrictions: {Deletable: false,
        },
        UpdateRestrictions: {Updatable: false,
        },
        InsertRestrictions: {Insertable: false,
        },
    // UpdateRestrictions.Updatable : false,
    // @Capabilities.InsertRestrictions.Insertable: false,
    // Deletable : false,
    // Updatable : false,
    },
    DeleteHidden: true,
);
