"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queuesHandler = void 0;
const redis_info_1 = require("redis-info");
const metrics = [
    'redis_version',
    'used_memory',
    'mem_fragmentation_ratio',
    'connected_clients',
    'blocked_clients',
];
const getStats = async ({ queue, }) => {
    const redisClient = await queue.getClient();
    const redisInfoRaw = await redisClient.info();
    const redisInfo = redis_info_1.parse(redisInfoRaw);
    const validMetrics = metrics.reduce((acc, metric) => {
        if (redisInfo[metric]) {
            acc[metric] = redisInfo[metric];
        }
        return acc;
    }, {});
    validMetrics.total_system_memory =
        redisInfo.total_system_memory || redisInfo.maxmemory;
    return validMetrics;
};
const formatJob = (job, queue) => {
    const jobProps = job.toJSON();
    return {
        id: jobProps.id,
        timestamp: jobProps.timestamp,
        processedOn: jobProps.processedOn,
        finishedOn: jobProps.finishedOn,
        progress: jobProps.progress,
        attempts: jobProps.attemptsMade,
        delay: job.opts.delay,
        failedReason: jobProps.failedReason,
        stacktrace: jobProps.stacktrace ? jobProps.stacktrace.filter(Boolean) : [],
        opts: jobProps.opts,
        data: queue.format('data', jobProps.data),
        name: jobProps.name,
        returnValue: queue.format('returnValue', jobProps.returnvalue),
    };
};
const statuses = [
    'active',
    'completed',
    'delayed',
    'failed',
    'paused',
    'waiting',
];
const getDataForQueues = async (bullBoardQueues, req) => {
    const query = req.query || {};
    const pairs = Object.entries(bullBoardQueues);
    if (pairs.length == 0) {
        return {
            stats: {},
            queues: [],
        };
    }
    const queues = await Promise.all(pairs.map(async ([name, { queue }]) => {
        const counts = await queue.getJobCounts(...statuses);
        const status = query[name] === 'latest' ? statuses : query[name];
        const jobs = await queue.getJobs(status, 0, 10);
        return {
            name,
            counts: counts,
            jobs: jobs.map((job) => formatJob(job, queue)),
            readOnlyMode: queue.readOnlyMode,
        };
    }));
    const stats = await getStats(pairs[0][1]);
    return {
        stats,
        queues,
    };
};
const queuesHandler = async (req, res) => {
    const { bullBoardQueues } = req.app.locals;
    res.json(await getDataForQueues(bullBoardQueues, req));
};
exports.queuesHandler = queuesHandler;
//# sourceMappingURL=queues.js.map