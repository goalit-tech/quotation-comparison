
const cds = require('@sap/cds');
const getComparisonData = require('./quotationData');

module.exports = async (srv) => {
    // Using CDS API   
    cds
    const S4_RFQ_PROCESS_API = await cds.connect.to("S4_API_RFQ_PROCESS");
    // const S4_SUPPLIER_QUOTATION_SRV = await cds.connect.to("S4_API_SUPPLIER_QUOTATION");
    const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
    // srv.on('READ', ['RFQs', 'A_RequestForQuotationItem', 'A_RequestForQuotation'], req => {

    //     const data = S4_RFQ_PROCESS_API.run(req.query);
    //     return data;
    // }
    // );
    srv.on('READ', 'RFQs', async (req) => {
        // Check if this is a navigation to SupplierQuotation (cross-service association)
        const { SELECT } = req.query;
        const from = SELECT?.from;
        let isEntitySetAvailable;
        const rfqKey = from.ref[0]?.where;
        const rfqId = rfqKey?.find(e => e.val)?.val;
        // Detect navigation: RFQs('...')/SupplierQuotation
        isEntitySetAvailable = entitySetAvailableInUrl(from, 'SupplierQuotation');
        if (isEntitySetAvailable) {

            // if (from?.ref?.length > 1 && from.ref[1] === 'SupplierQuotation') {
            // Extract the RFQ key from the navigation path
            // Build a fresh query against the external SupplierQuotation entity
            const { SupplierQuotation } = S4_SUPPLIER_QUOTATION_SRV.entities;
            const query = SELECT.from(SupplierQuotation)
                .where({ RequestForQuotation: rfqId });
            // Carry over $top, $skip, $count, $select from the original request
            if (SELECT.limit) query.SELECT.limit = SELECT.limit;
            if (SELECT.columns) query.SELECT.columns = SELECT.columns;
            if (SELECT.count) query.SELECT.count = SELECT.count;
            return S4_SUPPLIER_QUOTATION_SRV.run(query);
        }
        isEntitySetAvailable = entitySetAvailableInUrl(from, 'QuotationComparison');
        if (isEntitySetAvailable) {
            // const { QuotationComparison } = this.entities;
            // const query = SELECT.from(QuotationComparison)
            //     .where({ rfq: rfqId });
            // Carry over $top, $skip, $count, $select from the original request

            const { QuotationComparison } = S4_QUOTATION_COMPARISON_SRV.entities;
            const query = SELECT.from(QuotationComparison)
                .where({ RequestForQuotation: rfqId });
            if (SELECT.limit) query.SELECT.limit = SELECT.limit;
            if (SELECT.columns) query.SELECT.columns = SELECT.columns;
            if (SELECT.count) query.SELECT.count = SELECT.count;
            return S4_QUOTATION_COMPARISON_SRV.run(query);
        }
        // Default: forward to RFQ Process API
        return S4_RFQ_PROCESS_API.run(req.query);
    });

    srv.on('READ', '_RequestForQuotationItem', req => S4_RFQ_PROCESS_API.run(req.query));
    // srv.on('READ', 'A_RequestForQuotation', req => S4_RFQ_PROCESS_API.run(req.query));

    srv.on('READ', 'SupplierQuotation', async (req) => {
        // Get entity reference from the external service to avoid namespace mismatch
        const { SupplierQuotation } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(SupplierQuotation);
        // Preserve original query options
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;

        // Detect navigation from RFQs: RFQs('...')/SupplierQuotation
        const from = sel.from;
        if (entitySetAvailableInUrl(from, 'SupplierQuotation')) {
            // if (from?.ref?.length > 1 && from.ref[1] === 'SupplierQuotation') {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ RequestForQuotation: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }

        return S4_QUOTATION_COMPARISON_SRV.run(query);
    });

    srv.on('READ', 'SupplierQuotationItem', async (req) => {
        const { SupplierQuotationItem } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(SupplierQuotationItem);
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.where) query.SELECT.where = sel.where;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;
        const from = sel.from;
        // if (from?.ref?.length > 2 && from.ref[2] === '_SupplierQuotationItem') {
        if (entitySetAvailableInUrl(from, '_SupplierQuotationItem')) {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ RequestForQuotation: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }
        return S4_QUOTATION_COMPARISON_SRV.run(query);
    });

    srv.on('READ', 'QuotationComparisons', async (req) => {
        // Get entity reference from the external service to avoid namespace mismatch
        const { QuotationComparison } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(QuotationComparison);
        // Preserve original query options
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;

        // Detect navigation from RFQs: RFQs('...')/SupplierQuotation
        const from = sel.from;
        if (entitySetAvailableInUrl(from, 'SupplierQuotation')) {
            // if (from?.ref?.length > 1 && from.ref[1] === 'SupplierQuotation') {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ RequestForQuotation: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }

        return S4_SUPPLIER_QUOTATION_SRV.run(query);
    });

    srv.on('READ', 'SupplierQuotationItem', async (req) => {
        const { QuotationComparisonItem } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(QuotationComparisonItem);
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.where) query.SELECT.where = sel.where;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;
        const from = sel.from;
        // if (from?.ref?.length > 2 && from.ref[2] === '_SupplierQuotationItem') {
        if (entitySetAvailableInUrl(from, '_QuotationComparisonItem')) {
            const rfqKey = from.ref[0]?.where;
            const rfqId = rfqKey?.find(e => e.val)?.val;
            if (rfqId) {
                query.where({ RequestForQuotation: rfqId });
            }
        } else if (sel.where) {
            query.SELECT.where = sel.where;
        }
        return S4_QUOTATION_COMPARISON_SRV.run(query);
    });

}

function entitySetAvailableInUrl(from, sEntitySetName) {

    return Array.isArray(from?.ref) && from.ref.some(r => r === sEntitySetName);
}
