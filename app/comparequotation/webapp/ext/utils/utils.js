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

            transformDataforComparisonTable: function (aSelectedData, aNewProperties) {
                const aSingleRowsAtTop = [
                    "QuotationComparison",
                    "Supplierquotation",
                    "SupplierCode",
                    "SupplierName",
                ];
                const aSingleRowsAtBottom = [
                    "TermsAndConditions",
                    // "ContactPerson",
                    // "PhoneNumber",
                ];
                const aItemRows = [
                    "Supplierquotationitem",
                    "SNo",
                    "Description",
                    "Material",
                    "MaterialMake",
                    "ModelNumber",
                    "Specifications",
                    "Quantity",
                    "Units",
                    "Currency",
                    "TotalAmount",
                    "ConversionRs",
                ];
                aSingleRowsAtBottom.push(
                    ...(aNewProperties?.filter(prop => !aSingleRowsAtBottom.includes(prop)) || [])
                );
                const aRows = [];
                //First create the Header rows for single time
                aSingleRowsAtTop.forEach((sProperty) => {
                    const oRow = {
                        property: sProperty
                    };

                    aSelectedData.forEach((oItem) => {
                        // const sSupplierName = oItem.SupplierName + "_" + oItem.SNo;
                        const sSupplierName = oItem.SupplierName;

                        if (oRow[sSupplierName] === undefined) {
                            oRow[sSupplierName] = oItem[sProperty];
                        }
                    });

                    aRows.push(oRow);
                });
                /**
                 * Then create all the properties of each material in group
                 * this creates the multiple row of each material type
                 * Intialy selected the no of material type here based on description
                 */
                const mItems = {};
                aSelectedData.forEach((oItem) => {
                    const sItemKey = oItem.Description; // choose your actual item key
                    if (!mItems[sItemKey]) {
                        mItems[sItemKey] = [];
                    }
                    mItems[sItemKey].push(oItem);
                });
                // Now for each Material type generate the columns
                // let iItemNo = 1;

                Object.values(mItems).forEach((aItems) => {
                    const sItemId = aItems[0].Supplierquotationitem;

                    aItemRows.forEach((sProperty) => {
                        const oRow = {
                            property: `${sProperty}_${sItemId}`
                        };

                        aItems.forEach((oItem) => {
                            // const sSupplierName = oItem.SupplierName + "_" + oItem.SNo;
                            const sSupplierName = oItem.SupplierName;
                            oRow[sSupplierName] = oItem[sProperty];
                        });
                        aRows.push(oRow);
                    });

                    // iItemNo++;
                });

                // Now again the botton rows which should be common for each materialtype
                aSingleRowsAtBottom.forEach((sProperty) => {

                    const oRow = {
                        property: sProperty
                    };

                    aSelectedData.forEach((oItem) => {

                        // const sSupplierName = oItem.SupplierName + "_" + oItem.SNo;
                        const sSupplierName = oItem.SupplierName;

                        if (oRow[sSupplierName] === undefined) {
                            oRow[sSupplierName] = oItem[sProperty];
                        }
                    });

                    aRows.push(oRow);
                });

                // const aRows = aProperties.map((sProperty) => {
                //     //create empty row object name
                //     const oRow = {
                //         property: sProperty
                //     };
                //     aSelectedData.forEach((oItem) => {
                //         const sSupplierName = oItem.SupplierName + "_" + oItem.SNo;
                //         oRow[sSupplierName] = oItem[sProperty];
                //     });

                //     return oRow;
                // });
                return aRows;
            },
            generateCOlumnsForComparisonTable: function (oView, aRows) {
                const oTable = oView?.byId("_IDGenQCFormFragmentDynamicUITable");
                oTable.removeAllColumns();

                const headerRows = [
                    // "AddDuties",
                    "Description",
                    "TermsAndConditions"
                ];
                const nonEditableHeaderRows = [
                    "QuotationComparison",
                    "Supplierquotation",
                    "Supplierquotationitem",
                    "SNo",
                    "SupplierCode",
                    "SupplierName",
                    "Material",
                    "Description",
                    "MaterialMake",
                    "ModelNumber",
                    "Specifications",
                    "Quantity",
                    "Units",
                    "TotalAmount",
                    "Currency",
                    // "ContactPerson",
                    // "PhoneNumber",
                    "ConversionRs",
                    "TermsAndConditions",
                ];

                // Property column
                oTable.addColumn(
                    new sap.ui.table.Column({
                        label: new sap.m.Title({ text: "{i18n>DymanicColumnProperty}" }),
                        template: new sap.m.HBox({
                            items: [
                                new sap.m.Title({
                                    text: {
                                        path: "LocalModel>property",
                                        formatter: function (sProperty) {
                                            const oBundle = oView.getModel("i18n").getResourceBundle();
                                            const sPropertyName = sProperty?.split("_")[0];

                                            return oBundle.hasText(sPropertyName)
                                                ? oBundle.getText(sPropertyName)
                                                : sPropertyName;
                                        }.bind(this)
                                    },
                                    visible: {
                                        path: "LocalModel>property",
                                        formatter: function (sProperty) {
                                            const sBaseProperty = sProperty?.split("_")[0];
                                            return headerRows.includes(sBaseProperty) ? true : false;
                                        }
                                    }
                                }),

                                new sap.m.Text({
                                    text: {
                                        path: "LocalModel>property",
                                        formatter: function (sProperty) {
                                            const oBundle = oView.getModel("i18n").getResourceBundle();

                                            const sPropertyName = sProperty?.split("_")[0];

                                            return oBundle.hasText(sPropertyName)
                                                ? oBundle.getText(sPropertyName)
                                                : sPropertyName;
                                        }.bind(this)
                                    },
                                    visible: {
                                        path: "LocalModel>property",
                                        formatter: function (sProperty) {
                                            const sBaseProperty = sProperty?.split("_")[0];
                                            return headerRows.includes(sBaseProperty) ? false : true;
                                        }
                                    }
                                })
                            ]
                        }),
                        width: "11rem"
                    })
                );

                const aDyamicSupplierColumns = Object.keys(aRows[0])
                    .filter((sKey) => sKey !== "property");

                aDyamicSupplierColumns.forEach((sSupplierName) => {

                    const oTemplate = new sap.m.HBox(
                        {
                            items: [
                                new sap.m.Input({
                                    value: "{LocalModel>" + sSupplierName + "}",
                                    editable: {
                                        parts: [
                                            { path: "LocalModel>property" },
                                            { path: "LocalModel>/IsEditCompareQuotation" }
                                        ],
                                        formatter: function (sProperty, bEditable) {
                                            const sBaseProperty = sProperty?.split("_")[0];
                                            return !nonEditableHeaderRows.includes(sBaseProperty);
                                        }
                                    },
                                    visible: {
                                        parts: [
                                            { path: "LocalModel>property" },
                                            { path: "LocalModel>/IsEditCompareQuotation" }
                                        ],
                                        formatter: function (sProperty, bEditable) {
                                            const headerRows = ["TermsAndConditions"];
                                            return bEditable && !headerRows.includes(sProperty);
                                        }
                                    }
                                }),
                                new sap.m.Text({
                                    text: "{LocalModel>" + sSupplierName + "}",
                                    visible: {
                                        parts: [
                                            { path: "LocalModel>property" },
                                            { path: "LocalModel>/IsEditCompareQuotation" }
                                        ],
                                        formatter: function (sProperty, bEditable) {
                                            const headerRows = ["TermsAndConditions"];
                                            return !bEditable || headerRows.includes(sProperty);
                                        }
                                    }
                                })
                            ]
                        });

                    oTable.addColumn(
                        new sap.ui.table.Column({
                            label: new sap.m.Title({
                                text: sSupplierName,
                                wrapping: true
                            }),
                            template: oTemplate,
                            width: "18rem"
                        })
                    );
                });
            },
            reverseTransformCompareQuotationItemData: function (oCompareQuotation, aRows) {

                const aSupplierNames = Object.keys(aRows[0])
                    .filter(sKey => sKey !== "property");

                const aResult = [];

                aSupplierNames.forEach((sSupplierName) => {

                    const oCommonFields = {};
                    const mItems = {};

                    aRows.forEach((oRow) => {

                        const vValue = oRow[sSupplierName];

                        if (oRow.property.includes("_")) {

                            const iLastUnderscore = oRow.property.lastIndexOf("_");
                            const sField = oRow.property.substring(0, iLastUnderscore);
                            const sItemId = oRow.property.substring(iLastUnderscore + 1);

                            // Skip rows that don't exist for this supplier
                            if (vValue === undefined) {
                                return;
                            }

                            if (!mItems[sItemId]) {
                                mItems[sItemId] = {
                                    QuotationComparison: oCompareQuotation?.QuotationComparison,
                                    Supplierquotationitem: sItemId,
                                    SupplierName: sSupplierName
                                };
                            }

                            mItems[sItemId][sField] = vValue;

                        } else {

                            oCommonFields[oRow.property] = vValue;
                        }
                    });

                    Object.values(mItems).forEach((oItem) => {
                        Object.assign(oItem, oCommonFields);
                        aResult.push(oItem);
                    });
                });

                return aResult;
            },


            generateTermsAndConditions: function (
                oCompareQuotation,
                aRows,
                aPreDefinedTerms
            ) {

                const aTermsAndConditions = [];
                let iCompareQuotationItem = 10;

                const mTermsLookup = {};
                aPreDefinedTerms.forEach((oTerm) => {
                    mTermsLookup[oTerm.KeyField] = oTerm.KeyFieldDesc;
                });

                const aSupplierNames = Object.keys(aRows[0])
                    .filter((sKey) => sKey !== "property");

                aRows.forEach((oRow) => {

                    // Check if this row is a predefined term
                    if (!mTermsLookup[oRow.property]) {
                        return;
                    }

                    aSupplierNames.forEach((sSupplierName) => {

                        const vValue = oRow[sSupplierName];

                        if (
                            vValue !== undefined &&
                            vValue !== null &&
                            vValue !== ""
                        ) {

                            aTermsAndConditions.push({
                                QuotationComparison: oCompareQuotation?.QuotationComparison,
                                CompareQuotationItem: String(iCompareQuotationItem).padStart(2, "0"),
                                SupplierName: sSupplierName,
                                KeyField: oRow.property,
                                KeyFieldDesc: mTermsLookup[oRow.property],
                                KeyFieldValue: vValue
                            });

                            iCompareQuotationItem += 10;
                        }
                    });
                });

                return aTermsAndConditions;
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
                        $expand: "_CompareQuotationItem,_TermsAndConditions"
                    }
                );

                try {
                    const oCompareQuotation = await oContextBinding.requestObject();
                    // const oCompareQuotation =
                    console.log("Compare Quotation", oCompareQuotation);
                    // oQuotationComparison?._CompareQuotationItem.forEach(oItem => {
                    //     const aItemTerms = aTerms.filter(
                    //         oTerm => oTerm.QuotationComparisonItem === oItem.SNo
                    //     );

                    //     aItemTerms.forEach(oTerm => {
                    //         oItem[oTerm.KeyField] = oTerm.ValueField;
                    //     });

                    // });
                    return oCompareQuotation;

                } catch (oError) {
                    console.error("Error loading Request for CompareQuotation & items", oError);
                    return [];
                }
            }
        };
    });