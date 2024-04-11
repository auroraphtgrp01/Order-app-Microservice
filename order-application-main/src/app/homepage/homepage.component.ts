import { Component, OnInit } from '@angular/core';
import { omit } from '@ngrx/store/src/utils';
import { IMethodHTTP, axiosRequest } from '../../utils/axios';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  products: any = [];
  ngOnInit(): void {
    axiosRequest('/api/v1/orders/product', IMethodHTTP.GET, {
      data: 'hello',
    }).then((res) => {
      this.products = res.data;
      console.log(this.products);
    });
  }
}
