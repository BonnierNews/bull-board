/// <reference types="react" />
import { AppJob } from '../../../@types/app';
import { Status } from '../constants';
interface JobCardProps {
    job: AppJob;
    status: Status;
    readOnlyMode: boolean;
    actions: {
        promoteJob: () => Promise<void>;
        retryJob: () => Promise<void>;
        cleanJob: () => Promise<void>;
    };
}
export declare const JobCard: ({ job, status, actions, readOnlyMode, }: JobCardProps) => JSX.Element;
export {};
