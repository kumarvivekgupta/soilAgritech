import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TaskListComponent} from '../../dashboard/modules/tasks/containers/task-list/task-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskDeleteRequestAction, TaskDeleteSuccessAction} from '../../dashboard/actions/task.action';
import {DashboardRootState} from '../../dashboard/reducers';
import {Store} from '@ngrx/store';

@Component({
  selector   : 'app-task-delete',
  templateUrl: './delete-popup.component.html',
  styleUrls  : ['./delete-popup.component.scss']
})
export class DeleteComponent {
  id: number;
  loading = false;


  constructor(private router: Router, private store: Store<DashboardRootState>, private route: ActivatedRoute) {
    this.id = +this.route.snapshot.params['id'];

  }



  delete() {
    this.store.dispatch(new TaskDeleteRequestAction());
    this.store.dispatch(new TaskDeleteSuccessAction(this.id));
    this.router.navigateByUrl('/dashboard/tasks');
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/tasks');
  }

}
