sap.ui.define(
    [
        'sap/fe/core/PageController',
        "nlabs/ai/cq/comparequotation/ext/utils/utils"
    ],
    function (PageController, Utils) {
        'use strict';

        return PageController.extend('nlabs.ai.cq.comparequotation.ext.view.ManageCompareQuotation', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf nlabs.ai.cq.comparequotation.ext.view.ManageCompareQuotation
             */
            onInit: function () {
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                const oView = this.editFlow.getView();
                // const oRouter = this.editFlow.getAppComponent().getRouter();
                this.getRouter().getRoute("QuotationComparisonObjectPage").attachPatternMatched(this.onObjectMatched, this);
            },
            getRouter: function () {
                return this.editFlow.getAppComponent().getRouter();
            },
            getView: function () {
                return this.editFlow.getView();
            },

            onObjectMatched: async function (oEvent) {
                const oArgs = oEvent.getParameter("arguments");
                let sCompareQuotationId = oArgs.key;
                sCompareQuotationId = sCompareQuotationId ? sCompareQuotationId.replace(/^'|'$/g, '') : '';
                const oQuery = oArgs["?query"];
                // console.log(sCompareQuotationId);      // 3150000001
                // console.log(oQuery.Mode); // CREATE
                // console.log(oQuery.RequestForQuotation); // 1000
                // const oLocalModel = this.editFlow.getAppComponent().getModel("LocalModel");
                if (oQuery && oQuery?.Mode === "CREATE") {
                    // if (oQuery?.Mode === "CREATE") {
                    const aSupplierQuotation = await Utils.getSupplierQuotationForRFQ(oQuery?.RequestForQuotation, this.getView());
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
                    const oSelectedRFQForComparison = await Utils.getRequestForQuotation(oQuery?.RequestForQuotation, this.getView());
                    const oCompareQuotationHeader = this.getView().getModel("LocalModel").getProperty("/CompareQuotationHeader");
                    oCompareQuotationHeader.QuotationComparison = '';
                    oCompareQuotationHeader.RequestForQuotation = oQuery?.RequestForQuotation || "";
                    oCompareQuotationHeader.RequisitionNumber = oSelectedRFQForComparison?.to_RequestForQuotationItem[0]?.PurchaseRequisition || "";
                    oCompareQuotationHeader.CompativeStatementTitle = 'New Quotation Comparison';
                    oCompareQuotationHeader.CompanyCode = oSelectedRFQForComparison?.CompanyCode || "";
                    this.getView().getModel("LocalModel").setProperty("/Mode", "CREATE");

                    this.getView().getModel("LocalModel").setProperty("/CompareQuotationHeader", oCompareQuotationHeader);
                    this.getView().getModel("LocalModel").setProperty("/SupplierQuotation", aSupplierQuotationData);
                    this.getView().getModel("LocalModel").setProperty("/SupplierQuotationItem", aSupplierQuotationItems);

                } else {
                    const oSelectedCompareQuotation = await Utils.getCompareQuotation(sCompareQuotationId, this.getView());
                    const { _CompareQuotationItem, ...oCompareQuotationHeader } = oSelectedCompareQuotation;
                    const aSupplierQuotation = await Utils.getSupplierQuotationForRFQ(oCompareQuotationHeader?.RequestForQuotation, this.getView());
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
                    this.getView().getModel("LocalModel").setProperty("/CompareQuotationHeader", oCompareQuotationHeader);
                    this.getView().getModel("LocalModel").setProperty("/SupplierQuotation", aSupplierQuotationData);
                    this.getView().getModel("LocalModel").setProperty("/SupplierQuotationItem", aSupplierQuotationItems);
                    this.getView().getModel("LocalModel").setProperty("/Mode", "DISPLAY");
                    this.setSelectedSupplierQuotations(_CompareQuotationItem);
                    // this.getView().getModel("LocalModel").setProperty("/CompareQuotationHeader", oSelectedCompareQuotation);

                }

            },
            onSaveMCQPress: async function () {
                this.getView().setBusy(true);
                try {
                    const aSelectedSupplierQuotationItems = this.getSelectedSupplierQuotations();
                    console.log("Selected Quotation Items:", aSelectedSupplierQuotationItems);
                    this.getView().getModel("LocalModel").setProperty("/supplierQuotationItemSelected", aSelectedSupplierQuotationItems);
                    const oCompareQuotation = this.prepareCompareQuotationData();
                    const aCompareQuotationItem = this.prepareCompareQuotationItemData();
                    oCompareQuotation.ComparisonDate = oCompareQuotation.ComparisonDate ? (oCompareQuotation.ComparisonDate instanceof Date
                        ? oCompareQuotation.ComparisonDate.toISOString().split("T")[0]
                        : oCompareQuotation.ComparisonDate)
                        : null;
                    oCompareQuotation.RequisitionDate = oCompareQuotation.RequisitionDate ? (oCompareQuotation.RequisitionDate instanceof Date
                        ? oCompareQuotation.RequisitionDate.toISOString().split("T")[0]
                        : oCompareQuotation.RequisitionDate)
                        : null;

                    const oResult = await this.callActionUpsertCompareQuotation(oCompareQuotation, aCompareQuotationItem, "CREATE");
                    if (oResult?.status === "Error") {
                        this.getView().setBusy(false);
                        sap.m.MessageToast.show(`Error on Create Quotation Comparison ${oResult?.message || oResult?.error}`);
                    } else {
                        sap.m.MessageToast.show("Quotation Created successfully");
                        this.getView().setBusy(false);
                    }
                }
                catch (error) {
                    console.error("Error occurred:", error);
                    this.getView().setBusy(false);
                    // this.oDialog.close();
                }
            },
            getSelectedSupplierQuotations: function () {
                const oTable = this.getView().byId("_IDGenQCManageFragmentTable");
                const aSelectedIndices = oTable.getSelectedIndices();
                const aRows = oTable.getRows();

                const aSelectedObjects = aSelectedIndices.map((iIndex) => {
                    const oRow = aRows[iIndex];
                    if (oRow) {
                        const oContext = oRow.getBindingContext("LocalModel");
                        return oContext ? oContext.getObject() : null;
                    }
                    return null;
                }).filter(obj => obj !== null);

                console.log("Selected Supplier Quotations", aSelectedObjects);
                return aSelectedObjects;
            },
            setSelectedSupplierQuotations: function (aItemToBeSelected) {
                if (!aItemToBeSelected || aItemToBeSelected.length === 0) {
                    return;
                }
                const oTable = this.getView().byId("_IDGenQCManageFragmentTable");
                const oModel = oTable.getModel();
                const sPath = oTable.getBindingInfo("rows").path;
                const aTableData = oModel.getProperty(sPath);

                const aSelectedIndices = [];

                aItemToBeSelected.forEach((oItem) => {
                    const iIndex = aTableData.findIndex((oRow) => {
                        // Match by a unique key — adjust "SupplierQuotationID" to your actual key field
                        return (oRow.SupplierQuotation === oItem.SupplierQuotation &&
                            oRow.SQItemNumber === oItem.ItemNumber);
                    });
                    if (iIndex !== -1) {
                        aSelectedIndices.push(iIndex);
                    }
                });

                oTable.setSelectedIndices(aSelectedIndices);
            },
            prepareCompareQuotationData: function () {
                const oCompareQuotation = this.getView().getModel("LocalModel").getProperty("/CompareQuotationHeader");
                const oCompareQuotationToSave = {
                    "QuotationComparison": oCompareQuotation?.QuotationComparison || '',
                    "RequestForQuotation": oCompareQuotation?.RequestForQuotation || '',
                    "CompanyCode": oCompareQuotation?.CompanyCode || '',
                    "CompanyName": oCompareQuotation?.CompanyName || '',
                    "CompativeStatementTitle": oCompareQuotation?.CompativeStatementTitle || '',
                    "NameOfRequester": oCompareQuotation?.NameOfRequester || '',
                    "AccountAssignment": oCompareQuotation?.AccountAssignment || '',
                    "RequisitionNumber": oCompareQuotation?.RequisitionNumber || '',
                    "RequisitionDate": oCompareQuotation?.RequisitionDate || null,
                    "Purpose": oCompareQuotation?.Purpose || '',
                    "ComparisonDate": oCompareQuotation?.ComparisonDate || null,
                };
                return oCompareQuotationToSave;
            },
            prepareCompareQuotationItemData: function () {
                const aSelectedItems = this.getView().getModel("LocalModel").getProperty("/supplierQuotationItemSelected") || [];
                const aCompareQuotationItem = [];

                aSelectedItems.forEach((item, index) => {
                    var newQuotationComparisonItem = {
                        QuotationComparison: item?.QuotationComparison || '',
                        SNo: ((index + 1) * 10).toString(),
                        Material: item?.Material || '',
                        SQItemNumber: item?.ItemNumber || '',
                        SupplierQuotation: item?.SupplierQuotation || '',
                        Description: item?.PurchasingDocumentItemText || '',
                        Quantity: item?.ScheduleLineOrderQuantity || 0,
                        Units: item?.BaseUnit || '',
                        SupplierCode: item?.SupplierCode || '',
                        SupplierName: item?.SupplierName || '',
                        UnitRate: item?.NetPriceAmount || 0,
                        TotalAmount: item?.NetAmount || 0,
                        Currency: item?.DocumentCurrency || '',
                        MaterialMake: item?.MaterialMake || '',
                        Specifications: item?.YY1_Specifications_PDI || '',
                        ModelNumber: item?.YY1_MaterialMake_PDI || '',
                        ContactPerson: item?.ContactPerson || '',
                        PhoneNumber: item?.PhoneNumber || ''
                    };


                    aCompareQuotationItem.push(newQuotationComparisonItem);
                });

                return aCompareQuotationItem;
            },
            callActionUpsertCompareQuotation: async function (oCompareQuotation, aCompareQuotationItem, sType) {
                try {
                    console.log("quotationComparisontoSave", oCompareQuotation);
                    console.log("quotationComparisonItemtoSave", aCompareQuotationItem);
                    const oModel = this.editFlow.getView().getModel();
                    const oAction = oModel.bindContext("/upsertCompareQuotation(...)");
                    oAction.setParameter("quotationComparison", oCompareQuotation);
                    oAction.setParameter("quotationComparisonItem", aCompareQuotationItem);
                    oAction.setParameter("type", sType);

                    await oAction.execute();

                    const oResult = oAction.getBoundContext().getObject();
                    return oResult;
                } catch (oError) {
                    console.error("Error calling action", oError);
                    // this.oDialog.close();
                    this.getView().setBusy(false);
                    throw oError;
                }
            },
            onCancelonMCQPress: function () {
                this.getRouter().navBack();
            },

        });
    }
);
