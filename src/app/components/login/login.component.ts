import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../shared/services/notification/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  tabSelectedIndex!: number;

  matchPasswords: ValidatorFn = (control): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordCheck = control.get('passwordCheck')?.value;

    if (password !== passwordCheck) {
      control.get('passwordCheck')?.setErrors({'password-dont-match': true})
    }
    return null;
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(8), Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  });

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(8), Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    passwordCheck: new FormControl('', [Validators.required])
  }, {validators: this.matchPasswords});


  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.authService.removeToken();
  }

  async onLogin(): Promise<void> {
    const {username, password} = this.loginForm.value;
    this.authService.login(username, password).catch((response: HttpErrorResponse) => {
      const error = response.error.message;
      this.loginForm.setErrors({[error]: true});
    });
  }

  onTabChange() {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  async onRegister(): Promise<void> {
    const {username, password} = this.registerForm.value;
    this.authService.register(username, password).then(() => {
      this.registerForm.reset();
      this.registerForm.markAllAsTouched();
      this.registerForm.markAsPristine();
      this.registerForm.updateValueAndValidity();
      this.notificationService.showNotification('Registered successfully!');
      this.tabSelectedIndex = 0;
    }).catch((response: HttpErrorResponse) => {
      const error = response.error.message;
      this.registerForm.get('username')?.setErrors({[error]: true});
    });
  }
}
