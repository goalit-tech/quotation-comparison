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
            onCompareQuotationUpdatePress: function (oEvent) {

            },
            onAddQuotationPress: async function (oEvent) {
                const context = oEvent.getSource().getBindingContext();
                const keyId = this.extractKey(context.getPath());
                const rfqContextObject = context.getObject();
                console.log("RFQID", keyId);

                const aSupplierQuotationData = await this.getSupplierQuotationForRFQ(keyId, true);
                await this.updateContextForCompareQuotation(aSupplierQuotationData, rfqContextObject, true);

                this.oDialog ??= await this.loadFragment({
                    name: "nlabs.ui.quotationcomparison.ext.fragments.Quotation"
                });

                // if (isUpdate) {

                // }

                // this.oDialog.setBindingContext(context);
                this.getExtensionAPI().addDependent(this.oDialog);
                this.oDialog.open();
            },
            updateContextForCompareQuotation: function (aSupplierQuotation, rfqContextObject, isCreateMode) {
                const aSupplierQuotationData = Array.isArray(aSupplierQuotation)
                    ? aSupplierQuotation
                    : (aSupplierQuotation?.value || []);

                const oLocalModelData = {
                    CompareQuotation: {
                        QuotationComparison: '',
                        RequestForQuotation: rfqContextObject?.RequestForQuotation || '',
                        CompanyCode: aSupplierQuotationData[0]?.CompanyCode || '',
                        CompanyName: aSupplierQuotationData[0]?.CompanyCodeName || '',
                        CompativeStatementTitle: aSupplierQuotationData[0]?.CompativeStatementTitle || '',
                        NameOfRequester: aSupplierQuotationData[0]?.NameOfRequester || '',
                        AccountAssignment: aSupplierQuotationData[0]?.AccountAssignment || '',
                        RequisitionNumber: aSupplierQuotationData[0]?.RequisitionNumber || '',
                        Purpose: aSupplierQuotationData[0]?.Purpose || '',
                        RequisitionDate: aSupplierQuotationData[0]?.RequisitionDate || null,
                        ComparisonDate: aSupplierQuotationData[0]?.ComparisonDate || null,
                    },
                    SupplierQuotation: aSupplierQuotationData,
                    SupplierQuotationItems: aSupplierQuotationData.flatMap(quotation =>
                        (quotation._SupplierQuotationItem || []).map(item => ({
                            ...item,
                            SupplierCode: quotation.SupplierCode,
                            SupplierName: quotation.SupplierName
                        }))
                    )
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

                aSelectedItems.forEach((item, index) => {
                    var newQuotationComparisonItem = {
                        QuotationComparison: item?.QuotationComparison || '',
                        SNo: ((index + 1) * 10).toString(),
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
                        Warranty: item?.Warranty || '',
                        TaxAmount: item?.TaxAmount || 0,
                        FreightCharges: item?.FreightCharges || 0,
                        Discount: item?.Discount || 0,
                        TechnicalCompliance: item?.TechnicalCompliance || '',
                        ConversionRs: item?.Conversion || 1,
                        BcdPercent: item?.BcdPerce || 0,
                        SwcPercentOnBcd: item?.SwcPercentOnBcd || 0,
                        HsnCode: item?.HsnCode || '',
                        Gst: item?.Gst || 0,
                        InsuranceCharges: item?.InsuranceCharges || 0,
                        BankCharges: item?.BankCharges || 0,
                        LocalTransportCharges: item?.LocalTransportCharges || 0,
                        LandingCost: item?.LandingCost || 0,
                        Density: item?.Density || 0,
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
            setSelectedSupplierQuotations: function (aItemToBeSelected) {
                const oTable = this.editFlow.getView().byId("_IDGenCompareQuotationSupplierUITable");
                const oModel = oTable.getModel();
                const sPath = oTable.getBindingInfo("rows").path;
                const aTableData = oModel.getProperty(sPath);

                const aSelectedIndices = [];

                aItemToBeSelected.forEach((oItem) => {
                    const iIndex = aTableData.findIndex((oRow) => {
                        // Match by a unique key — adjust "SupplierQuotationID" to your actual key field
                        return oRow.SupplierQuotationID === oItem.SupplierQuotationID;
                    });

                    if (iIndex !== -1) {
                        aSelectedIndices.push(iIndex);
                    }
                });

                oTable.setSelectedIndices(aSelectedIndices);
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
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemSelected", true);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationIsEditable", false);
                const selectedContextObject = contexts.map(context => context.getObject());
                debugger
                const aCompareQuotationItems = await this.getSelectedCompareQuotationItemDetails(selectedContextObject[0]);
                const transformRows = this.transformDataforComparison(aCompareQuotationItems);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/CompareQuotation", selectedContextObject[0]);
                this.editFlow.getView().getModel("oLocalModel").setProperty("/compareQuotationItemData", transformRows);
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
                    // "QuotationComparison",
                    //"SNo",
                    // "SupplierCode",
                    // "SupplierName",
                    "Description",
                    "MaterialMake",
                    "ModelNumber",
                    "Specifications",
                    "Warranty",
                    "Quantity",
                    "Units",
                    "UnitRate",
                    "TotalAmount",
                    "Currency",
                    "ConversionRs",
                    "AddDuties",
                    "BcdPercent",
                    "SwcPercentOnBcd",
                    "HsnCode",
                    "Gst",
                    "TaxAmount",
                    "FreightCharges",
                    "Discount",
                    "TechnicalCompliance",
                    "InsuranceCharges",
                    "BankCharges",
                    "LocalTransportCharges",
                    "LandingCost",
                    "TermsAndConditions",
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

                const headerRows = [
                    "AddDuties",
                    "TermsAndConditions"
                ];
                const nonEditableHeaderRows = [
                    "Description",
                    "MaterialMake",
                    "ModelNumber",
                    "Specifications",
                    "Warranty",
                    "Quantity",
                    "Units",
                    "UnitRate",
                    "TotalAmount",
                    "Currency",
                    "ConversionRs",
                ];

                // Property column
                oTable.addColumn(
                    new sap.ui.table.Column({
                        label: new sap.m.Title({ text: "Property" }),
                        template: new sap.m.HBox({
                            items: [
                                new sap.m.Title({
                                    text: "{oLocalModel>property}",
                                    visible: {
                                        path: "oLocalModel>property",
                                        formatter: function (sProperty) {
                                            return headerRows.includes(sProperty) ? true : false;
                                        }
                                    }
                                }),

                                new sap.m.Text({
                                    text: "{oLocalModel>property}",
                                    visible: {
                                        path: "oLocalModel>property",
                                        formatter: function (sProperty) {
                                            return headerRows.includes(sProperty) ? false : true;
                                        }
                                    }
                                })
                            ]
                        }),
                        width: "200px"
                    })
                );

                // Dynamic supplier columns
                aSelectedData.forEach((oItem) => {
                    const sSupplierName = oItem.SupplierName;

                    // HBox holds both controls; visibility toggled per row
                    const oTemplate = new sap.m.HBox({
                        items: [
                            // Show Input when property is NOT in headerRows and isEditable
                            new sap.m.Input({
                                value: "{oLocalModel>" + sSupplierName + "}",
                                // editable: "{oLocalModel>/compareQuotationIsEditable}",
                                editable: {
                                    parts: [
                                        { path: "oLocalModel>property" },
                                        { path: "oLocalModel>/compareQuotationIsEditable" }
                                    ],
                                    formatter: function (sProperty, bEditable) {
                                        return nonEditableHeaderRows.includes(sProperty) ? false : true;
                                    }
                                },
                                visible: {
                                    parts: [
                                        { path: "oLocalModel>property" },
                                        { path: "oLocalModel>/compareQuotationIsEditable" }
                                    ],
                                    formatter: function (sProperty, bEditable) {
                                        const headerRows = ["AddDuties", "TermsAndConditions"];
                                        return bEditable && !headerRows.includes(sProperty);
                                    }
                                }
                            }),
                            // Always show Text when property IS in headerRows OR not editable
                            new sap.m.Text({
                                text: "{oLocalModel>" + sSupplierName + "}",
                                visible: {
                                    parts: [
                                        { path: "oLocalModel>property" },
                                        { path: "oLocalModel>/compareQuotationIsEditable" }
                                    ],
                                    formatter: function (sProperty, bEditable) {
                                        const headerRows = ["AddDuties", "TermsAndConditions"];
                                        return !bEditable || headerRows.includes(sProperty);
                                    }
                                }
                            })
                        ]
                    });

                    oTable.addColumn(
                        new sap.ui.table.Column({
                            label: new sap.m.Title({ text: sSupplierName }),
                            template: oTemplate,
                            width: "200px"
                        })
                    );
                });
            },
            getGroup: function (oContext) {
                return oContext.getProperty('Description');
            },

            getGroupHeader: function (oGroup) {
                debugger;
                return new sap.m.GroupHeaderListItem({
                    title: oGroup.key
                });
            },
            reverseTransformDataForSave: function () {
                const oLocalModel = this.editFlow.getView().getModel("oLocalModel");
                const aRows = oLocalModel.getProperty("/compareQuotationItemData");
                const oCompareQuotation = oLocalModel.getProperty("/CompareQuotation");

                // Get supplier names dynamically from the first row's keys (excluding "property")
                const aSupplierNames = Object.keys(aRows[0]).filter(key => key !== "property");

                // Reconstruct one object per supplier
                const aRestoredItems = aSupplierNames.map(sSupplierName => {
                    const oItem = {
                        QuotationComparison: oCompareQuotation?.QuotationComparison,
                        SupplierName: sSupplierName
                    };

                    // Map each row back to its property on the supplier object
                    aRows.forEach(oRow => {
                        oItem[oRow.property] = oRow[sSupplierName];
                    });

                    return oItem;
                });

                return aRestoredItems;
            },

            onCompareQuotationSavePress: function () {
                this.onSaveCompareQuotation();
            },
            onSaveCompareQuotation: async function () {
                debugger
                const aItemsToSave = this.reverseTransformDataForSave();
                console.log("Items to save:", aItemsToSave);

                const oModel = this.editFlow.getView().getModel();
                const oLocalModel = this.editFlow.getView().getModel("oLocalModel");
                const oCompareQuotation = oLocalModel.getProperty("/CompareQuotation");
                debugger
                try {
                    for (const oItem of aItemsToSave) {
                        const sPath = `/QuotationComparison('${oCompareQuotation?.QuotationComparison}')/_CompareQuotationItem`;
                        const oListBinding = oModel.bindList(sPath);

                        // If your OData supports PATCH/UPDATE by key, adjust path accordingly
                        // e.g., /CompareQuotationItem(QuotationComparison='...',SupplierName='...')
                        const oContext = oListBinding.create(oItem); // or use update if record exists
                        await oContext.created();
                    }

                    sap.m.MessageToast.show("Saved successfully!");
                    oLocalModel.setProperty("/compareQuotationIsEditable", false);

                } catch (oError) {
                    console.error("Error saving comparison items:", oError);
                    sap.m.MessageToast.show("Save failed. Check console.");
                }
            },
        });
    }
);