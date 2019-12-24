import {Component, OnInit} from '@angular/core';
import {ITask} from '../../../../../core/models/task';
import {FetchTasksService} from '../../../../../core/services/task-add.service';
import {DashboardRootState} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {
  TaskEditRequestAction,
  TaskEditSuccessAction,
  TaskFetchRequestAction,
  TaskFetchSuccessAction
} from '../../../../actions/task.action';

@Component({
  selector   : 'app-tas-list',
  templateUrl: './task-list.component.html',
  styleUrls  : ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  columnNames = ['name', 'date', 'complete', 'importance', 'action'];
  taskList: ITask[];

  constructor(private fetchTasksService: FetchTasksService, private store: Store<DashboardRootState>) {
  }

  ngOnInit() {
    this.store.dispatch(new TaskFetchRequestAction());
    this.fetchTasksService.taskList().subscribe((r) => {
      this.taskList = r;
    });
    this.store.dispatch(new TaskFetchSuccessAction(this.taskList));


  }

  starUnstar(id: number) {
    this.store.dispatch(new TaskEditRequestAction());
    this.taskList.forEach(taskone => {
      if (taskone.id === id) {
        taskone.start = !taskone.start;
      }
    });
    const task = this.taskList.filter(taskone => taskone.id === id);
    // console.log(task);
    this.store.dispatch(new TaskEditSuccessAction(task[0]));
  }
}
