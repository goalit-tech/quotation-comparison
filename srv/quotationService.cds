using {S4_API_RFQ_PROCESS as API_RFQ_PROCESS_SRV} from './external/API_RFQ_PROCESS_SRV';
// using {S4_API_SUPPLIER_QUOTATION as API_SUPPLIER_QUOTATION_SRV} from './external/API_SUPPLIER_QUOTATION_SRV';

using {S4_API_QUOTATION_COMPARISON as API_QUOTATION_COMPARISON_SRV} from './external/API_QUOTATION_COMPARISON_SRV';
// using {nlab.rfq.db as db} from '../db/datamodel';


service QuotationService {
    @readonly
    entity RFQs                      as
        projection on API_RFQ_PROCESS_SRV.A_RequestForQuotation {
            *,
            to_RequestForQuotationItem : Association to many A_RequestForQuotationItem
                                             on to_RequestForQuotationItem.RequestForQuotation = RequestForQuotation,
            // to_RequestForQuotationBidder,

            // NEW ASSOCIATION
            SupplierQuotation          : Association to many SupplierQuotation
                                             on SupplierQuotation.RequestForQuotation = RequestForQuotation,
            QuotationComparison        : Association to many QuotationComparison
                                             on QuotationComparison.RequestForQuotation = RequestForQuotation,


        };

    @readonly
    entity A_RequestForQuotation     as projection on API_RFQ_PROCESS_SRV.A_RequestForQuotation;

    @readonly
    entity A_RequestForQuotationItem as projection on API_RFQ_PROCESS_SRV.A_RequestForQuotationItem;

    // @readonly
    // entity A_RequestForQuotationBidder as projection on API_RFQ_PROCESS_SRV.A_RequestForQuotationBidder;

    @readonly
    entity SupplierQuotation         as projection on API_QUOTATION_COMPARISON_SRV.SupplierQuotation;

    @readonly
    entity SupplierQuotationItem     as projection on API_QUOTATION_COMPARISON_SRV.SupplierQuotationItem;


    entity QuotationComparison       as projection on API_QUOTATION_COMPARISON_SRV.QuotationComparison;

    entity QuotationComparisonItem   as projection on API_QUOTATION_COMPARISON_SRV.QuotationComparisonItem;

    action upsertCompareQuotation(quotationComparison: QuotationComparison, quotationComparisonItem: QuotationComparisonItem, type: String) returns String;
    action workflowForCompareQuotation(quotationComparison: QuotationComparison, workflowType: String)                                      returns String;
}
