import { Job, Queue } from 'bullmq';
import { JobCleanStatus, JobCounts, JobStatus, QueueAdapterOptions } from '../@types/app';
import { BaseAdapter } from './base';
export declare class BullMQAdapter extends BaseAdapter {
    private queue;
    private readonly LIMIT;
    constructor(queue: Queue, options?: Partial<QueueAdapterOptions>);
    getClient(): Queue['client'];
    getName(): string;
    clean(jobStatus: JobCleanStatus, graceTimeMs: number): Promise<void>;
    getJob(id: string): Promise<Job | undefined>;
    getJobs(jobStatuses: JobStatus[], start?: number, end?: number): Promise<Job[]>;
    getJobCounts(...jobStatuses: JobStatus[]): Promise<JobCounts>;
}
