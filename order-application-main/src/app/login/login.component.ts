import { Component } from '@angular/core';
import axios from 'axios';
import { IMethodHTTP, axiosRequest } from '../../utils/axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide: boolean = true;
  email: string = '';
  password: string = '';
  emailDef: string = 'user001@gmail.com';

  constructor(private router: Router, private toastr: ToastrService) {}
  async login() {
    try {
      const response = await axiosRequest(
        'api/v1/auth/login',
        IMethodHTTP.POST,
        {
          email: this.email,
          password: this.password,
        }
      );
      if (response.status === 201) {
        localStorage.setItem('user_info', JSON.stringify(response.data));
        window.location.href = '/';
        this.toastr.success(
          'Login Successfully',
          'Login Success - Now You Can Access System !'
        );
      } else {
        this.toastr.error(
          'Login Error',
          'Login Error - Incorrect Email or Password !'
        );
      }
    } catch (error) {
      console.log(error);
      this.toastr.error(
        'Login Error',
        'Login Error - Incorrect Email or Password !'
      );
    }
  }
}
