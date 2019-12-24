import {taskReducer, TaskState} from '../../dashboard/reducers/task.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface RootState {
 // tasks: TaskState;
}

export const reducer: ActionReducerMap<RootState> = {
 // tasks: taskReducer
};
