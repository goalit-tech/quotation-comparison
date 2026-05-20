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
                    QuotationCreate: {
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
                    compareQuotationItemData: []
                });
                // return oLocalModel;
                this.editFlow.getView().setModel(oLocalModel, "oLocalModel");
            },
            onIconTabBarSelect: function (oEvent) {
                // var oTable = this.editFlow.getView().byId("_IDGenQuotationComparisonActionGroup1");
                // if (oTable) {
                //     oTable.setSelectedIndex(0);
                // }
            },
            onAfterRendering: async function (oContext) {
                try {
                    // debugger
                    var oTable = this.editFlow.getView().byId("_IDGenQuotationComparisonActionGroup1");
                    if (oTable) {
                        oTable.setSelectedIndex(0);
                        oTable.attachEventOnce("rowsUpdated", function () {
                            var oBinding = oTable.getBinding("rows");
                            if (oBinding && oBinding.getLength() > 0) {
                                // Select the first row
                                oTable.setSelectedIndex(0);
                            }
                        });
                    }
                } catch (error) {

                }
                return;
            },

            onAddQuotationPress: async function (oEvent) {
                const context = oEvent.getSource().getBindingContext();
                const keyId = this.extractKey(context.getPath());
                console.log("RFQID", keyId);
                const sPath =
                    `/RFQs('${keyId}')/SupplierQuotation('${keyId}')/`;
                console.log("SPath", sPath);
                this.editFlow.getView().getModel("ui").setProperty('/customUIQuotationPath', sPath);
                await this.getSupplierQuotationItemData(keyId);
                this.oDialog ??= await this.loadFragment({
                    name: "nlabs.ui.quotationcomparison.ext.fragments.Quotation"
                });

                this.oDialog.setBindingContext(context);
                this.getExtensionAPI().addDependent(this.oDialog);
                this.oDialog.open();
            },
            getSupplierQuotationItemData: async function (keyId) {
                const oModel = this.editFlow.getView().getModel();
                const sPath =
                    `/RFQs('${keyId}')/SupplierQuotation('${keyId}')/_SupplierQuotationItem`;
                try {
                    // Bind list
                    const oListBinding = oModel.bindList(sPath);
                    // Request contexts
                    const aContexts = await oListBinding.requestContexts(0, 100);
                    // Convert contexts to plain objects
                    const aSupplierItems = aContexts.map((oContext) => {
                        return oContext.getObject();
                    });

                    console.log("Supplier Items", aSupplierItems);
                    const oLocalModelData = {
                        QuotationCreate: {
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
                        SupplierQuotationItems: aSupplierItems
                    };
                    // return oLocalModel;
                    this.editFlow.getView().getModel("oLocalModel").setProperty("/QuotationCreate", oLocalModelData.QuotationCreate);
                    this.editFlow.getView().getModel("oLocalModel").setProperty("/SupplierQuotationItems", oLocalModelData.SupplierQuotationItems);

                } catch (oError) {

                    console.error("Error loading supplier items", oError);

                }
            },
            onAddQuotationCancelPress: function (oEvent) {
                this.oDialog.close();
            },
            onCreateComparison: function (oEvent) {
                const oView = this.editFlow.getView();
                const oTable = oView.byId('_IDGenTableQuotationComparisons');

                if (!oTable) {
                    console.error("Table not found");
                    return;
                }

                // Get the inner MDC table
                const oMdcTable = oTable.getContent ? oTable.getContent() : oTable;

                // Get the binding context of the table's row binding
                const oRowBinding = oMdcTable.getRowBinding
                    ? oMdcTable.getRowBinding()
                    : oMdcTable.getBinding("rows") || oMdcTable.getBinding("items");

                if (!oRowBinding) {
                    console.error("Row binding not found");
                    return;
                }

                try {
                    // Create an empty transient context (empty row) in the table
                    const oNewContext = oRowBinding.create(
                        {}, // empty payload = empty row
                        true, // bAtEnd - insert at the end
                        false, // bInactive - false = active draft row
                        true  // bTransient - true = keeps row in table without saving
                    );

                    // Optional: scroll to the new row
                    oMdcTable.scrollToIndex && oMdcTable.scrollToIndex(oRowBinding.getLength() - 1);

                } catch (oError) {
                    console.error("Error creating empty row:", oError);
                }
            },
            /**
            onAddQuotationCreatePress: function (oEvent) {
                // Logic for creating a quotation
                const oTable = this.editFlow.getView().byId("_IDGenddQCTableSupplierItemsUITable");
                const aSelectedIndices = oTable.getSelectedIndices();

                console.log("Selected Row Count:", aSelectedIndices.length);

                // Get selected objects
                const aSelectedObjects = aSelectedIndices.map((iIndex) => {
                    const oContext = oTable.getContextByIndex(iIndex);
                    return oContext ? oContext.getObject() : null;
                }).filter(Boolean);

                console.log("Selected Objects:", aSelectedObjects);
                console.log("Create button pressed");
                this.oDialog.close();
            },

            onAddQuotationCancelPress: function () {
                // Logic for canceling the dialog
                console.log("Cancel button pressed");
                this.oDialog.close();
            },
             */
            onCompareQuotationCancelPress: function () {
                // Logic for canceling the dialog
                console.log("Cancel button pressed");
                this.oCompareDialog.close();
            },
            extractKey: function (sPath) {
                const match = sPath.match(/\('(.+)'\)/);
                return match ? match[1] : null;
            },
            onCompareQuotationEditPress: function () {
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationIsEditable", true);
                console.log("Edit button pressed");
            },
            onCompareQuotationDeletePress: function () {

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