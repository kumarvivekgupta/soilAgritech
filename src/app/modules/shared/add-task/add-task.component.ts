import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardRootState, getTasks, getTasksResults} from '../../dashboard/reducers';
import {map, takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {ITask} from '../../core/models/task';
import {
  TaskAddRequestAction,
  TaskAddSuccessAction,
  TaskEditRequestAction,
  TaskEditSuccessAction
} from '../../dashboard/actions/task.action';

@Component({
  selector   : 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls  : ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;
  completedStatus = ['open', 'closed'];
  id: number;
  count: number;

  constructor(private route: ActivatedRoute, private store: Store<DashboardRootState>,
              private router: Router) {
    this.id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.form = new FormGroup({
      name     : new FormControl('', Validators.required),
      date     : new FormControl(''),
      completed: new FormControl(''),
      star     : new FormControl(false),
      // Not added when api will be provided
      id       : new FormControl('')
    });

    if (!!this.id) {
      this.store.select(getTasks).pipe().subscribe((res) => {

        let newTask: ITask;
        res.map(task => {
          if (task.id === this.id) {
            newTask = task;
          }
        });
        this.form.setValue({
          name     : newTask.name,
          date     : new Date(newTask.date),
          completed: newTask.complete === true ? 'closed' : 'open',
          star     : newTask.start,
          id       : newTask.id
        });
      });

    }
  }

  dateFromFilter = (d: Date): boolean => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return d.getTime() < (date.getTime());
  };

  selectDateTo(event: Date) {
    this.form.patchValue({date: event});
  }

  onSubmit() {

    if (this.form.getRawValue()['completed'] === 'open') {
      this.form.patchValue({
        completed: 'false'
      });
    } else {
      this.form.patchValue({
        completed: 'true'
      });
      console.log(this.form.getRawValue());
    }
    if (!!this.id) {

      this.store.dispatch(new TaskEditRequestAction());
      this.store.dispatch(new TaskEditSuccessAction(this.form.getRawValue() as ITask));
    } else {
      this.store.pipe(select(getTasksResults), map(res => res.length)).subscribe((r) => {
        console.log(r);
        this.form.patchValue({
          id: r + 2
        });
      });
      this.store.dispatch(new TaskAddRequestAction());
      this.store.dispatch(new TaskAddSuccessAction(this.form.getRawValue() as ITask));
    }
     this.router.navigateByUrl('dashboard/tasks');

  }


}
