const cds = require('@sap/cds');

const { UPSERT } = cds.ql;

class CapCompareQuotationService extends cds.ApplicationService {
    async init() {
        const S4_RFQ_PROCESS_API = await cds.connect.to("S4_API_RFQ_PROCESS");
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        this.on('READ', 'A_RequestForQuotation', req => S4_RFQ_PROCESS_API.run(req.query));
        this.on('READ', 'A_RequestForQuotationItem', req => S4_RFQ_PROCESS_API.run(req.query));
        // this.on('READ', 'SupplierQuotation', req => S4_QUOTATION_COMPARISON_SRV.run(req.query));
        this.on('READ', 'SupplierQuotation', req => this.readSupplierQuotations(req));
        this.on('READ', 'SupplierQuotationItem', req => this.readSupplierQuotationItem(req));
        this.on('READ', 'QuotationComparison', req => this.readQuotationComparison(req));
        this.on('READ', 'QuotationComparisonItem', req => this.readQuotationComparisonItem(req));
        // this.on('READ', 'SupplierQuotationItem', req => S4_QUOTATION_COMPARISON_SRV.run(req.query));
        this.on('READ', 'RFQs', req => this.readRFQsAndNavigationData(req));
        this.on('upsertCompareQuotation', async ({ data: { quotationComparison, quotationComparisonItem, type } }) => this.upsertCompareQuotation(quotationComparison, quotationComparisonItem, type));
        this.on('workflowForCompareQuotation', async (req) => this.workflowForCompareQuotation(req));
        return super.init()
    }
    async readRFQsAndNavigationData(req) {
        const S4_RFQ_PROCESS_API = await cds.connect.to("S4_API_RFQ_PROCESS");
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        const { SELECT } = req.query;
        const from = SELECT?.from;
        let isEntitySetAvailable;
        const rfqKey = from.ref[0]?.where;
        const rfqId = rfqKey?.find(e => e.val)?.val;
        return S4_RFQ_PROCESS_API.run(req.query);
    }
    async readSupplierQuotations(req) {
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        const { SupplierQuotation } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(SupplierQuotation);
        // Preserve original query options
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;
        const from = sel.from;
        if (this.entitySetAvailableInUrl(from, 'SupplierQuotation')) {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ RequestForQuotation: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }

        return S4_QUOTATION_COMPARISON_SRV.run(query);
    }
    async readSupplierQuotationItem(req) {
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        const { SupplierQuotationItem } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(SupplierQuotationItem);
        // Preserve original query options
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;
        const from = sel.from;
        if (this.entitySetAvailableInUrl(from, '_SupplierQuotationItem')) {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ RequestForQuotation: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }

        return S4_QUOTATION_COMPARISON_SRV.run(query);
    }
    async readQuotationComparison(req) {
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        const { QuotationComparison } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(QuotationComparison);
        // Preserve original query options
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;
        const from = sel.from;
        if (this.entitySetAvailableInUrl(from, 'QuotationComparison')) {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ RequestForQuotation: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }

        return S4_QUOTATION_COMPARISON_SRV.run(query);
    }
    async readQuotationComparisonItem(req) {
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        const { QuotationComparisonItem } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(QuotationComparisonItem);
        // Preserve original query options
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;
        const from = sel.from;
        if (this.entitySetAvailableInUrl(from, '_CompareQuotationItem')) {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ QuotationComparison: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }

        return S4_QUOTATION_COMPARISON_SRV.run(query);
    }

    entitySetAvailableInUrl(from, sEntitySetName) {
        return Array.isArray(from?.ref) && from.ref.some(r => r === sEntitySetName);
    }

    async upsertCompareQuotation(quotationComparison, quotationComparisonItem, type) {
        try {
            if (!quotationComparison) {
                return { message: "No payload provided" };
            }

            const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
            // const { QuotationComparison } = S4_QUOTATION_COMPARISON_SRV.entities;
            // const { INSERT } = cds;
            // const query = SELECT.from(QuotationComparison);
            // const { QuotationComparison } = S4_QUOTATION_COMPARISON_SRV.entities;
            // const query = SELECT.from(QuotationComparison).limit(1);
            // .orderBy({ CompareQuotation: 'desc' })

            // const lastRecord = await S4_QUOTATION_COMPARISON_SRV.run(query);

            // const readData = await S4_QUOTATION_COMPARISON_SRV.run(query);
            quotationComparison.QuotationComparison = Math.floor(Math.random() * 10000000).toString();
            const resultHeader = await S4_QUOTATION_COMPARISON_SRV.create('QuotationComparison', quotationComparison);
            quotationComparisonItem.forEach(eachQuotationItem => {
                eachQuotationItem.CompareQuotation = resultHeader?.CompareQuotation;
            });
            const resultItems = await S4_QUOTATION_COMPARISON_SRV.create('QuotationComparisonItem', quotationComparisonItem);

            return { message: `Quotation upserted successfully with ComparisonId: ${resultHeader?.CompareQuotation}` };
        } catch (err) {
            // req.log?.error?.(err);
            return { error: err.message || String(err) };
        }
    }
    workflowForCompareQuotation(req) {
        return { message: "Workflow executed successfully" };
    }

}
module.exports = CapCompareQuotationService;