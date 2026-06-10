const cds = require('@sap/cds');

// const { UPSERT } = cds.ql;

class CapCompareQuotationService extends cds.ApplicationService {
    async init() {
        const S4_RFQ_PROCESS_API = await cds.connect.to("S4_API_RFQ_PROCESS");
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        this.on('READ', 'A_RequestForQuotation', req => S4_RFQ_PROCESS_API.run(req.query));
        this.on('READ', 'A_RequestForQuotationItem', req => S4_RFQ_PROCESS_API.run(req.query));
        this.on('READ', 'SupplierQuotation', req => this.readSupplierQuotation(req));
        this.on('READ', 'SupplierQuotationItem', req => this.readSupplierQuotationItem(req));

        this.on('READ', 'QuotationComparison', req => this.readQuotationComparison(req));
        this.on('READ', 'QuotationComparisonItem', req => this.readQuotationComparisonItem(req));
        this.on('READ', 'TermsAndConditions', req => this.readTermsAndConditions(req));

        // this.on('READ', 'RFQs', req => this.readRFQsAndNavigationData(req));
        this.on('upsertCompareQuotation', async ({ data: { quotationComparison, quotationComparisonItem, type } }) => this.upsertCompareQuotation(quotationComparison, quotationComparisonItem, type));
        this.on('workflowForCompareQuotation', async (req) => this.workflowForCompareQuotation(req));
        return super.init()
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
                query.where({ QuotationComparison: rfqId });
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
    async readTermsAndConditions(req) {
        const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
        const { TermsAndConditions } = S4_QUOTATION_COMPARISON_SRV.entities;
        const query = SELECT.from(TermsAndConditions);
        // Preserve original query options
        const sel = req.query.SELECT;
        if (sel.columns) query.SELECT.columns = sel.columns;
        if (sel.limit) query.SELECT.limit = sel.limit;
        if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
        if (sel.count) query.SELECT.count = sel.count;
        const from = sel.from;
        if (this.entitySetAvailableInUrl(from, '_TermsAndConditions')) {
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
    async readSupplierQuotation(req) {
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

    entitySetAvailableInUrl(from, sEntitySetName) {
        //return (!Array.isArray(from?.ref));// && from.ref.some(r => r === sEntitySetName);
        const refEntry = from?.ref?.[0];
        const entityFullId = typeof refEntry === 'string'
            ? refEntry                  // plain string case
            : refEntry?.id ?? '';       // object case
        const entityName = entityFullId.includes('.')
            ? entityFullId.split('.').pop()
            : entityFullId;
        if (entityName && entityName === sEntitySetName) {
            return true;
        }
        return Array.isArray(from?.ref) && from.ref.some(r => r === sEntitySetName);
    }
    async upsertCompareQuotation(quotationComparison, quotationComparisonItem, type) {
        try {
            const S4_QUOTATION_COMPARISON_SRV =
                await cds.connect.to("S4_API_QUOTATION_COMPARISON");

            if (!quotationComparison) {
                return {
                    message: "No payload provided",
                    status: "Error"
                };
            }

            // UPDATE
            if (type !== "CREATE" && quotationComparison.QuotationComparison) {

                const resultHeader = await S4_QUOTATION_COMPARISON_SRV.send({
                    method: "PATCH",
                    path: `/QuotationComparison('${quotationComparison.QuotationComparison}')`,
                    data: quotationComparison
                });

                for (const item of quotationComparisonItem) {

                    // Existing item
                    if (item.QuotationComparison && item.SNo) {

                        const { QuotationComparison, SNo, ...itemPayload } = item;

                        await S4_QUOTATION_COMPARISON_SRV.send({
                            method: "PATCH",
                            path: `/QuotationComparisonItem(QuotationComparison='${QuotationComparison}',SNo='${SNo}')`,
                            data: itemPayload
                        });

                    }
                    // New item
                    else {

                        delete item.SNo;
                        delete item.QuotationComparison;

                        await S4_QUOTATION_COMPARISON_SRV.send({
                            method: "POST",
                            path: `/QuotationComparison('${quotationComparison.QuotationComparison}')/_CompareQuotationItem`,
                            data: item
                        });
                    }
                }

                return {
                    message: `Quotation Updated successfully for Quotation Comparison: ${quotationComparison.QuotationComparison}`,
                    status: "Success"
                };
            }

            // CREATE
            delete quotationComparison.QuotationComparison;

            const resultHeader = await S4_QUOTATION_COMPARISON_SRV.send({
                method: "POST",
                path: "/QuotationComparison",
                data: quotationComparison
            });

            const sQuotationComparison =
                resultHeader?.QuotationComparison;

            if (!sQuotationComparison) {
                throw new Error(
                    "QuotationComparison key not returned after header creation"
                );
            }

            for (const item of quotationComparisonItem) {

                //delete item.SNo;
                delete item.QuotationComparison;

                await S4_QUOTATION_COMPARISON_SRV.send({
                    method: "POST",
                    path: `/QuotationComparison('${sQuotationComparison}')/_CompareQuotationItem`,
                    data: item
                });
            }

            return {
                message: `Quotation created successfully for Quotation Comparison: ${sQuotationComparison}`,
                status: "Success"
            };

        } catch (err) {

            console.error("upsertCompareQuotation Error:", err);

            return {
                message:
                    err.response?.data?.error?.message ||
                    err.message ||
                    String(err),
                status: "Error"
            };
        }
    }
    // async upsertCompareQuotation(quotationComparison, quotationComparisonItem, type) {
    //     var oMessage = {
    //         message: "",
    //         status: ""
    //     }
    //     try {
    //         if (!quotationComparison) {
    //             return oMessage = {
    //                 message: "No payload provided",
    //                 status: "Error"
    //             };
    //         }

    //         const S4_QUOTATION_COMPARISON_SRV = await cds.connect.to("S4_API_QUOTATION_COMPARISON");
    //         if (type !== "CREATE" && quotationComparison.QuotationComparison) {
    //             // const resultHeader = await S4_QUOTATION_COMPARISON_SRV
    //             //     .update('QuotationComparison')
    //             //     .where({
    //             //         QuotationComparison: quotationComparison.QuotationComparison
    //             //     })
    //             //     .with(quotationComparison);
    //             const resultHeader = await S4_QUOTATION_COMPARISON_SRV.send({
    //                 method: "PATCH",
    //                 path: `/QuotationComparison('${quotationComparison.QuotationComparison}')`,
    //                 data: quotationComparison
    //             });
    //             for (const item of quotationComparisonItem) {
    //                 if (item.QuotationComparison) {
    //                     await S4_QUOTATION_COMPARISON_SRV.send({
    //                         method: "PATCH",
    //                         path: `/QuotationComparisonItem(QuotationComparison='${item.QuotationComparison}',SNo='${item.SNo}')`,
    //                         data: {
    //                             Quantity: item.Quantity
    //                         }
    //                     });
    //                 } else {
    //                     await externalService.send({
    //                         method: "POST",
    //                         path: `/QuotationComparison('${quotationComparison.QuotationComparison}')/_CompareQuotationItem`,
    //                         data: item
    //                     });
    //                 }
    //             }
    //             // const aResults = [];
    //             // for (const item of quotationComparisonItem) {
    //             //     const { QuotationComparison, SNo, ...itemPayload } = item;

    //             //     const result = await S4_QUOTATION_COMPARISON_SRV
    //             //         .update('QuotationComparisonItem')
    //             //         .where({
    //             //             QuotationComparison,
    //             //             SNo
    //             //         })
    //             //         .with(itemPayload);

    //             //     aResults.push(result);
    //             // }
    //             // const aResults = await Promise.all(
    //             //     quotationComparisonItem.map(item => {
    //             //         const { QuotationComparison, SNo, ...itemPayload } = item;

    //             //         return S4_QUOTATION_COMPARISON_SRV
    //             //             .update('QuotationComparisonItem')
    //             //             .where({
    //             //                 QuotationComparison: QuotationComparison,
    //             //                 SNo: SNo
    //             //             })
    //             //             .with(itemPayload);
    //             //     })
    //             // );
    //             oMessage = {
    //                 message: `Quotation Updated successfully for Quotation Comparison: ${resultHeader?.QuotationComparison}`,
    //                 status: "Success"
    //             };
    //         } else {
    //             // if (quotationComparison && quotationComparison.QuotationComparison) {
    //             quotationComparison?.QuotationComparison ? delete quotationComparison.QuotationComparison : null;
    //             // }
    //             quotationComparisonItem.forEach((item) => {
    //                 delete item.QuotationComparison;
    //             });
    //             //quotationComparison["_CompareQuotationItem"] = quotationComparisonItem;
    //             console.log(JSON.stringify(quotationComparison, null, 2));
    //             //  const resultHeader = await S4_QUOTATION_COMPARISON_SRV.create('QuotationComparison', quotationComparison);
    //             const resultHeader = await S4_QUOTATION_COMPARISON_SRV.send({
    //                 method: "POST",
    //                 path: "/QuotationComparison",
    //                 data: quotationComparison
    //             });
    //             const quotationComparison = resultHeader?.QuotationComparison;

    //             for (const item of quotationComparisonItem) {

    //                 delete item.SNo;
    //                 delete item.QuotationComparison;

    //                 await externalService.send({
    //                     method: "POST",
    //                     path: `/QuotationComparison('${quotationComparison}')/_CompareQuotationItem`,
    //                     data: item
    //                 });
    //             }
    //             oMessage = {
    //                 message: `Quotation created successfully for Quotation Comparison: ${resultHeader?.QuotationComparison}`,
    //                 status: "Success"
    //             };
    //         }
    //         return oMessage;
    //     } catch (err) {
    //         return oMessage = {
    //             message: err.message || String(err),
    //             status: "Error"
    //         };
    //     }
    // }
    workflowForCompareQuotation(req) {
        return { message: "Workflow executed successfully" };
    }

}

module.exports = CapCompareQuotationService;