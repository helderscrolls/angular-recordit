import {
  Component,
  OnInit,
} from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthFrontService } from '@blueframework/auth-front';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  public formSignup: FormGroup;
  user;
  show: Boolean;

  constructor(
    private fb: FormBuilder,
    private authFrontService: AuthFrontService,
    private router: Router,
  ) {
    this.formSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        firstname: [
          null,
          Validators.compose([Validators.required])
        ],
        lastname: [
          null,
          Validators.compose([Validators.required])
        ],
        roles: [
          null,
          Validators.compose([Validators.required])
        ],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [null, Validators.required],
      }
    );
  }


  createUser() {
    this.authFrontService.register(this.user).subscribe(user => {
      this.user = user._id;
    });
  }

  onSubmit() {
    this.user = this.formSignup.value;
    this.createUser();
    this.router.navigate(['auth']);
  }

  password() {
    this.show = !this.show;
  }

  

}
