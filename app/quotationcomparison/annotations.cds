using QuotationService as service from '../../srv/quotationService';

annotate service.RFQs with @(UI.HeaderInfo: {
    TypeName      : 'RFQ',
    TypeNamePlural: 'RFQs',
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
    SelectionFields             : [
        RequestForQuotation,
        CompanyCode,
    ],
    LineItem                    : [
        {
            $Type: 'UI.DataField',
            Label: 'RequestForQuotation',
            Value: RequestForQuotation,
        },
        {
            $Type: 'UI.DataField',
            Label: 'CompanyCode',
            Value: CompanyCode,
        },
        {
            $Type: 'UI.DataField',
            Label: 'PurchasingDocumentCategory',
            Value: PurchasingDocumentCategory,
        },
        {
            $Type: 'UI.DataField',
            Label: 'PurchasingDocumentType',
            Value: PurchasingDocumentType,
        },
        {
            $Type: 'UI.DataField',
            Label: 'CreatedByUser',
            Value: CreatedByUser,
        },
    ],
    SelectionPresentationVariant: {
        $Type              : 'UI.SelectionPresentationVariantType',
        Text               : 'RFQs',
        SelectionVariant   : {
            $Type: 'UI.SelectionVariantType',
            Text : 'RFQs',

        },
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Text          : 'RFQs',
            Visualizations: ['@UI.LineItem']

        },
    },
});

annotate service.RFQs with @(UI.Facets: [
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
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

annotate service.A_RequestForQuotationItem with @(UI: {
    HeaderInfo: {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'RFQ Item',
        TypeNamePlural: 'RFQ Items',
    },
    LineItem  : [
        {
            $Type: 'UI.DataField',
            Value: RequestForQuotation,
        },
        {
            $Type: 'UI.DataField',
            Value: RequestForQuotationItem,
        },
        {
            $Type: 'UI.DataField',
            Value: Manufacturer,
        },

    ],
});


annotate service.RFQs with @(UI.FieldGroup #GeneratedGroup: {Data: [
    {
        $Type: 'UI.DataField',
        Label: 'RequestForQuotation',
        Value: RequestForQuotation,
    },
    {
        $Type: 'UI.DataField',
        Label: 'CompanyCode',
        Value: CompanyCode,
    },
    {
        $Type: 'UI.DataField',
        Label: 'PurchasingDocumentCategory',
        Value: PurchasingDocumentCategory,
    },
    {
        $Type: 'UI.DataField',
        Label: 'PurchasingDocumentType',
        Value: PurchasingDocumentType,
    },
    {
        $Type: 'UI.DataField',
        Label: 'CreatedByUser',
        Value: CreatedByUser,
    },
    {
        $Type: 'UI.DataField',
        Label: 'CreationDate',
        Value: CreationDate,
    },
    {
        $Type: 'UI.DataField',
        Label: 'LastChangeDateTime',
        Value: LastChangeDateTime,
    },
    {
        $Type: 'UI.DataField',
        Label: 'Language',
        Value: Language,
    },
    {
        $Type: 'UI.DataField',
        Label: 'PurchasingOrganization',
        Value: PurchasingOrganization,
    },
    {
        $Type: 'UI.DataField',
        Label: 'PurchasingGroup',
        Value: PurchasingGroup,
    },
    {
        $Type: 'UI.DataField',
        Label: 'DocumentCurrency',
        Value: DocumentCurrency,
    },
    {
        $Type: 'UI.DataField',
        Label: 'IncotermsClassification',
        Value: IncotermsClassification,
    },
    {
        $Type: 'UI.DataField',
        Label: 'TargetAmount',
        Value: TargetAmount,
    },
    {
        $Type: 'UI.DataField',
        Label: 'CorrespncInternalReference',
        Value: CorrespncInternalReference,
    },
    {
        $Type: 'UI.DataField',
        Label: 'RFQLifecycleStatus',
        Value: RFQLifecycleStatus,
    },

], }, );

// Supplier Quotation annotations

annotate service.SupplierQuotation with @(Capabilities: {Insertable: true,
});

annotate service.SupplierQuotation with @(UI: {
    LineItem                            : [
        {
            $Type: 'UI.DataField',
            Value: RequestForQuotation,
        },
        {
            $Type: 'UI.DataField',
            Value: SupplierQuotation,
        },
        {
            $Type: 'UI.DataField',
            Value: Supplier,
        },
        {
            $Type: 'UI.DataField',
            Value: PurchasingDocumentOrderDate,
        },

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
            Value: Supplier,
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
                Label: 'Supplier Quotation',
                Value: SupplierQuotation,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Request For Quotation',
                Value: RequestForQuotation,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Supplier',
                Value: Supplier,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Company Code',
                Value: CompanyCode,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Purchasing Document Type',
                Value: PurchasingDocumentType,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Purchasing Organization',
                Value: PurchasingOrganization,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Purchasing Group',
                Value: PurchasingGroup,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Document Currency',
                Value: DocumentCurrency,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Order Date',
                Value: PurchasingDocumentOrderDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Created By',
                Value: CreatedByUser,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Creation Date',
                Value: CreationDate,
            },
        ],
    },
});

annotate service.SupplierQuotationItem with @(UI: {LineItem: [
    {
        $Type: 'UI.DataField',
        Value: Material,
    },
    {
        $Type: 'UI.DataField',
        Value: EffectiveAmount,
    },
    {
        $Type: 'UI.DataField',
        Value: GrossAmount,
    },
], });

annotate service.QuotationComparisons with @(UI: {
    Capabilities: {
        Insertable: false,
        deletable: false,
    },
    DeleteHidden : true,
});

annotate service.QuotationComparisons with @(UI: {
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
            Value: rfq,
            Label: 'RFQ',
        },
        {
            $Type: 'UI.DataField',
            Value: companyName,
            Label: 'Company Name',
        },
        {
            $Type: 'UI.DataField',
            Value: comparativeStatementTitle,
            Label: 'Title',
        },
        {
            $Type: 'UI.DataField',
            Value: requestorName,
            Label: 'Requestor',
        },
        {
            $Type: 'UI.DataField',
            Value: comparisonDate,
            Label: 'Comparison Date',
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

// annotate service.RFQs with @(UI: {Capabilities.NavigationRestrictions: {RestrictedProperties: [{
//     NavigationProperty: QuotationComparisons,
//     InsertRestrictions: {Insertable: true}
// }]}})
