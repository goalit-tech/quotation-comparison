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
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf nlabs.ui.quotationcomparison.ext.view.Main
             */
            onInit: function () {
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                const oLocalModel = new JSONModel({
                    QuotationCreate: {
                        RFQ: "s",
                        CompanyName: "",
                        ComparativeStatementTitle: "",
                        RequestorName: "",
                        AccountAssignment: "",
                        RequisitionNumber: "",
                        RequisitionDate: null,
                        Purpose: "",
                        ComparisonDate: null,
                    },
                    SupplierQuotationItems: [],
                    compareQuotationData: {}
                });
                // return oLocalModel;
                this.editFlow.getView().setModel(oLocalModel, "oLocalModel");
            },

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf nlabs.ui.quotationcomparison.ext.view.Main
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf nlabs.ui.quotationcomparison.ext.view.Main
             */
            onAfterRendering: async function (oContext) {
                try {
                    // debugger
                    // this.editFlow.getView().getModel("ui").setProperty('/isEditable', true);
                    return;
                } catch (error) {

                }
            },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf nlabs.ui.quotationcomparison.ext.view.Main
             */
            //  onExit: function() {
            //
            //  },
            onAddQuotationPress: async function (oEvent) {
                const context = oEvent.getSource().getBindingContext();
                const keyId = this.extractKey(context.getPath());
                console.log("RFQID", keyId);
                const sPath =
                    `/RFQs('${keyId}')/SupplierQuotation('${keyId}')/`;
                console.log("SPath", sPath);
                // var oButton = oEvent.getSource(),
                //     oView = this.getView();
                this.editFlow.getView().getModel("ui").setProperty('/customUIQuotationPath', sPath);
                await this.getSupplierQuotationItemData(keyId);
                this.oDialog ??= await this.loadFragment({
                    name: "nlabs.ui.quotationcomparison.ext.fragments.Quotation"
                });

                // const oBox = this.editFlow.getView().byId("_IDGenddQCTableSupplierItemsVBox");
                // const oSmartTable = this.editFlow.getView().byId("SupplierItemsTable");
                // const oTable = new Table({
                //     id: "BookingItems",
                //     metaPath: "_SupplierQuotationItem/@com.sap.vocabularies.UI.v1.LineItem"
                // });
                // oTable.setBindingContext(
                //     new sap.ui.model.Context(
                //         this.getView().getModel(),
                //         `/RFQs('${keyId}')/SupplierQuotation('${keyId}')`
                //     )
                // );
                // oBox.bindElement({
                //     path: `/RFQs('${keyId}')/SupplierQuotation('${keyId}')`
                // });
                // oSmartTable.setTableBindingPath(
                //     `/_SupplierQuotationItem`
                // );
                // oBox.addItem(oTable);

                // const oBindingContext = this.editFlow.getView().getModel().createBindingContext(
                //     `/RFQs('${keyId}')/SupplierQuotation('${keyId}')`
                // );
                // const oBindingContext = this.editFlow.getView().getModel().bindContext(`/RFQs('${keyId}')/SupplierQuotation('${keyId}')`);

                // oBox.setBindingContext(oBindingContext.getBoundContext());
                // // const oModel = this.getView().getModel();

                // const oBindingContext = oModel.bindContext(sPath);

                // await oBindingContext.requestObject();

                // oTable.setBindingContext(oBindingContext.getBoundContext());
                // debugger
                this.oDialog.setBindingContext(context);
                this.getExtensionAPI().addDependent(this.oDialog);
                //this.editFlow.getView().getModel("ui").setProperty('/isEditable', true);
                this.oDialog.open();
            },
            getSupplierQuotationItemData: async function (keyId) {
                debugger
                const oModel = this.editFlow.getView().getModel();

                // Navigation path
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
                            RFQ: keyId,
                            CompanyName: "",
                            ComparativeStatementTitle: "",
                            RequestorName: "",
                            AccountAssignment: "",
                            RequisitionNumber: "",
                            RequisitionDate: null,
                            Purpose: "",
                            ComparisonDate: null,
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
                //this.editFlow.getView().getModel("ui").setProperty('/isEditable', false);
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
            onCompareQuotationCancelPress: function () {
                // Logic for canceling the dialog
                console.log("Cancel button pressed");
                this.oCompareDialog.close();
            },
            extractKey: function (sPath) {
                const match = sPath.match(/\('(.+)'\)/);
                return match ? match[1] : null;
            },
            onCompareQuotationPress: async function (oEvent) {
                const contexts = oEvent.getParameter('contexts');
                const selectedContextObject = contexts.map(context => context.getObject());
                const transformRows = this.transformDataforComparison(selectedContextObject[0].items);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationData", selectedContextObject[0]);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemData", transformRows);
                // let oTable = 
                this.oCompareDialog ??= await this.loadFragment({
                    name: "nlabs.ui.quotationcomparison.ext.fragments.CompareQuotation"
                });

                this.generateCOlumnsForComparison(selectedContextObject[0].items);
                // const oBox = this.editFlow.getView().byId("_IDGenCompareQuotationVBox");
                // oBox.addItem(oTable);

                // this.oCompareDialog.setBindingContext(context);
                this.getExtensionAPI().addDependent(this.oCompareDialog);
                //this.editFlow.getView().getModel("ui").setProperty('/isEditable', true);
                this.oCompareDialog.open();

                // Implement comparison logic here, e.g., navigate to a comparison view
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
                const oTable = this.editFlow.getView().byId("_IDGenCompareQuotationUITable");
                // aSelectedData.forEach(col => {
                //     oTable.addColumn(
                //         new sap.ui.table.Column({
                //             label: new sap.m.Label({ text: col.label }),
                //             template: new sap.m.Text({ text: `{${col.path}}` })
                //         })
                //     );
                // });
                // return oTable;
                // const oTable = this.byId("comparisonTable");

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

                            template: new sap.m.Text({
                                text: "{oLocalModel>item" + index + "}"
                            }),

                            width: "200px"
                        })
                    );

                });
            }
            // onBeforeRebindTable: function (oEvent) {
            //     debugger
            //     const collectionBindingInfo = oEvent.getParameter("collectionBindingInfo");
            //     // collectionBindingInfo.path =
            //     //     "/RFQs('3150000001')/SupplierQuotation('3160000001')";

            //     // collectionBindingInfo.parameters = {
            //     //     $$groupId: "$auto"
            //     // };
            //     collectionBindingInfo.attachEvent(
            //         "dataReceived",
            //         (data) => {
            //             debugger
            //             console.log("Data received:", data);
            //         },
            //         this
            //     );
            // }

        });
    }
);