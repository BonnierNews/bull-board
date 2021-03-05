"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
const react_1 = require("react");
const constants_1 = require("../components/constants");
const interval = 5000;
const useStore = (api) => {
    const [state, setState] = react_1.useState({
        data: null,
        loading: true,
    });
    const [selectedStatuses, setSelectedStatuses] = react_1.useState({});
    const poll = react_1.useRef(undefined);
    const stopPolling = () => {
        if (poll.current) {
            clearTimeout(poll.current);
            poll.current = undefined;
        }
    };
    react_1.useEffect(() => {
        stopPolling();
        runPolling();
        return stopPolling;
    }, [selectedStatuses]);
    const runPolling = () => {
        update()
            // eslint-disable-next-line no-console
            .catch((error) => console.error('Failed to poll', error))
            .then(() => {
            const timeoutId = setTimeout(runPolling, interval);
            poll.current = timeoutId;
        });
    };
    const update = () => api.getQueues({ status: selectedStatuses }).then((data) => {
        setState({ data, loading: false });
        if (state.loading) {
            setSelectedStatuses(data.queues.reduce((result, queue) => {
                result[queue.name] = result[queue.name] || constants_1.STATUS_LIST[0];
                return result;
            }, {}));
        }
    });
    const promoteJob = (queueName) => (job) => () => api.promoteJob(queueName, job.id).then(update);
    const retryJob = (queueName) => (job) => () => api.retryJob(queueName, job.id).then(update);
    const cleanJob = (queueName) => (job) => () => api.cleanJob(queueName, job.id).then(update);
    const retryAll = (queueName) => () => api.retryAll(queueName).then(update);
    const cleanAllDelayed = (queueName) => () => api.cleanAllDelayed(queueName).then(update);
    const cleanAllFailed = (queueName) => () => api.cleanAllFailed(queueName).then(update);
    const cleanAllCompleted = (queueName) => () => api.cleanAllCompleted(queueName).then(update);
    return {
        state,
        actions: {
            promoteJob,
            retryJob,
            retryAll,
            cleanJob,
            cleanAllDelayed,
            cleanAllFailed,
            cleanAllCompleted,
            setSelectedStatuses,
        },
        selectedStatuses,
    };
};
exports.useStore = useStore;
//# sourceMappingURL=useStore.js.map