sap.ui.define(
    [
        'sap/fe/core/PageController'
    ],
    function (PageController) {
        'use strict';

        return PageController.extend('nlabs.ai.cq.comparequotation.ext.view.CompareQuotationDetail', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf nlabs.ai.cq.comparequotation.ext.view.CompareQuotationDetail
             */
            onInit: function () {
                debugger;
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                const oView = this.editFlow.getView();
                const oRouter = this.editFlow.getAppComponent().getRouter();
                oRouter.getRoute("QuotationComparisonObjectPage").attachPatternMatched(this.onObjectMatched, this);
            },

            onObjectMatched: async function (oEvent) {
                const oArgs = oEvent.getParameter("arguments");
                const sCompareQuotationId = oArgs.key;
                const oQuery = oArgs["?query"];
                // console.log(sCompareQuotationId);      // 3150000001
                // console.log(oQuery.Mode); // CREATE
                // console.log(oQuery.RequestForQuotation); // 1000
                // const oLocalModel = this.editFlow.getAppComponent().getModel("LocalModel");
                if (oQuery && oQuery?.Mode === "CREATE") {
                    // if (oQuery?.Mode === "CREATE") {
                    const aSupplierQuotation = await this.getSupplierQuotationForRFQ(oQuery?.RequestForQuotation);
                    const aSupplierQuotationData = Array.isArray(aSupplierQuotation)
                        ? aSupplierQuotation
                        : (aSupplierQuotation?.value || []);

                    const aSupplierQuotationItems = aSupplierQuotationData.flatMap(quotation =>
                        (quotation._SupplierQuotationItem || []).map(item => ({
                            ...item,
                            SupplierCode: quotation.SupplierCode,
                            SupplierName: quotation.SupplierName
                        }))
                    );
                    this.editFlow.getView().getModel("LocalModel").setProperty("/SupplierQuotation", aSupplierQuotationData);
                    this.editFlow.getView().getModel("LocalModel").setProperty("/SupplierQuotationItem", aSupplierQuotationItems);

                }else{
                    
                }

            },
            getSupplierQuotationForRFQ: async function (keyId) {
                const oModel = this.editFlow.getView().getModel();
                const sPath = `/A_RequestForQuotation('${keyId}')/SupplierQuotation`;
                try {
                    const oListBinding = oModel.bindList(
                        sPath,
                        undefined,
                        undefined,
                        undefined,
                        {
                            $expand: "_SupplierQuotationItem"
                        }
                    );
                    const aContexts = await oListBinding.requestContexts(0, 100);
                    const aSupplierQuotation = aContexts.map((oContext) => oContext.getObject());

                    console.log("Supplier Quotations", aSupplierQuotation);
                    return aSupplierQuotation;

                } catch (oError) {
                    console.error("Error loading supplier items", oError);
                    return [];
                }
            },

        });
    }
);
