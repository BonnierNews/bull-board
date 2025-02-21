"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
class Api {
    constructor({ basePath } = { basePath: '' }) {
        this.axios = axios_1.default.create({ baseURL: `${basePath}/api` });
        this.axios.interceptors.response.use(this.handleResponse, this.handleError);
    }
    getQueues({ status, }) {
        return this.axios.get(`/queues/`, { params: { ...status } });
    }
    retryAll(queueName) {
        return this.axios.put(`/queues/${encodeURIComponent(queueName)}/retry`);
    }
    cleanAllDelayed(queueName) {
        return this.axios.put(`/queues/${encodeURIComponent(queueName)}/clean/delayed`);
    }
    cleanAllFailed(queueName) {
        return this.axios.put(`/queues/${encodeURIComponent(queueName)}/clean/failed`);
    }
    cleanAllCompleted(queueName) {
        return this.axios.put(`/queues/${encodeURIComponent(queueName)}/clean/completed`);
    }
    cleanJob(queueName, jobId) {
        return this.axios.put(`/queues/${encodeURIComponent(queueName)}/${jobId}/clean`);
    }
    retryJob(queueName, jobId) {
        return this.axios.put(`/queues/${encodeURIComponent(queueName)}/${jobId}/retry`);
    }
    promoteJob(queueName, jobId) {
        return this.axios.put(`/queues/${encodeURIComponent(queueName)}/${jobId}/promote`);
    }
    handleResponse(response) {
        return response.data;
    }
    async handleError(error) {
        var _a, _b;
        if ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.error) {
            react_toastify_1.toast.error((_b = error.response.data) === null || _b === void 0 ? void 0 : _b.error, { autoClose: 5000 });
        }
        return Promise.resolve(error.response.data);
    }
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map