import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ITask} from '../../../../../core/models/task';
import {FetchTasksService} from '../../../../../core/services/task-add.service';
import {DashboardRootState, getTasks, getTasksDeleting, getTasksLoaded, getTasksResults} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {
  TaskDeleteRequestAction, TaskDeleteSuccessAction,
  TaskEditRequestAction,
  TaskEditSuccessAction,
  TaskFetchRequestAction,
  TaskFetchSuccessAction
} from '../../../../actions/task.action';
import {map, take} from 'rxjs/operators';
import {select} from '@ngrx/store';
import {MatDialog, MatTableDataSource} from '@angular/material';

@Component({
  selector   : 'app-tas-list',
  templateUrl: './task-list.component.html',
  styleUrls  : ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  columnNames = ['name', 'date', 'complete', 'importance', 'action'];
  taskList: ITask[];

  dataSource = new MatTableDataSource<ITask>();

  count = false;
  deleting: number;

  constructor(private fetchTasksService: FetchTasksService, private store: Store<DashboardRootState>,
              private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.pipe(select(getTasksLoaded)).subscribe((r) => {
      this.count = r;
        this.taskList = [];
       //  console.log(r);
    });


    if (!this.count) {
      this.store.dispatch(new TaskFetchRequestAction());
      this.fetchTasksService.taskList().subscribe((r) => {
        this.taskList        = r;
        this.dataSource.data = r;
      });
      this.store.dispatch(new TaskFetchSuccessAction(this.taskList));
    } else {
      this.taskList = [];
      this.store.select(getTasks).subscribe((res) => {
        res.map(task => this.taskList.push(task));
      });
      this.dataSource.data = this.taskList;
    }


  }

  starUnstar(id: number) {
    this.store.dispatch(new TaskEditRequestAction());
    this.taskList.forEach(taskone => {
      if (taskone.id === id) {
        if (taskone.start === 1) {
          taskone.start = 0;
        } else {
          taskone.start = 1;
        }
      }
    });
    const task = this.taskList.filter(taskone => taskone.id === id);
    console.log(task);
    this.store.dispatch(new TaskEditSuccessAction(task[0]));
  }


  // getTaskDeleting(): Observable<boolean> {
  //   return this.store.pipe(select(getTasksDeleting));
  // }
}
