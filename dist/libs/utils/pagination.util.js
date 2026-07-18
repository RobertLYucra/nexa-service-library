"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationUtil = PaginationUtil;
function PaginationUtil(total, page, perPage) {
    const totalPages = Math.ceil(total / perPage);
    const from = (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, total);
    return {
        total,
        page,
        perPage,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        to,
        from: total > 0 ? from : 0,
    };
}
//# sourceMappingURL=pagination.util.js.map