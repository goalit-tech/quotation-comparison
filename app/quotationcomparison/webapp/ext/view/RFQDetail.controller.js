sap.ui.define(
    [
        'sap/fe/core/PageController',
        "sap/ui/core/Fragment",
        "sap/fe/macros/Table",
        "sap/ui/table/Table",
        "sap/ui/model/json/JSONModel"
    ],
    function (PageController, Fragment, Table, UITable, JSONModel) {
        'use strict';

        return PageController.extend('nlabs.ui.quotationcomparison.ext.view.RFQDetail', {
            onInit: function () {
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                const oLocalModel = new JSONModel({
                    CompareQuotation: {
                        RequestForQuotation: '',
                        CompanyCode: '',
                        CompanyName: '',
                        CompativeStatementTitle: '',
                        NameOfRequester: '',
                        AccountAssignment: '',
                        RequisitionNumber: '',
                        RequisitionDate: null,
                        Purpose: '',
                        ComparisonDate: null,
                    },
                    SupplierQuotationItems: [],
                    compareQuotationData: {
                        RequestForQuotation: '',
                        RequisitionNumber: '',
                        CompanyCode: '',
                        CompanyName: '',
                        CompativeStatementTitle: '',
                        NameOfRequester: '',
                        AccountAssignment: '',
                        RequisitionNumber: '',
                        RequisitionDate: null,
                        Purpose: '',
                        ComparisonDate: null,
                    },
                    compareQuotationIsEditable: false,
                    compareQuotationItemData: [],
                    compareQuotationItemSelected: false,
                    cqUITableSelectionMode: 'Single'
                });
                // return oLocalModel;
                this.editFlow.getView().setModel(oLocalModel, "oLocalModel");
            },
            // onAfterRendering: async function (oContext) {
            //     return;
            // },

            onAddQuotationPress: async function (oEvent) {
                const context = oEvent.getSource().getBindingContext();
                const keyId = this.extractKey(context.getPath());
                console.log("RFQID", keyId);
                // const sPath =
                //     `/RFQs('${keyId}')/SupplierQuotation('${keyId}')/`;
                // console.log("SPath", sPath);
                // this.editFlow.getView().getModel("ui").setProperty('/customUIQuotationPath', sPath);
                const aSupplierQuotationData = await this.getSupplierQuotationForRFQ(keyId, true);
                await this.updateContextForCompareQuotation(aSupplierQuotationData, keyId, true);

                this.oDialog ??= await this.loadFragment({
                    name: "nlabs.ui.quotationcomparison.ext.fragments.Quotation"
                });

                // this.oDialog.setBindingContext(context);
                this.getExtensionAPI().addDependent(this.oDialog);
                this.oDialog.open();
            },
            updateContextForCompareQuotation: function (aSupplierQuotation, keyId, isCreateMode) {
                const aSupplierQuotationData = Array.isArray(aSupplierQuotation)
                    ? aSupplierQuotation
                    : (aSupplierQuotation?.value || []);

                const oLocalModelData = {
                    CompareQuotation: {
                        RequestForQuotation: keyId || '',
                        CompanyCode: aSupplierQuotationData[0]?.CompanyCode || '',
                        CompanyName: aSupplierQuotationData[0]?.CompanyName || '',
                        CompativeStatementTitle: aSupplierQuotationData[0]?.CompativeStatementTitle || '',
                        NameOfRequester: aSupplierQuotationData[0]?.NameOfRequester || '',
                        AccountAssignment: aSupplierQuotationData[0]?.AccountAssignment || '',
                        RequisitionNumber: aSupplierQuotationData[0]?.RequisitionNumber || '',
                        Purpose: aSupplierQuotationData[0]?.Purpose || '',
                        RequisitionDate: aSupplierQuotationData[0]?.RequisitionDate || null,
                        ComparisonDate: aSupplierQuotationData[0]?.ComparisonDate || null,
                    },
                    SupplierQuotation: aSupplierQuotationData
                };
                if (!isCreateMode) {
                    oLocalModelData.CompareQuotation = {}
                }
                this.editFlow.getView().getModel("oLocalModel").setProperty("/CompareQuotation", oLocalModelData.CompareQuotation);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/SupplierQuotation", oLocalModelData.SupplierQuotation);
            },
            getSupplierQuotationForRFQ: async function (keyId) {
                const oModel = this.editFlow.getView().getModel();
                const sPath = `/RFQs('${keyId}')/SupplierQuotation`;
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
            onCompareQuotationTableRowSelectionChange: function (oEvent) {
                const oTable = this.editFlow.getView().byId("_IDGenCompareQuotationSupplierUITable");

                var oRowIndex = oEvent.getParameter("rowIndex");
                var oRowContext = oEvent.getParameter("rowContext");
                var sPath = oRowContext.getPath(); // This will give you the path of the selected row
                if (sPath.includes("/_SupplierQuotationItem/")) {
                    // const oTable = this.editFlow.getView().byId("_IDGenCompareQuotationSupplierUITable");
                    const aSelectedIndices = oTable.getSelectedIndices();
                    const aRows = oTable.getRows();

                    const aSelectedItems = aSelectedIndices.map((iIndex) => {
                        const oRow = aRows[iIndex];
                        if (oRow) {
                            const oContext = oRow.getBindingContext("oLocalModel");
                            return oContext ? oContext.getObject() : null;
                        }
                        return null;
                    }).filter(obj => obj !== null);

                    console.log("Selected Quotation Items:", aSelectedItems);
                    this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemSelected", aSelectedItems);
                } else {
                    // Remove the current selected row
                    oTable.removeSelectionInterval(oRowIndex, oRowIndex);
                }
            },
            onAddCompareQuotationCreatePress: function (oEvent) {
                //const aSelectedQuotations = this.getSelectedSupplierQuotations();
                // const aSelectedItems = this.getSelectedSupplierQuotationItems();
                // this.editFlow.getView().getModel("oLocalModel").getProperty("/CompareQuotationItems");

                // console.log("Selected Quotations:", aSelectedQuotations);
                // console.log("Selected Items:", aSelectedItems);

                this.oDialog.close();
                debugger;
                this.callActionForQuotationComparison('upsertCompareQuotation', { type: "Create" })
            },
            callActionForQuotationComparison: async function (sActionName, mUrlParameters) {

                const oModel = this.editFlow.getView().getModel();
                const oCompareQuotation = this.editFlow.getView().getModel("oLocalModel").getProperty("/CompareQuotation");
                const aCompareQuotationItems = this.editFlow.getView().getModel("oLocalModel").getProperty("/compareQuotationItemSelected") || [];
                // oCompareQuotation
                const oPayload = {
                    quotationComparison: oCompareQuotation
                };

                try {
                    const oModel = this.getView().getModel();

                    // Create action binding
                    const oAction = oModel.bindContext("/upsertCompareQuotation(...)");

                    // Set parameters
                    // Set action parameters
                    oAction.setParameter("quotationComparison", oCompareQuotation);
                    oAction.setParameter("type", "CREATE");

                    // try {
                    await oAction.execute();

                    const oResult = oAction.getBoundContext().getObject();
                    console.log(oResult);

                    sap.m.MessageToast.show("Action executed successfully");
                    // } catch (error) {
                    //     console.error(error);
                    //     sap.m.MessageBox.error("Action failed");
                    // }
                    // const oResult = await new Promise((resolve, reject) => {
                    //     oModel.callFunction(`/${sActionName}`, {
                    //         method: "POST",
                    //         urlParameters: mUrlParameters,
                    //         groupId: "$auto",
                    //         changeSetId: "$auto",
                    //         refreshAfterChange: true,
                    //         headers: {
                    //             "Content-Type": "application/json"
                    //         },
                    //         success: (oResponse) => {
                    //             console.log("Action result", oResponse);
                    //             resolve(oResponse);
                    //         },
                    //         error: (oError) => {
                    //             console.error("Error calling action", sActionName, oError);
                    //             reject(oError);
                    //         }
                    //     });
                    // });
                    // return oResult;
                } catch (oError) {
                    console.error("Error calling action", sActionName, oError);
                    throw oError;
                }
            },
            getSelectedSupplierQuotations: function () {
                const oTable = this.editFlow.getView().byId("_IDGenCompareQuotationSupplierUITable");
                const aSelectedIndices = oTable.getSelectedIndices();
                const aRows = oTable.getRows();

                const aSelectedObjects = aSelectedIndices.map((iIndex) => {
                    const oRow = aRows[iIndex];
                    if (oRow) {
                        const oContext = oRow.getBindingContext("oLocalModel");
                        return oContext ? oContext.getObject() : null;
                    }
                    return null;
                }).filter(obj => obj !== null);

                console.log("Selected Supplier Quotations", aSelectedObjects);
                return aSelectedObjects;
            },
            getSelectedSupplierQuotationItems: function () {
                const aSelectedQuotations = this.getSelectedSupplierQuotations();

                const aAllItems = aSelectedQuotations.flatMap((oQuotation) => {
                    return oQuotation._SupplierQuotationItem || oQuotation.items || [];
                });

                console.log("Selected Items", aAllItems);
                return aAllItems;
            },

            onAddCompareQuotationCancelPress: function (oEvent) {
                this.oDialog.close();
            },

            extractKey: function (sPath) {
                const match = sPath.match(/\('(.+)'\)/);
                return match ? match[1] : null;
            },
            onCompareQuotationCancelPress: function () {
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationIsEditable", false);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/cqUITableSelectionMode", 'Single');
                console.log("Cancel button pressed");
            },
            onCompareQuotationEditPress: function () {
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationIsEditable", true);
                console.log("Edit button pressed");
            },
            onCompareQuotationDeletePress: function () {

            },
            formatCQUITableSelectionMode: function (mode) {
                console.log('data is received', mode);
                return mode === 'Single' ? 'ForceSingle' : 'None';
            },
            onAddQuotationPress1: function (oEvent) {
                // const oTable = this.editFlow.getView().byId("_IDGenTableQuotationComparisons");
                const context = oEvent.getSource().getBindingContext();
                const keyId = this.extractKey(context.getPath());
                console.log("RFQID", keyId);
                const oLocalModelData = {
                    CompareQuotation: {
                        rfq: keyId,
                        requisitionNumber: '',
                        companyName: '',
                        comparativeStatementTitle: '',
                        requestorName: '',
                        accountAssignment: '',
                        requisitionNumber: '',
                        requisitionDate: null,
                        purpose: '',
                        comparisonDate: null,
                    },
                    // SupplierQuotationItems: aSupplierItems
                    // SupplierQuotation: aSupplierQuotation
                };
                // if (!isCreateMode) {
                //     oLocalModelData.CompareQuotation = {}
                // }
                // return oLocalModel;
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationData", oLocalModelData.CompareQuotation);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemData", []);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationIsEditable", true);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/cqUITableSelectionMode", 'None');
            },
            onQuotationComparisonSelectionChange: async function (oEvent) {
                console.log("Selection changed");
                const contexts = oEvent.getParameter('selectedContext');
                const selectedContextObject = contexts.map(context => context.getObject());
                const transformRows = this.transformDataforComparison(selectedContextObject[0].items);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationData", selectedContextObject[0]);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemData", transformRows);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationIsEditable", false);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemSelected", true);
                this.generateCOlumnsForComparison(selectedContextObject[0].items);

            },
            transformDataforComparison: function (aSelectedData) {
                const aProperties = [
                    "serialNumber",
                    "description",
                    "quantity",
                    "units",
                    "supplier",
                    "unitRate",
                    "totalAmount",
                    "currency"
                ];

                const aRows = aProperties.map((sProperty) => {

                    const oRow = {
                        property: sProperty
                    };

                    aSelectedData.forEach((oItem, index) => {
                        oRow["item" + index] = oItem[sProperty];
                    });

                    return oRow;
                });
                return aRows;
            },
            generateCOlumnsForComparison: function (aSelectedData) {
                const oTable = this.editFlow.getView().byId("_IDGenCompareQuotationDetailUITable");
                oTable.removeAllColumns();

                //
                // Property column
                //
                oTable.addColumn(
                    new sap.ui.table.Column({
                        label: new sap.m.Label({
                            text: "Property"
                        }),
                        template: new sap.m.Text({
                            text: "{oLocalModel>property}"
                        }),
                        width: "200px"
                    })
                );

                //
                // Dynamic item columns
                //
                aSelectedData.forEach((oItem, index) => {

                    oTable.addColumn(
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Item " + (index + 1)
                            }),

                            template: new sap.m.Input({
                                value: "{oLocalModel>item" + index + "}",
                                editable: "{oLocalModel>/compareQuotationIsEditable}"
                            }),

                            width: "200px"
                        })
                    );

                });

            }
        });
    }
);