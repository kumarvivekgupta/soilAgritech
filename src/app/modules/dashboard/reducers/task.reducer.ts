import {ITask} from '../../core/models/task';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action} from '../../core/actions/action';
import {
  TASK_ADD_REQUEST,
  TASK_ADD_SUCCESS,
  TASK_DELETE_REQUEST,
  TASK_EDIT_REQUEST,
  TASK_EDIT_SUCCESS, TASK_FETCH_REQUEST,
  TASK_FETCH_SUCCESS
} from '../actions/task.action';
import {createSelector} from '@ngrx/store';

export interface TaskState extends EntityState<ITask> {
  loading: boolean;
  loaded: boolean;
  sortBy: string;
  results: number[];
  adding: boolean;
  updating: boolean;
  updated: boolean;
  deleting: boolean;

}


export const taskAdapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({
  selectId    : (alert: ITask) => alert.id,
  sortComparer: false
});


export const initialState: TaskState = taskAdapter.getInitialState(
  {
    loading : false,
    loaded  : false,
    results : [],
    sortBy  : '',
    adding  : false,
    updating: false,
    updated : false,
    deleting: false,
  });

export function taskReducer(state: TaskState = initialState, action: Action): TaskState {
  switch (action.type) {
    case TASK_ADD_REQUEST: {
      return {
        ...state, adding: true
      };
    }
    case TASK_ADD_SUCCESS: {
      const addedState = taskAdapter.addOne(action.payload, state);
      return {...addedState, adding: false};
    }
    case TASK_EDIT_SUCCESS: {
      const updatedState = taskAdapter.updateOne({
        id     : action.payload.id,
        changes: action.payload
      }, state);
      return {...updatedState, updating: false, updated: true};
    }
    case TASK_EDIT_REQUEST: {
      return {
        ...state, updating: true
      };
    }
    case TASK_DELETE_REQUEST: {
      return {
        ...state, deleting: true
      };
    }
    case TASK_FETCH_REQUEST: {
      return {
        ...state, loading: true
      };
    }
    case TASK_FETCH_SUCCESS: {
      const addedState = taskAdapter.addMany(action.payload, state);
      let results      = [];
      results          = [...action.payload.map(r => r.id)];
      return {
        ...addedState,
        results         : results,
        loading         : false,
        loaded          : true,
      };
    }
  }
}

export const {
               selectEntities: _getTaskEntities
             } = taskAdapter.getSelectors();

export const _getTaskResults   = (state: TaskState) => state.results;
export const _getTasksUpdating = (state: TaskState) => state.updating;
export const _getTasksUpdated  = (state: TaskState) => state.updated;
export const _getTasksAdding   = (state: TaskState) => state.adding;
export const _getTasksDeleting = (state: TaskState) => state.deleting;

export const _getTasks = createSelector(_getTaskResults, _getTaskEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});



