import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
//import {EmailValidator, EqualPasswordsValidator} from '../../@theme/validators';
import { ReactiveFormsModule, FormsModule, FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../@theme/validators';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CREATE_LINK_MUTATION_SIGNUP, CreateLinkMutationResponse } from '../../graphql';
import {UserService} from '../login/user.service';

@Component({
  selector: 'ngx-register',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  protected config: {};
  private user: any = {};
  public submitted: boolean = false;
  errors: string[];
  message: string = '';
  showMessages: any;
  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;


  constructor(fb: FormBuilder, private registerService: RegisterService, private router: Router, private apollo: Apollo,
    private userService: UserService) {

    //   this.form = fb.group({
    //     'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    //     'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
    //     'passwords': fb.group({
    //       'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    //       'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    //     }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    //   });

    //   this.name = this.form.controls['name'];
    //   this.email = this.form.controls['email'];
    //   this.passwords = <FormGroup> this.form.controls['passwords'];
    //   this.password = this.passwords.controls['password'];
    //   this.repeatPassword = this.passwords.controls['repeatPassword'];
    //  this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  ngOnInit() {
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
       //graphql
      var input = {
        email: values['email'],
        profilename: values['name'],
        password: values['passwords']['password']
      };
      this.apollo.mutate({
        mutation: CREATE_LINK_MUTATION_SIGNUP,
        variables: { input }
      }).subscribe((response) => {
      //  console.log("response" + JSON.stringify(response));
        var token = response['data']['signup']['token'];
        var loggedIn = true;
        this.userService.setProfileData(response['data']['signup']);
        localStorage.setItem('auth_token', token);
        this.router.navigate(['/pages/dashboard']);
      }, (error) => {
        console.log(error);
      });

    }
  }



}

