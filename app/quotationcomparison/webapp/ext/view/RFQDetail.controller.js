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
                        rfq: '',
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
                    SupplierQuotationItems: [],
                    compareQuotationData: {
                        rfq: '',
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
                    compareQuotationIsEditable: false,
                    compareQuotationItemData: [],
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
                const sPath =
                    `/RFQs('${keyId}')/SupplierQuotation('${keyId}')/`;
                console.log("SPath", sPath);
                this.editFlow.getView().getModel("ui").setProperty('/customUIQuotationPath', sPath);
                await this.getSupplierQuotationForRFQ(keyId, true);
                this.oDialog ??= await this.loadFragment({
                    name: "nlabs.ui.quotationcomparison.ext.fragments.Quotation"
                });

                this.oDialog.setBindingContext(context);
                this.getExtensionAPI().addDependent(this.oDialog);
                this.oDialog.open();
            },
            getSupplierQuotationForRFQ: async function (keyId, isCreateMode) {
                const oModel = this.editFlow.getView().getModel();
                // const sPath =
                //     `/RFQs('${keyId}')/SupplierQuotation('${keyId}')/_SupplierQuotationItem`;
                const sPath =
                    `/RFQs('${keyId}')/SupplierQuotation`;
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
                    // Request contexts
                    const aContexts = await oListBinding.requestContexts(0, 100);
                    const aSupplierQuotation = aContexts.map((oContext) => {
                        return oContext.getObject();
                    });

                    console.log("Supplier Quotations", aSupplierQuotation);
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
                        SupplierQuotation: aSupplierQuotation
                    };
                    if (!isCreateMode) {
                        oLocalModelData.CompareQuotation = {}
                    }
                    // return oLocalModel;
                    this.editFlow.getView().getModel("oLocalModel").setProperty("/CompareQuotation", oLocalModelData.CompareQuotation);
                    this.editFlow.getView().getModel("oLocalModel").setProperty("/SupplierQuotation", oLocalModelData.SupplierQuotation);

                } catch (oError) {

                    console.error("Error loading supplier items", oError);

                }
            },
            onCompareQuotationTableRowSelectionChange: function (oEvent) {
                const oTable = this.editFlow.getView().byId("_IDGenCompareQuotationSupplierUITable");
                const iRowIndex = oEvent.getParameter("rowIndex");
                const oRowContext = oEvent.getParameter("rowContext");
                const bSelected = oEvent.getParameter("selected");
                const bUserInteraction = oEvent.getParameter("userInteraction");

                if (!bUserInteraction || !oRowContext || iRowIndex < 0) {
                    return;
                }

                const oObject = oRowContext.getObject();
                if (!oObject || !Array.isArray(oObject._SupplierQuotationItem) || oObject._SupplierQuotationItem.length === 0) {
                    return;
                }

                const sParentPath = oRowContext.getPath();
                const aChildPaths = oObject._SupplierQuotationItem.map((_, index) => `${sParentPath}/_SupplierQuotationItem/${index}`);
                const oRowsBinding = oTable.getBinding("rows");
                const aContexts = oRowsBinding.getContexts(0, 1000);

                aContexts.forEach((oContext, iIndex) => {
                    if (!oContext) {
                        return;
                    }
                    const sContextPath = oContext.getPath();
                    if (aChildPaths.includes(sContextPath)) {
                        if (bSelected) {
                            oTable.addSelectionInterval(iIndex, iIndex);
                        } else {
                            oTable.removeSelectionInterval(iIndex, iIndex);
                        }
                    }
                });
            },
            onAddCompareQuotationCreatePress: function (oEvent) {
                const aSelectedQuotations = this.getSelectedSupplierQuotations();
                const aSelectedItems = this.getSelectedSupplierQuotationItems();

                console.log("Selected Quotations:", aSelectedQuotations);
                console.log("Selected Items:", aSelectedItems);

                this.oDialog.close();
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