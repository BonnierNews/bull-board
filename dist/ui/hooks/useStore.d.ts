import * as api from '../../@types/api';
import { QueueActions, SelectedStatuses } from '../../@types/app';
import { Api } from '../services/Api';
declare type State = {
    data: null | api.GetQueues;
    loading: boolean;
};
export interface Store {
    state: State;
    actions: QueueActions;
    selectedStatuses: SelectedStatuses;
}
export declare const useStore: (api: Api) => Store;
export {};
