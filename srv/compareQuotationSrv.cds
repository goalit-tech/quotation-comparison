using {S4_API_RFQ_PROCESS as API_RFQ_PROCESS_SRV} from './external/API_RFQ_PROCESS_SRV';
// using {S4_API_SUPPLIER_QUOTATION as API_SUPPLIER_QUOTATION_SRV} from './external/API_SUPPLIER_QUOTATION_SRV';

using {S4_API_QUOTATION_COMPARISON as API_QUOTATION_COMPARISON_SRV} from './external/API_QUOTATION_COMPARISON_SRV';

service CompareQuotationService {

    entity QuotationComparison       as projection on API_QUOTATION_COMPARISON_SRV.QuotationComparison;

    entity QuotationComparisonItem   as projection on API_QUOTATION_COMPARISON_SRV.QuotationComparisonItem;
    entity TermsAndConditions        as projection on API_QUOTATION_COMPARISON_SRV.TermsAndConditions;

    @readonly
    entity SupplierQuotation         as projection on API_QUOTATION_COMPARISON_SRV.SupplierQuotation;

    @readonly
    entity SupplierQuotationItem     as projection on API_QUOTATION_COMPARISON_SRV.SupplierQuotationItem;


    @readonly
    entity A_RequestForQuotation     as
        projection on API_RFQ_PROCESS_SRV.A_RequestForQuotation {
            *,
            to_RequestForQuotationItem : Association to many A_RequestForQuotationItem
                                             on to_RequestForQuotationItem.RequestForQuotation = RequestForQuotation,
            // to_RequestForQuotationBidder,

            // NEW ASSOCIATION
            SupplierQuotation          : Association to many SupplierQuotation
                                             on SupplierQuotation.RequestForQuotation = RequestForQuotation,
        }

    @readonly
    entity A_RequestForQuotationItem as projection on API_RFQ_PROCESS_SRV.A_RequestForQuotationItem;


}
