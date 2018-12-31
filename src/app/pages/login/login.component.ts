import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {Apollo} from 'apollo-angular';
import {CREATE_LINK_MUTATION_SIGNUP, CreateLinkMutationResponse, SIGN_IN_QUERY} from '../../graphql';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public message: string;

  constructor(fb: FormBuilder, private userService: UserService, private router: Router, private apollo: Apollo) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    console.log(values);
    if (this.form.valid) {

      var input = {
        email: values['email'],
        password: values['password']
      };
      this.apollo.watchQuery({
        query: SIGN_IN_QUERY,
        variables: {
          email: values['email'],
          password: values['password']
        }
      }).valueChanges.subscribe((response) => {
        localStorage.setItem('auth_token', response.data['userForLogin']['token']);
        //      this.authtoken.createAuthorizationHeader(res.token);
        //   var headers = new Headers({'Authorization': response.data['userForLogin']['token']});
        var loggedIn = true;
        this.router.navigate(['/pages/dashboard']);
        this.userService.setProfileData(response.data['userForLogin']);
        //    console.log(response);
      }, (error) => {
        this.message = "Please enter correct credentials."
        setTimeout(() => {
          this.message = '';
        }, 3000);
        console.log(error);
      });

    }
  }

}
