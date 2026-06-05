sap.ui.define(
    [
        'sap/fe/core/PageController',
        "sap/ui/core/Fragment",
    ],
    function (PageController, Fragment) {
        'use strict';

        return PageController.extend('nlabs.ai.cq.comparequotation.ext.view.Main', {

            // onInit: function () {
            //     PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
            // },
            // onCreateLRActionPress: async function (oEvent) {
            //     this.oRFQListDialog ??= await this.loadFragment({
            //         name: "nlabs.ai.cq.comparequotation.ext.fragments.RFQList"
            //     });
            //     this.getExtensionAPI().addDependent(this.oRFQListDialog);
            //     this.oRFQListDialog.open();
            // },
            // onUpdateLRActionPress: function () {

            // },
            // onDeleteLRActionPress: function () {

            // },

            // onRFQDialogTableRowSelectionChange: function (oEvent) {

            // }

        });
    }
);
