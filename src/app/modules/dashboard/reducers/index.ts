
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {_getTaskResults, _getTasks, _getTasksAdding, _getTasksDeleting, _getTasksUpdating, taskReducer, TaskState} from './task.reducer';
import {RootState} from '../../core/reducers';

export interface DashboardState {
  tasks: TaskState;
}

export interface DashboardRootState extends RootState {
  dashboard: DashboardState;
}

export const dashboardRootReducers = {
  tasks: taskReducer
};
export const getDashboardRootState = createFeatureSelector<DashboardState>('dashboard');


export const getTaskState = createSelector(
  getDashboardRootState,
  state => state.tasks
);

export const getTasks         = createSelector(getTaskState, _getTasks);
export const getTasksUpdating = createSelector(getTaskState, _getTasksUpdating);
export const getTasksDeleting = createSelector(getTaskState, _getTasksDeleting);
export const getTasksAdding   = createSelector(getTaskState, _getTasksAdding);
