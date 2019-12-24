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
import {map} from 'rxjs/operators';
import {select} from '@ngrx/store';
import {DeletePopupComponent} from '../../../../../shared/delete-popup/delete-popup.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {checkAndUpdateNode} from '@angular/core/src/view/view';
import {Observable} from 'rxjs';

@Component({
  selector   : 'app-tas-list',
  templateUrl: './task-list.component.html',
  styleUrls  : ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  columnNames = ['name', 'date', 'complete', 'importance', 'action'];
  taskList: ITask[];

  dataSource = new MatTableDataSource<ITask>();

  count: boolean;
  deleting: boolean;

  constructor(private fetchTasksService: FetchTasksService, private store: Store<DashboardRootState>,
              private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.pipe(select(getTasksLoaded)).subscribe((r) => {
      this.count    = r;
      this.taskList = [];
      console.log(r);
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
        taskone.start = !taskone.start;
      }
    });
    const task = this.taskList.filter(taskone => taskone.id === id);
    // console.log(task);
    this.store.dispatch(new TaskEditSuccessAction(task[0]));
  }

  delete(id: number) {

    // this.taskList = [];
    // this.store.select(getTasks).subscribe((res) => {
    //   res.map(task => this.taskList.push(task));
    // });

    // const ref = this.dialog.open(DeletePopupComponent, {
    //   data           : {
    //     'message'      : 'Do you want to delete task ',
    //     'okMessage'    : 'Yes',
    //     'cancelMessage': 'Cancel',
    //   }, disableClose: true, autoFocus: false, height: '32%', maxWidth: '50%'
    // });
    // ref.afterClosed().pipe().subscribe((r) => {
    //   if (r === 'ok') {
    //
    //
    //     this.changeDetectorRefs.detectChanges();
    //     this.taskList = [];
    //     this.store.select(getTasks).subscribe((res) => {
    //       res.map(task => this.taskList.push(task));
    //     });
    //
    //     this.dataSource.data = this.taskList;
    //
    //
    //   }
    // });
  }

  // getTaskDeleting(): Observable<boolean> {
  //   return this.store.pipe(select(getTasksDeleting));
  // }
}
