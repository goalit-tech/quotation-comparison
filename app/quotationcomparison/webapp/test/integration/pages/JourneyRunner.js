sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"nlabs/ui/quotationcomparison/test/integration/pages/RFQsMain"
], function (JourneyRunner, RFQsMain) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('nlabs/ui/quotationcomparison') + '/test/flp.html#app-preview',
        pages: {
			onTheRFQsMain: RFQsMain
        },
        async: true
    });

    return runner;
});

