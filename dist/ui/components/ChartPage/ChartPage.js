"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartPage = void 0;
const react_1 = __importDefault(require("react"));
// import { Store } from '../../hooks/useStore'
// import { JobCard } from '../JobCard/JobCard'
// import { QueueActions } from '../QueueActions/QueueActions'
// import { StatusMenu } from '../StatusMenu/StatusMenu'
const ChartPage_module_css_1 = __importDefault(require("./ChartPage.module.css"));
const ChartPage = ({ 
// selectedStatus,
// actions,
chart, }) => {
    if (!chart) {
        return react_1.default.createElement("section", null, "Chart Not found");
    }
    return (react_1.default.createElement("section", null,
        react_1.default.createElement("div", { className: ChartPage_module_css_1.default.stickyHeader })));
};
exports.ChartPage = ChartPage;
//# sourceMappingURL=ChartPage.js.map