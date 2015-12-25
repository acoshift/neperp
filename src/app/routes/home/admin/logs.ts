import {
  Component,
  View,
} from 'angular2/core';

import {
  FORM_DIRECTIVES,
  CORE_DIRECTIVES,
  ControlGroup,
  FormBuilder,
  Validators,
} from 'angular2/common';

import {
  AuthService,
  DbService,
  NavbarService,
} from '../../../services';

import { Subject, Subscriber } from 'rxjs';

import { PaginationComponent, TableComponent } from '../../../components';

import _ = require('lodash');
import moment = require('moment');

import { LogsService } from '../../../services/admin';

import { Log } from '../../../models/admin';

import { TimestampPipe } from '../../../pipes/id';
import { MomentPipe } from '../../../pipes/moment';

import { ReversePipe, FilterPipe, RepeatPipe, PagePipe, CountPipe } from '../../../pipes/collection';

declare var $: any;

@Component({})
@View({
  template: require('./logs.jade'),
  styles: [ ],
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    PaginationComponent,
  ],
  pipes: [
    TimestampPipe,
    MomentPipe,
    ReversePipe,
    FilterPipe,
    RepeatPipe,
    PagePipe,
    CountPipe,
  ]
})
export class LogsRoute extends TableComponent {
  constructor(navbar: NavbarService,
              private logs: LogsService,
              private timestamp: TimestampPipe) {
    super();
    navbar.active('admin/logs');

    $('.ui.dropdown').dropdown();

    logs.observable().subscribe(r => {
      this.itemCount = r && r.length || 0;
      this.loading = r === null;
    });

    logs.refresh();
  }

  filter() {
    return x => {
      if (!this.search.keyword) return true;
      switch (this.search.field) {
        case '':
          return x.t.payload.sub.split('/')[0].indexOf(this.search.keyword) !== -1 ||
            x.q.method.indexOf(this.search.keyword) !== -1 ||
            x.q.name.indexOf(this.search.keyword) !== -1;
        case 'user':
          return x.t.payload.sub.split('/')[0].indexOf(this.search.keyword) !== -1;
        case 'method':
          return x.q.method.indexOf(this.search.keyword) !== -1;
        case 'collection':
          return x.q.name.indexOf(this.search.keyword) !== -1;
      }
      return false;
    };
  }
}
