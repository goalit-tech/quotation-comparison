sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"nlabs.ai/cq/comparequotation/test/integration/pages/QuotationComparisonMain"
], function (JourneyRunner, QuotationComparisonMain) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('nlabs.ai/cq/comparequotation') + '/test/flp.html#app-preview',
        pages: {
			onTheQuotationComparisonMain: QuotationComparisonMain
        },
        async: true
    });

    return runner;
});

