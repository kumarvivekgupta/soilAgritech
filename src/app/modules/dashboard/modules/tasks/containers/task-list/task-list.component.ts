import {Component, OnInit} from '@angular/core';
import {ITask} from '../../../../../core/models/task';
import {FetchTasksService} from '../../../../../core/services/task-add.service';
import {DashboardRootState, getTasks, getTasksLoaded, getTasksResults} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {
  TaskEditRequestAction,
  TaskEditSuccessAction,
  TaskFetchRequestAction,
  TaskFetchSuccessAction
} from '../../../../actions/task.action';
import {map} from 'rxjs/operators';
import {select} from '@ngrx/store';

@Component({
  selector   : 'app-tas-list',
  templateUrl: './task-list.component.html',
  styleUrls  : ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  columnNames = ['name', 'date', 'complete', 'importance', 'action'];
  taskList: ITask[];
  count: boolean;

  constructor(private fetchTasksService: FetchTasksService, private store: Store<DashboardRootState>) {
  }

  ngOnInit() {
    this.store.pipe(select(getTasksLoaded)).subscribe((r) => {
      this.count = r;
      console.log(r);
    });
    if (!this.count) {
      this.store.dispatch(new TaskFetchRequestAction());
      this.fetchTasksService.taskList().subscribe((r) => {
        this.taskList = r;
      });
      this.store.dispatch(new TaskFetchSuccessAction(this.taskList));
    } else {
      this.taskList = [];
      this.store.select(getTasks).subscribe((res) => {
        res.map(task => this.taskList.push(task));
      });
    }


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
