import {
  Component,
  View,
  FORM_DIRECTIVES,
} from 'angular2/angular2';

import {
  Router
} from 'angular2/router';

import {
  AuthService
} from '../../services';

@Component({ })
@View({
  directives: [FORM_DIRECTIVES],
  template: require('./login.html'),
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthService) {
    if (!auth.check()) return;
  }

  private form = {
    user: '',
    pwd: '',
    remember: false
  }

  login() {
    this.auth.login(this.form.user, this.form.pwd);
  }
}
