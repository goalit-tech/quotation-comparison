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
                // const sCompareQuotationId = oArgs.key;
                const oQuery = oArgs["?query"];
                // console.log(sCompareQuotationId);      // 3150000001
                // console.log(oQuery.Mode); // CREATE
                // console.log(oQuery.RequestForQuotation); // 1000
                // console.log(oQuery.QuotationComparison); // 00000000
                // const oLocalModel = this.editFlow.getAppComponent().getModel("LocalModel");


            }

        });
    }
);
