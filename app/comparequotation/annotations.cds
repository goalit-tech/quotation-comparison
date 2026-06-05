using CompareQuotationService as service from '../../srv/compareQuotationSrv';

annotate service.QuotationComparison with @(UI: {
    HeaderInfo     : {
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
    SelectionFields: [
        RequestForQuotation,
        QuotationComparison
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: QuotationComparison,
            Label: 'Quotation Comparison',
        },
        {
            $Type: 'UI.DataField',
            Value: RequestForQuotation,
            Label: 'Request For Quotation',
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
    ],
});

annotate service.QuotationComparison with @(Capabilities: {
    DeleteRestrictions: {Deletable: false,
    },
    UpdateRestrictions: {Updatable: false,
    },
    InsertRestrictions: {Insertable: false,
    },
},
// DeleteHidden: true,
);

// Request For Quotation
annotate service.A_RequestForQuotation with @(UI: {
    SelectionFields: [
        RequestForQuotation,
        PurchasingOrganization
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: RequestForQuotation,
            Label: 'Request For Quotation',
        },
        {
            $Type: 'UI.DataField',
            Value: RFQPublishingDate,
            Label: 'RFQ Publishing Date',
        },
        {
            $Type: 'UI.DataField',
            Value: PurchasingOrganization,
            Label: 'Purchasing Organization',
        },
        {
            $Type: 'UI.DataField',
            Value: PurchasingGroup,
            Label: 'Purchasing Group',
        },
        {
            $Type: 'UI.DataField',
            Value: CompanyCode,
            Label: 'Company Code',
        },
    ],
});

// Supplier Quotation
annotate service.SupplierQuotation with @(UI: {LineItem: [
    {
        $Type: 'UI.DataField',
        Value: SupplierQuotation,
        Label: 'Supplier Quotation',
    },
    {
        $Type: 'UI.DataField',
        Value: SupplierCode,
        Label: 'Supplier Code',
    },
    {
        $Type: 'UI.DataField',
        Value: SupplierName,
        Label: 'Supplier Name',
    },
    {
        $Type: 'UI.DataField',
        Value: QuotationDate,
        Label: 'Quotation Date',
    },
    {
        $Type: 'UI.DataField',
        Value: _SupplierQuotationItem.ItemNumber,
        Label: 'Item Number',
    },
    {
        $Type: 'UI.DataField',
        Value: _SupplierQuotationItem.Material,
        Label: 'Material',
    },
    {
        $Type: 'UI.DataField',
        Value: _SupplierQuotationItem.PurchasingDocumentItemText,
        Label: 'Material Description',
    },
    {
        $Type: 'UI.DataField',
        Value: _SupplierQuotationItem.PurchaseRequisition,
        Label: 'Purchase Requisition',
    },
    {
        $Type: 'UI.DataField',
        Value: _SupplierQuotationItem.PurchaseRequisitionItem,
        Label: 'PR Item',
    },
], });
