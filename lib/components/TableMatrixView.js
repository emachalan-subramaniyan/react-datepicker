"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classNames = require("classnames");
var React = require("react");
var TableMatrixView = function (_a) {
    var className = _a.className, matrix = _a.matrix, cell = _a.cell, headers = _a.headers, allowedDays = _a.allowedDays;
    var data = null;
    return (React.createElement("table", { className: classNames('calendar__body--table', className) },
        headers && (React.createElement("thead", null,
            React.createElement("tr", null, headers.map(function (v, i) { return (React.createElement("th", { key: i }, v)); })))),
        React.createElement("tbody", null, matrix.map(function (row, i) {
            if (allowedDays) {
                data = row.slice(1, -1);
            }
            else {
                data = row;
            }
            return (React.createElement("tr", { key: i }, data.map(function (v, j) { return cell(v, i * matrix[i].length + j); })));
        }))));
};
exports.default = TableMatrixView;
//# sourceMappingURL=TableMatrixView.js.map