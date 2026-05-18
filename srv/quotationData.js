module.exports = function (srv) {
    return [
        {
            rfq: "3150000001",
            companyName: "Company 3000",
            comparativeStatementTitle: "Quotation Comparison for RFQ 3150000001",
            requestorName: "CB9980000038",
            accountAssignment: "",
            requisitionNumber: "308000001",
            requisitionDate: "2026-03-05",
            purpose: "Comparison of supplier quotations",
            comparisonDate: "2026-03-05",
            items: [
                {
                    ID: 1,
                    serialNumber: 10,
                    description: "PEN DRIVE 16GB",
                    quantity: 10,
                    units: "NOS",
                    supplier: "3060000002",
                    unitRate: 10000,
                    totalAmount: 100000,
                    currency: "INR"
                },
                {
                    ID: 2,
                    serialNumber: 20,
                    description: "PEN DRIVE 16GB",
                    quantity:5,
                    units: "NOS",
                    supplier: "3060000002",
                    unitRate: 120000,
                    totalAmount: 120000,
                    currency: "INR"
                }
            ]
        }
    ];
};