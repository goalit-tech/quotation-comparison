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
                const rfqContextObject = context.getObject();
                console.log("RFQID", keyId);
                // const sPath =
                //     `/RFQs('${keyId}')/SupplierQuotation('${keyId}')/`;
                // console.log("SPath", sPath);
                // this.editFlow.getView().getModel("ui").setProperty('/customUIQuotationPath', sPath);
                const aSupplierQuotationData = await this.getSupplierQuotationForRFQ(keyId, true);
                await this.updateContextForCompareQuotation(aSupplierQuotationData, rfqContextObject, true);

                this.oDialog ??= await this.loadFragment({
                    name: "nlabs.ui.quotationcomparison.ext.fragments.Quotation"
                });

                // this.oDialog.setBindingContext(context);
                this.getExtensionAPI().addDependent(this.oDialog);
                this.oDialog.open();
            },
            updateContextForCompareQuotation: function (aSupplierQuotation, rfqContextObject, isCreateMode) {
                const aSupplierQuotationData = Array.isArray(aSupplierQuotation)
                    ? aSupplierQuotation
                    : (aSupplierQuotation?.value || []);
                // aSupplierQuotationData.forEach(({ _SupplierQuotationItem, SupplierCode, SupplierName }) => {
                //     (_SupplierQuotationItem || []).forEach(item => {
                //         item.SupplierCode = SupplierCode ? SupplierCode : "";
                //         item.SupplierName = SupplierName ? SupplierName : "";
                //     });
                // });
                const oLocalModelData = {
                    CompareQuotation: {
                        QuotationComparison: '',
                        RequestForQuotation: rfqContextObject?.RequestForQuotation || '',
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
                    SupplierQuotation: aSupplierQuotationData,
                    SupplierQuotationItems: aSupplierQuotationData.flatMap(quotation => quotation._SupplierQuotationItem || [])
                };
                if (!isCreateMode) {
                    oLocalModelData.CompareQuotation = {}
                }
                this.editFlow.getView().getModel("oLocalModel").setProperty("/CompareQuotation", oLocalModelData.CompareQuotation);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/SupplierQuotation", oLocalModelData.SupplierQuotation);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/SupplierQuotationItem", oLocalModelData.SupplierQuotationItems);
            },
            prepareCompareQuotationItemData: function () {
                const aSelectedItems = this.editFlow.getView().getModel("oLocalModel").getProperty("/supplierQuotationItemSelected") || [];
                const aCompareQuotationItem = [];
                const fieldMapping = {
                    QuotationComparison: (item) => item?.QuotationComparison || '',
                    SNo: (item) => item?.SNo || '',
                    Description: (item) => item?.Description || '',
                    Quantity: (item) => item?.Quantity || '',
                    Units: (item) => item?.Units || '',
                    SupplierCode: (item) => item?.SupplierCode || '',
                    SupplierName: (item) => item?.SupplierName || '',
                    UnitRate: (item) => item?.UnitRate || '',
                    TotalAmount: (item) => item?.TotalAmount || '',
                    Currency: (item) => item?.Currency || '',
                    MaterialMake: (item) => item?.MaterialMake || '',
                    Specifications: (item) => item?.Specifications || '',
                    ModelNumber: (item) => item?.ModelNumber || '',
                    Warranty: (item) => item?.Warranty || '',
                    TaxAmount: (item) => item?.TaxAmount || '',
                    FreightCharges: (item) => item?.FreightCharges || '',
                    Discount: (item) => item?.Discount || '',
                    TechnicalCompliance: (item) => item?.TechnicalCompliance || '',
                    ConversionRs: (item) => item?.ConversionRs || '',
                    BcdPercent: (item) => item?.BcdPercent || '',
                    SwcPercentOnBcd: (item) => item?.SwcPercentOnBcd || '',
                    HsnCode: (item) => item?.HsnCode || '',
                    Gst: (item) => item?.Gst || '',
                    InsuranceCharges: (item) => item?.InsuranceCharges || '',
                    BankCharges: (item) => item?.BankCharges || '',
                    LocalTransportCharges: (item) => item?.LocalTransportCharges || '',
                    LandingCost: (item) => item?.LandingCost || '',
                    Density: (item) => item?.Density || '',
                    ContactPerson: (item) => item?.ContactPerson || '',
                    PhoneNumber: (item) => item?.PhoneNumber || '',

                };

                aSelectedItems.forEach((item, index) => {
                    var newQuotationComparisonItem = {
                        QuotationComparison: item?.QuotationComparison || '',
                        SNo: (index + 1) * 10,
                        Description: item?.PurchasingDocumentItemText || '',
                        Quantity: item?.OrderQuantity || '',
                        Units: item?.BaseUnit || '',
                        SupplierCode: item?.SupplierCode || '',
                        SupplierName: item?.SupplierName || '',
                        UnitRate: item?.NetPriceAmount || '',
                        TotalAmount: item?.NetAmount || '',
                        Currency: item?.DocumentCurrency || '',
                        MaterialMake: item?.MaterialMake || '',
                        Specifications: item?.YY1_Specifications_PDI || '',
                        ModelNumber: item?.YY1_MaterialMake_PDI || '',
                        Warranty: item?.Warranty || '',
                        TaxAmount: item?.TaxAmount || '',
                        FreightCharges: item?.FreightCharges || '',
                        Discount: item?.Discount || '',
                        TechnicalCompliance: item?.TechnicalCompliance || '',
                        ConversionRs: item?.Conversion || '',
                        BcdPercent: item?.BcdPerce || '',
                        SwcPercentOnBcd: item?.SwcPercentOnBcd || '',
                        HsnCode: item?.HsnCode || '',
                        Gst: item?.Gst || '',
                        InsuranceCharges: item?.InsuranceCharges || '',
                        BankCharges: item?.BankCharges || '',
                        LocalTransportCharges: item?.LocalTransportCharges || '',
                        LandingCost: item?.LandingCost || '',
                        Density: item?.Density || '',
                        ContactPerson: item?.ContactPerson || '',
                        PhoneNumber: item?.PhoneNumber || ''
                    };


                    aCompareQuotationItem.push(newQuotationComparisonItem);
                });

                return aCompareQuotationItem;
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

            onAddCompareQuotationCreatePress: async function (oEvent) {
                this.oDialog.setBusy(true);
                try {
                    debugger;
                    const aSelectedSupplierQuotationItems = this.getSelectedSupplierQuotations();
                    console.log("Selected Quotation Items:", aSelectedSupplierQuotationItems);
                    this.editFlow.getView().getModel("oLocalModel").setProperty("/supplierQuotationItemSelected", aSelectedSupplierQuotationItems);
                    this.callActionForQuotationComparison('upsertCompareQuotation', { type: "Create" })
                }
                catch (error) {
                    console.error("Error occurred:", error);
                    this.oDialog.setBusy(false);
                    // this.oDialog.close();
                }
            },
            callActionForQuotationComparison: async function (sActionName, mUrlParameters) {

                // const oModel = this.editFlow.getView().getModel();

                try {
                    const oCompareQuotation = this.editFlow.getView().getModel("oLocalModel").getProperty("/CompareQuotation");
                    const aCompareQuotationItem = this.prepareCompareQuotationItemData();
                    const oModel = this.getView().getModel();
                    oCompareQuotation.ComparisonDate = oCompareQuotation.ComparisonDate ? (oCompareQuotation.ComparisonDate instanceof Date
                        ? oCompareQuotation.ComparisonDate.toISOString().split("T")[0]
                        : oCompareQuotation.ComparisonDate)
                        : null;
                    oCompareQuotation.RequisitionDate = oCompareQuotation.RequisitionDate ? (oCompareQuotation.RequisitionDate instanceof Date
                        ? oCompareQuotation.RequisitionDate.toISOString().split("T")[0]
                        : oCompareQuotation.RequisitionDate)
                        : null;
                    // oCompareQuotation.ComparisonDate ? oCompareQuotation.ComparisonDate.toISOString().split("T")[0] : "";
                    // /oCompareQuotation.RequisitionDate = oCompareQuotation.RequisitionDate ? oCompareQuotation.RequisitionDate.toISOString().split("T")[0] : "";
                    // Create action binding
                    const oAction = oModel.bindContext("/upsertCompareQuotation(...)");

                    // Set parameters
                    // Set action parameters
                    oAction.setParameter("quotationComparison", oCompareQuotation);
                    oAction.setParameter("quotationComparisonItem", aCompareQuotationItem);
                    oAction.setParameter("type", "CREATE");

                    await oAction.execute();

                    const oResult = oAction.getBoundContext().getObject();
                    if (oResult?.error) {
                        this.oDialog.setBusy(false);
                        sap.m.MessageToast.show(`Error on Add Quotation ${oResult?.error}`);
                    } else {
                        sap.m.MessageToast.show("Action executed successfully");
                        this.oDialog.setBusy(false);
                        this.oDialog.close();
                    }

                } catch (oError) {
                    console.error("Error calling action", oError);
                    // this.oDialog.close();
                    this.oDialog.setBusy(false);
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
            // getSelectedSupplierQuotationItems: function () {
            //     const aSelectedQuotations = this.getSelectedSupplierQuotations();

            //     const aAllItems = aSelectedQuotations.flatMap((oQuotation) => {
            //         return oQuotation._SupplierQuotationItem || oQuotation.items || [];
            //     });

            //     console.log("Selected Items", aAllItems);
            //     return aAllItems;
            // },

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
            onCompareQuotationTableRowSelectionChange: async function (oEvent) {
                console.log("Selection changed");
                const contexts = oEvent.getParameter('selectedContext');
                const selectedContextObject = contexts.map(context => context.getObject());
                const aCompareQuotationItems = await this.getSelectedCompareQuotationItemDetails(selectedContextObject[0]);
                const transformRows = this.transformDataforComparison(aCompareQuotationItems);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationData", selectedContextObject[0]);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemData", transformRows);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationIsEditable", false);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemSelected", true);
                this.generateCOlumnsForComparison(aCompareQuotationItems);

            },
            getSelectedCompareQuotationItemDetails: async function (selectedItem) {
                //    getSupplierQuotationForRFQ: async function (keyId) {
                const oModel = this.editFlow.getView().getModel();
                const sPath = `/QuotationComparison('${selectedItem?.QuotationComparison}')/_CompareQuotationItem`;
                try {
                    const oListBinding = oModel.bindList(sPath);
                    const aContexts = await oListBinding.requestContexts(0, 100);

                    const aQuotationComparisonItem = aContexts.map((oContext) => oContext.getObject());

                    console.log("QuotationsComparison Data", aQuotationComparisonItem);
                    return aQuotationComparisonItem;

                } catch (oError) {
                    console.error("Error loading QuotationComparison items", oError);
                    return [];
                }
            },

            // },

            transformDataforComparison: function (aSelectedData) {
                const aProperties = [
                    "QuotationComparison",
                    "SNo",
                    "Description",
                    "Quantity",
                    "Units",
                    "SupplierCode",
                    "SupplierName",
                    "UnitRate",
                    "TotalAmount",
                    "Currency",
                    "MaterialMake",
                    "Specifications",
                    "ModelNumber",
                    "Warranty",
                    "TaxAmount",
                    "FreightCharges",
                    "Discount",
                    "TechnicalCompliance",
                    "ConversionRs",
                    "BcdPercent",
                    "SwcPercentOnBcd",
                    "HsnCode",
                    "Gst",
                    "InsuranceCharges",
                    "BankCharges",
                    "LocalTransportCharges",
                    "LandingCost",
                    "Density",
                    "ContactPerson",
                    "PhoneNumber",
                ];

                const aRows = aProperties.map((sProperty) => {
                    //create empty row object name
                    const oRow = {
                        property: sProperty
                    };
                    aSelectedData.forEach((oItem) => {
                        const sSupplierName = oItem.SupplierName;
                        oRow[sSupplierName] = oItem[sProperty];
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
                aSelectedData.forEach((oItem) => {

                    const sSupplierName = oItem.SupplierName;

                    oTable.addColumn(
                        new sap.ui.table.Column({

                            label: new sap.m.Label({
                                text: sSupplierName
                            }),

                            template: new sap.m.Input({
                                value: "{oLocalModel>" + sSupplierName + "}",
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