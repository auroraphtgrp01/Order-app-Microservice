import { Component } from '@angular/core';
import { IMethodHTTP, axiosRequest } from '../../utils/axios';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private toastr: ToastrService, private router: Router) {}
  username: string = '';
  email: string = '';
  password: string = '';
  hide: boolean = true;
  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    axiosRequest('/api/v1/auth/register', IMethodHTTP.POST, userData).then(
      (res) => {
        if (
          res.status === 201 &&
          res.data[0].register !=
            'User with provided email or username already exists.'
        ) {
          this.toastr.success('Register Success');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Register Failed - Username or Email is Exists !');
        }
      }
    );
  }
}
