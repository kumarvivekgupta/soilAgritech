import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITask} from '../models/task';

@Injectable()
export class FetchTasksService {
  private currentModule$    = new BehaviorSubject<ITask[]>([]);
  private currentModuleObs$ = this.currentModule$.asObservable();

  taskList(): Observable<ITask[]> {
    this.currentModule$.next(tasks);
    return  this.currentModuleObs$;
  }
}

const tasks: ITask[] = [
  {
    id      : 1,
    name    : 'Test1',
    date    : new Date(),
    start   : 1,
    completed: 0
  },
  {
    id      : 2,
    name    : 'Test2',
    date    : new Date(),
    start   : 1,
    completed: 1
  },
  {
    id      : 3,
    name    : 'Test3',
    date    : new Date(),
    start   : 0,
    completed: 0
  },
  {
    id      : 4,
    name    : 'Test4',
    date    : new Date(),
    start   : 0,
    completed: 0
  }
];
