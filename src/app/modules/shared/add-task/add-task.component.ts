import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {DashboardRootState, getTasks} from '../../dashboard/reducers';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

@Component({
  selector   : 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls  : ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;
  completedStatus = ['open', 'closed'];
  id: number;

  constructor(private route: ActivatedRoute, private store: Store<DashboardRootState>) {
    this.id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.form = new FormGroup({
      name     : new FormControl('', Validators.required),
      date     : new FormControl(''),
      completed: new FormControl('')
    });

    if (!!this.id) {
      const tasklist = this.store.pipe(select(getTasks));
      console.log(tasklist);
      // this.form.setValue({
      //   name:
      // });
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
    console.log('entry');

  }


}
