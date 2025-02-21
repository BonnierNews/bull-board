"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullAdapter = void 0;
const base_1 = require("./base");
class BullAdapter extends base_1.BaseAdapter {
    constructor(queue, options = {}) {
        super(options);
        this.queue = queue;
    }
    getClient() {
        return Promise.resolve(this.queue.client);
    }
    getName() {
        return this.queue.name;
    }
    clean(jobStatus, graceTimeMs) {
        return this.queue.clean(graceTimeMs, jobStatus);
    }
    getJob(id) {
        return this.queue.getJob(id);
    }
    getJobs(jobStatuses, start, end) {
        return this.queue.getJobs(jobStatuses, start, end);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getJobCounts(..._jobStatuses) {
        return this.queue.getJobCounts();
    }
}
exports.BullAdapter = BullAdapter;
//# sourceMappingURL=bull.js.map