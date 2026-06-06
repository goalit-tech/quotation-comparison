sap.ui.define(
    [
        "sap/ui/model/json/JSONModel"
    ],
    function (JSONModel) {
        'use strict';

        return {
            getModel: function () {
                return new JSONModel();
            },

            transformDataforComparisonTable: function (aSelectedData) {
                const aProperties = [
                    //"QuotationComparison",
                    "SNo",
                    //"SupplierCode",
                    //"SupplierName",
                    "Description",
                    "MaterialMake",
                    "ModelNumber",
                    "Specifications",
                    "Warranty",
                    // "Quantity",
                    "Units",
                    "UnitRate",
                    "TotalAmount",
                    "Currency",
                    "ConversionRs",
                    "AddDuties",
                    "BcdPercent",
                    "SwcPercentOnBcd",
                    // "FreightCharges",
                    // "Discount",
                    // "TechnicalCompliance",
                    // "InsuranceCharges",
                    // "BankCharges",
                    // "LocalTransportCharges",
                    // "LandingCost",
                    "TermsAndConditions",
                    // "Density",
                    "HsnCode",
                    "Gst",
                    "TaxAmount",
                    "ContactPerson",
                    "PhoneNumber",
                ];

                const aRows = aProperties.map((sProperty) => {
                    //create empty row object name
                    const oRow = {
                        property: sProperty
                    };
                    aSelectedData.forEach((oItem) => {
                        const sSupplierName = oItem.SupplierName + "_" + oItem.SNo;
                        oRow[sSupplierName] = oItem[sProperty];
                    });

                    return oRow;
                });
                return aRows;
            },
            generateCOlumnsForComparisonTable: function (oView, aSelectedData) {
                const oTable = oView?.byId("_IDGenQCFormFragmentDynamicUITable");
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
                                    text: "{LocalModel>property}",
                                    visible: {
                                        path: "LocalModel>property",
                                        formatter: function (sProperty) {
                                            return headerRows.includes(sProperty) ? true : false;
                                        }
                                    }
                                }),

                                new sap.m.Text({
                                    text: "{LocalModel>property}",
                                    visible: {
                                        path: "LocalModel>property",
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
                    const sSupplierName = oItem.SupplierName + "_" + oItem.SNo;

                    // HBox holds both controls; visibility toggled per row
                    const oTemplate = new sap.m.HBox({
                        items: [
                            // Show Input when property is NOT in headerRows and isEditable
                            new sap.m.Input({
                                value: "{LocalModel>" + sSupplierName + "}",
                                // editable: "{LocalModel>/compareQuotationIsEditable}",
                                editable: {
                                    parts: [
                                        { path: "LocalModel>property" },
                                        { path: "LocalModel>/compareQuotationIsEditable" }
                                    ],
                                    formatter: function (sProperty, bEditable) {
                                        return nonEditableHeaderRows.includes(sProperty) ? false : true;
                                    }
                                },
                                visible: {
                                    parts: [
                                        { path: "LocalModel>property" },
                                        { path: "LocalModel>/compareQuotationIsEditable" }
                                    ],
                                    formatter: function (sProperty, bEditable) {
                                        const headerRows = ["AddDuties", "TermsAndConditions"];
                                        return bEditable && !headerRows.includes(sProperty);
                                    }
                                }
                            }),
                            // Always show Text when property IS in headerRows OR not editable
                            new sap.m.Text({
                                text: "{LocalModel>" + sSupplierName + "}",
                                visible: {
                                    parts: [
                                        { path: "LocalModel>property" },
                                        { path: "LocalModel>/compareQuotationIsEditable" }
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
            reverseTransformDataOfCompareQuotationForSave: function (oCompareQuotation, aRows) {
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
            transformTermsAndConditionsForTable: function (aTermsAndConditions, aComparisonItems) {
                const aFields = [
                    {
                        KeyField: "Warranty",
                        KeyFieldDesc: "Warranty",
                        ValueField: ""
                    },
                    {
                        KeyField: "TaxAmount",
                        KeyFieldDesc: "Tax Amount",
                        ValueField: ""
                    },
                    {
                        KeyField: "FreightCharges",
                        KeyFieldDesc: "Freight Charges",
                        ValueField: ""
                    },
                    {
                        KeyField: "Discount",
                        KeyFieldDesc: "Discount",
                        ValueField: ""
                    },
                    {
                        KeyField: "TechnicalCompliance",
                        KeyFieldDesc: "Technical Compliance",
                        ValueField: ""
                    },
                    {
                        KeyField: "ConversionRs",
                        KeyFieldDesc: "Conversion @ Rs",
                        ValueField: ""
                    },
                    {
                        KeyField: "BCDPercent",
                        KeyFieldDesc: "BCD %",
                        ValueField: ""
                    },
                    {
                        KeyField: "SWCPercentOnBCD",
                        KeyFieldDesc: "SWC % on BCD",
                        ValueField: ""
                    },
                    {
                        KeyField: "HSNCode",
                        KeyFieldDesc: "HSN Code",
                        ValueField: ""
                    },
                    {
                        KeyField: "GST",
                        KeyFieldDesc: "GST",
                        ValueField: ""
                    },
                    {
                        KeyField: "FreightCharges",
                        KeyFieldDesc: "Freight Charges",
                        ValueField: ""
                    },
                    {
                        KeyField: "InsuranceCharges",
                        KeyFieldDesc: "Insurance Charges",
                        ValueField: ""
                    },
                    {
                        KeyField: "BankCharges",
                        KeyFieldDesc: "Bank Charges",
                        ValueField: ""
                    },
                    {
                        KeyField: "LocalTransportationCharges",
                        KeyFieldDesc: "Local Transportation Charges",
                        ValueField: ""
                    },
                    {
                        KeyField: "LandingCost",
                        KeyFieldDesc: "Landing Cost",
                        ValueField: ""
                    },
                    {
                        KeyField: "Density",
                        KeyFieldDesc: "Density",
                        ValueField: ""
                    },
                    {
                        KeyField: "ContactPerson",
                        KeyFieldDesc: "Contact Person",
                        ValueField: ""
                    },
                    {
                        KeyField: "PhoneNumber",
                        KeyFieldDesc: "Phone Number",
                        ValueField: ""
                    },
                    {
                        KeyField: "BankCharges",
                        KeyFieldDesc: "Bank Charges",
                        ValueField: ""
                    }
                ];

                aComparisonItems.forEach((sQuotationComparisonItem) => {
                    aFields.forEach((sField) => {
                        aTermsAndConditions.push({
                            QuotationComparisonItem: sQuotationComparisonItem,
                            ItemNo: "00001",
                            KeyField: sField.KeyField,
                            ValueField: "" // populate actual value here
                        });
                    });
                });
            },
            getSupplierQuotationForRFQ: async function (keyId, oView) {
                const oModel = oView?.getModel();
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
                    console.error("Error loading supplier quotations & Items", oError);
                    return [];
                }
            },
            getRequestForQuotation: async function (keyId, oView) {
                const oModel = oView?.getModel();
                const oContextBinding = oModel.bindContext(
                    `/A_RequestForQuotation('${keyId.replace(/^'|'$/g, '')}')`,
                    undefined,
                    {
                        $expand: "to_RequestForQuotationItem"
                    }
                );

                try {
                    const oRequestForQuotation = await oContextBinding.requestObject();

                    console.log("Request for Quotation", oRequestForQuotation);
                    return oRequestForQuotation;

                } catch (oError) {
                    console.error("Error loading Request for Quotation & items", oError);
                    return [];
                }
            },
            getCompareQuotation: async function (keyId, oView) {
                const oModel = oView?.getModel();
                const oContextBinding = oModel.bindContext(
                    `/QuotationComparison('${keyId}')`,
                    undefined,
                    {
                        $expand: "_CompareQuotationItem"
                    }
                );

                try {
                    const oCompareQuotation = await oContextBinding.requestObject();

                    console.log("Compare Quotation", oCompareQuotation);
                    return oCompareQuotation;

                } catch (oError) {
                    console.error("Error loading Request for CompareQuotation & items", oError);
                    return [];
                }
            },
        };
    });