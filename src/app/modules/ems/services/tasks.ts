import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs';
import { DbService, ModelService } from '../../../services';
import { Task } from '../models/task';

@Injectable()
export class TasksService extends ModelService<Task> {
  constructor(db: DbService) {
    super(db, 'ems.tasks', {
      refresh: {
        _id: 1, code: 1, staff: 1, status: 1
      },
      read: {
        _id: 1, code: 1, staff: 1, status: 1, result: 1
      }
    });
  }

  preSubmit(item: Task) {
    if (!!item.staff) {
      item.$id = {
        staff: item.staff
      };
      delete item.staff;
    }
    return item;
  }
}
