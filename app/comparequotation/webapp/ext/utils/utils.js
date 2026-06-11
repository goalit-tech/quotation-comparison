sap.ui.define(['sap/ui/model/json/JSONModel'], function (JSONModel) {
  'use strict';

  return {
    getModel: function () {
      return new JSONModel();
    },

    updatePredefinedTermsSelectable: function (aPreDefinedTerms, aTermsAndCondition) {
      const aExistingKeys = new Set(aTermsAndCondition.map((oTerm) => oTerm.KeyField));

      return aPreDefinedTerms.map((oTerm) => ({
        ...oTerm,
        Selectable: !aExistingKeys.has(oTerm.KeyField),
      }));
    },

    transformDataforComparisonTable: function (aSelectedData, aNewProperties) {
      const aSingleRowsAtTop = ['QuotationComparison', 'Supplierquotation', 'SupplierCode', 'SupplierName'];
      const aSingleRowsAtBottom = [
        'TermsAndConditions',
        // "ContactPerson",
        // "PhoneNumber",
      ];
      const aItemRows = [
        'Supplierquotationitem',
        'SNo',
        'Description',
        'Material',
        'MaterialMake',
        'ModelNumber',
        'Specifications',
        'Quantity',
        'Units',
        'Currency',
        'TotalAmount',
        'ConversionRs',
      ];
      aSingleRowsAtBottom.push(...(aNewProperties?.filter((prop) => !aSingleRowsAtBottom.includes(prop)) || []));
      const aRows = [];
      //First create the Header rows for single time
      aSingleRowsAtTop.forEach((sProperty) => {
        const oRow = {
          property: sProperty,
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

      Object.values(mItems).forEach((aItems) => {
        const sItemId = aItems[0].Supplierquotationitem;

        aItemRows.forEach((sProperty) => {
          const oRow = {
            property: `${sProperty}_${sItemId}`,
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
          property: sProperty,
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

      const nonVisibleRows = [
        'QuotationComparison',
        'Supplierquotation',
        'Supplierquotationitem',
        'SNo',
        'SupplierCode',
        'SupplierName',
      ];
      const aVisibleRows = aRows.filter((row) => {
        const base = row.property?.split('_')[0];
        return !nonVisibleRows.includes(base);
      });

      return {
        actualRows: aRows,
        filterRows: aVisibleRows,
      };
    },
    mergeActualAndFilterRowData: function (aActual, aWorking) {
      const mActualMap = new Map();

      // 1. Index actual by property
      aActual.forEach((o) => {
        mActualMap.set(o.property, { ...o });
      });

      // 2. Merge working into actual
      aWorking.forEach((o) => {
        const sKey = o.property;

        if (mActualMap.has(sKey)) {
          // update existing row (merge values dynamically)
          mActualMap.set(sKey, {
            ...mActualMap.get(sKey),
            ...o,
          });
        } else {
          // new row → add directly
          mActualMap.set(sKey, { ...o });
        }
      });

      // 3. Return merged array
      return Array.from(mActualMap.values());
    },

    mergeTermsAndConditonTOCompareQuotationITem: function (itemData, aTermsAndcondtion) {
      const mTerms = aTermsAndcondtion.reduce((m, oTerm) => {
        const sKey = `${oTerm.QuotationComparison}_${oTerm.QuotationComparisonItem}`;

        m[sKey] ??= {};
        m[sKey][oTerm.KeyField] = oTerm.ValueField || '';

        return m;
      }, {});

      const finalItemData = itemData.map((oItem) => ({
        ...oItem,
        ...(mTerms[`${oItem.QuotationComparison}_${oItem.Supplierquotationitem}`] || {}),
      }));
      return finalItemData;
    },

    generateCOlumnsForComparisonTable: function (oView, aRows) {
      const oTable = oView?.byId('_IDGenQCFormFragmentDynamicUITable');
      oTable.removeAllColumns();

      const headerRows = [
        // "AddDuties",
        'Description',
        'TermsAndConditions',
      ];
      const nonEditableHeaderRows = [
        'QuotationComparison',
        'Supplierquotation',
        'Supplierquotationitem',
        'SNo',
        'SupplierCode',
        'SupplierName',
        'Material',
        'Description',
        'MaterialMake',
        'ModelNumber',
        'Specifications',
        'Quantity',
        'Units',
        'TotalAmount',
        'Currency',
        // "ContactPerson",
        // "PhoneNumber",
        'ConversionRs',
        'TermsAndConditions',
      ];

      // Property column
      oTable.addColumn(
        new sap.ui.table.Column({
          label: new sap.m.Title({ text: '{i18n>DymanicColumnProperty}' }),
          template: new sap.m.HBox({
            items: [
              new sap.m.Title({
                text: {
                  path: 'LocalModel>property',
                  formatter: function (sProperty) {
                    const oBundle = oView.getModel('i18n').getResourceBundle();
                    const sPropertyName = sProperty?.split('_')[0];
                    return oBundle.hasText(sPropertyName) ? oBundle.getText(sPropertyName) : sPropertyName;
                  }.bind(this),
                },
                visible: {
                  path: 'LocalModel>property',
                  formatter: function (sProperty) {
                    const sBaseProperty = sProperty?.split('_')[0];
                    return headerRows.includes(sBaseProperty) ? true : false;
                  },
                },
              }),

              new sap.m.Text({
                text: {
                  path: 'LocalModel>property',
                  formatter: function (sProperty) {
                    const oBundle = oView.getModel('i18n').getResourceBundle();
                    const sPropertyName = sProperty?.split('_')[0];
                    return oBundle.hasText(sPropertyName) ? oBundle.getText(sPropertyName) : sPropertyName;
                  }.bind(this),
                },
                visible: {
                  path: 'LocalModel>property',
                  formatter: function (sProperty) {
                    const sBaseProperty = sProperty?.split('_')[0];
                    return headerRows.includes(sBaseProperty) ? false : true;
                  },
                },
              }),
            ],
          }),
          width: '11rem',
        }),
      );

      const aDyamicSupplierColumns = Object.keys(aRows[0]).filter((sKey) => sKey !== 'property');

      aDyamicSupplierColumns.forEach((sSupplierName) => {
        const oTemplate = new sap.m.HBox({
          items: [
            new sap.m.Input({
              value: '{LocalModel>' + sSupplierName + '}',
              editable: {
                parts: [{ path: 'LocalModel>property' }, { path: 'LocalModel>/IsEditCompareQuotation' }],
                formatter: function (sProperty, bEditable) {
                  const sBaseProperty = sProperty?.split('_')[0];
                  return !nonEditableHeaderRows.includes(sBaseProperty);
                },
              },
              visible: {
                parts: [{ path: 'LocalModel>property' }, { path: 'LocalModel>/IsEditCompareQuotation' }],
                formatter: function (sProperty, bEditable) {
                  const headerRows = ['TermsAndConditions'];
                  const isUnderscore = sProperty.includes('_');
                  // if (isUnderscore) {
                  const iLastUnderscore = sProperty.lastIndexOf('_');
                  const sField = isUnderscore ? sProperty.substring(0, iLastUnderscore) : sProperty;
                  // }
                  // return bEditable && !headerRows.includes(sProperty);
                  return bEditable && !nonEditableHeaderRows.includes(sField);
                },
              },
            }),
            new sap.m.Text({
              text: '{LocalModel>' + sSupplierName + '}',
              visible: {
                parts: [{ path: 'LocalModel>property' }, { path: 'LocalModel>/IsEditCompareQuotation' }],
                formatter: function (sProperty, bEditable) {
                  const headerRows = ['TermsAndConditions'];
                  // return !bEditable || headerRows.includes(sProperty);
                  const isUnderscore = sProperty.includes('_');
                  const iLastUnderscore = sProperty.lastIndexOf('_');
                  const sField = isUnderscore ? sProperty.substring(0, iLastUnderscore) : sProperty;
                  return sField !== 'Description' && nonEditableHeaderRows.includes(sField);
                },
              },
            }),
            new sap.m.Title({
              text: '{LocalModel>' + sSupplierName + '}',
              visible: {
                parts: [{ path: 'LocalModel>property' }, { path: 'LocalModel>/IsEditCompareQuotation' }],
                formatter: function (sProperty, bEditable) {
                  const isUnderscore = sProperty.includes('_');
                  const iLastUnderscore = sProperty.lastIndexOf('_');
                  const sField = isUnderscore ? sProperty.substring(0, iLastUnderscore) : sProperty;
                  return sField === 'Description';
                },
              },
            }),
          ],
        });

        oTable.addColumn(
          new sap.ui.table.Column({
            label: new sap.m.Title({
              text: sSupplierName,
              wrapping: true,
            }),
            template: oTemplate,
            width: '18rem',
          }),
        );
      });
    },
    reverseTransformCompareQuotationItemData: function (oCompareQuotation, aRows) {
      const aSupplierNames = Object.keys(aRows[0]).filter((sKey) => sKey !== 'property');

      const aResult = [];

      aSupplierNames.forEach((sSupplierName) => {
        const oCommonFields = {};
        const mItems = {};

        aRows.forEach((oRow) => {
          const vValue = oRow[sSupplierName];

          if (oRow.property.includes('_')) {
            const iLastUnderscore = oRow.property.lastIndexOf('_');
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
                SupplierName: sSupplierName,
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

    getSupplierQuotationForRFQ: async function (keyId, oView) {
      const oModel = oView?.getModel();
      const sPath = `/A_RequestForQuotation('${keyId}')/SupplierQuotation`;
      try {
        const oListBinding = oModel.bindList(sPath, undefined, undefined, undefined, {
          $expand: '_SupplierQuotationItem',
        });
        const aContexts = await oListBinding.requestContexts(0, 100);
        const aSupplierQuotation = aContexts.map((oContext) => oContext.getObject());

        console.log('Supplier Quotations', aSupplierQuotation);

        return aSupplierQuotation;
      } catch (oError) {
        console.error('Error loading supplier quotations & Items', oError);
        return [];
      }
    },
    getRequestForQuotation: async function (keyId, oView) {
      const oModel = oView?.getModel();
      const oContextBinding = oModel.bindContext(
        `/A_RequestForQuotation('${keyId.replace(/^'|'$/g, '')}')`,
        undefined,
        {
          $expand: 'to_RequestForQuotationItem',
        },
      );

      try {
        const oRequestForQuotation = await oContextBinding.requestObject();

        console.log('Request for Quotation', oRequestForQuotation);
        return oRequestForQuotation;
      } catch (oError) {
        console.error('Error loading Request for Quotation & items', oError);
        return [];
      }
    },
    getCompareQuotation: async function (keyId, oView) {
      const oModel = oView?.getModel();
      const oContextBinding = oModel.bindContext(`/QuotationComparison('${keyId}')`, undefined, {
        $expand: '_CompareQuotationItem,_TermsAndConditions',
      });

      try {
        const oCompareQuotation = await oContextBinding.requestObject();
        // const oCompareQuotation =
        console.log('Compare Quotation', oCompareQuotation);
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
        console.error('Error loading Request for CompareQuotation & items', oError);
        return [];
      }
    },
  };
});
