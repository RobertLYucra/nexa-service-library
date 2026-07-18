"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignStatusNameEnum = exports.CampaignStatus = void 0;
var CampaignStatus;
(function (CampaignStatus) {
    CampaignStatus["DRAFT"] = "DRAFT";
    CampaignStatus["SCHEDULED"] = "SCHEDULED";
    CampaignStatus["PROCESSING"] = "PROCESSING";
    CampaignStatus["COMPLETED"] = "COMPLETED";
    CampaignStatus["FAILED"] = "FAILED";
    CampaignStatus["CANCELLED"] = "CANCELLED";
})(CampaignStatus || (exports.CampaignStatus = CampaignStatus = {}));
var CampaignStatusNameEnum;
(function (CampaignStatusNameEnum) {
    CampaignStatusNameEnum["DRAFT"] = "Borrador";
    CampaignStatusNameEnum["SCHEDULED"] = "Programada";
    CampaignStatusNameEnum["PROCESSING"] = "En Proceso";
    CampaignStatusNameEnum["COMPLETED"] = "Completada";
    CampaignStatusNameEnum["FAILED"] = "Fallida";
    CampaignStatusNameEnum["CANCELLED"] = "Cancelada";
})(CampaignStatusNameEnum || (exports.CampaignStatusNameEnum = CampaignStatusNameEnum = {}));
//# sourceMappingURL=campaign-status.enum.js.map