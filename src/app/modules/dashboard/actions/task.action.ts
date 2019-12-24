import {Action} from '@ngrx/store';
import {ITask} from '../../core/models/task';

export const TASK_ADD_REQUEST = '[Task] Task Add Request';

export const TASK_ADD_SUCCESS = '[Task] Task Add Success';

export const TASK_ADD_ERROR = '[Task] Task Add Error';

export const TASK_DELETE_REQUEST = '[Task] Task Delete Request';

export const TASK_DELETE_SUCCESS = '[Task] Task Delete Success';

export const TASK_EDIT_REQUEST = '[Task] Task Edit Request';
export const TASK_EDIT_SUCCESS = '[Task] Task Edit Success';

export class TaskAddRequestAction implements Action {
  readonly type = TASK_ADD_REQUEST;
}

export class TaskAddSuccessAction implements Action {
  readonly type = TASK_ADD_SUCCESS;

  constructor(public payload: ITask) {
  }
}
export class TaskAddErrorAction implements Action {
  readonly type = TASK_ADD_ERROR;
}

export class TaskDeleteRequestAction implements Action {
  readonly type = TASK_DELETE_REQUEST;
}

export class TaskDeleteSuccessAction implements Action {
  readonly type = TASK_DELETE_SUCCESS;

  constructor(public payload: number) {

  }
}

export class TaskEditRequestAction implements Action {
  readonly type = TASK_EDIT_REQUEST;
}

export class TaskEditSuccessAction implements Action {
  readonly type = TASK_EDIT_SUCCESS;

  constructor(public payload: ITask) {
  }
}
