using {
    cuid,
    managed
} from '@sap/cds/common';

namespace nlab.rfq.db;


/* =========================================================
   QUOTATION COMPARISON - HEADER
========================================================= */

@cds.persistence.skip
entity QuotationComparison : managed {
    key rfq                       : String(20);
        companyName               : String(255);
        comparativeStatementTitle : String(500);
        requestorName             : String(100);
        accountAssignment         : String(100);
        requisitionNumber         : String(30);
        requisitionDate           : Date;
        purpose                   : String(500);
        comparisonDate            : Date;
        items                     : Composition of many QuotationComparisonItem
                                        on items.comparison = $self;
}


/* =========================================================
   QUOTATION COMPARISON - ITEMS
========================================================= */
@cds.persistence.skip
entity QuotationComparisonItem : cuid, managed {
    comparison                 : Association to QuotationComparison;
    serialNumber               : Integer;
    description                : String(500);
    quantity                   : Decimal(15, 3);
    units                      : String(10);
    supplier                   : String(255);
    unitRate                   : Decimal(15, 2);
    totalAmount                : Decimal(15, 2);
    currency                   : String(5);
    materialMake               : String(255);
    specifications             : LargeString;
    modelNumber                : String(100);
    warranty                   : String(255);
    taxAmount                  : Decimal(15, 2);
    freightCharges             : Decimal(15, 2);
    discount                   : Decimal(15, 2);
    technicalCompliance        : String(255);
    conversionRateInRs         : Decimal(15, 2);
    bcdPercentage              : Decimal(5, 2);
    swcOnBcdPercentage         : Decimal(5, 2);
    hsnCode                    : String(20);
    gst                        : Decimal(5, 2);
    insuranceCharges           : Decimal(15, 2);
    bankCharges                : Decimal(15, 2);
    localTransportationCharges : Decimal(15, 2);
    landingCost                : Decimal(15, 2);
    density                    : Decimal(15, 3);
    contactPerson              : String(100);
    phoneNumber                : String(20);
}
