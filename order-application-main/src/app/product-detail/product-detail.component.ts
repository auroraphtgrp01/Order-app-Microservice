import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMethodHTTP, axiosRequest } from '../../utils/axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productInfo: any = {};
  productId: string | null = '';
  selectedVariant: any = null;
  totalPrice: number = 0;
  maxQuantity: number = 0;
  displayedColumns: string[] = [
    'index',
    'variant',
    'price',
    'quantities',
    'totalPrice',
  ];
  selectedVariantInputValue = 0;
  index = 0;
  ELEMENT_DATA: any[] = [];
  dataSource = this.ELEMENT_DATA;
  dataUser = localStorage.getItem('user_info');
  userInfo = {
    userId: JSON.parse(this.dataUser as string).id,
    username: JSON.parse(this.dataUser as string).username,
  };
  totalOrder = 0;

  constructor(private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    axiosRequest(`/api/v1/orders/product/${this.productId}`, IMethodHTTP.GET)
      .then((res) => {
        this.productInfo = res.data;
        this.selectedVariant = res.data.variants[0];
        this.maxQuantity = this.selectedVariant.quantities;
      })
      .catch((error) => {
        console.error('Error fetching product info:', error);
      });
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
    this.maxQuantity = variant.quantities;
  }

  calculateTotalPrice(event: any) {
    const quantity = event.target.value;
    if (quantity && this.selectedVariant) {
      if (quantity < 0 || quantity > this.selectedVariant.quantities) {
        return;
      }
      this.totalPrice = quantity * this.selectedVariant.price;
    } else {
      this.totalPrice = 0;
    }
  }

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(price);
  }

  buyNow() {
    const variants = this.ELEMENT_DATA.map((element) => ({
      id: element.id,
      quantities: element.quantities,
    }));
    const payload = {
      variants,
      userId: this.userInfo.userId,
    };
    axiosRequest('/api/v1/orders', IMethodHTTP.POST, payload)
      .then((res) => {
        this.toastr.success('ORDER SUCCESSFULLY !');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('ORDER ERROR !');
      });
    console.log(payload);
  }

  addToCard() {
    if (!this.selectedVariantInputValue) {
      this.toastr.error('NO VARIANT SELECTED !');
      return;
    }

    const existingVariantIndex = this.ELEMENT_DATA.findIndex(
      (item) => item.id === this.selectedVariant.id
    );

    const newQuantities =
      existingVariantIndex !== -1
        ? this.ELEMENT_DATA[existingVariantIndex].quantities +
          this.selectedVariantInputValue
        : this.selectedVariantInputValue;

    if (newQuantities > this.maxQuantity) {
      console.error('Quantities exceeds max quantity');
      this.toastr.error('QUANTITIES EXCEEDS MAX QUANTITY !');
      return;
    }

    if (existingVariantIndex !== -1) {
      this.ELEMENT_DATA[existingVariantIndex].quantities +=
        this.selectedVariantInputValue;
      this.ELEMENT_DATA[existingVariantIndex].totalPrice +=
        this.selectedVariantInputValue * this.selectedVariant.price;
    } else {
      const variant = {
        index: this.index++,
        product_id: this.productId,
        id: this.selectedVariant.id,
        quantities: this.selectedVariantInputValue,
        price: this.selectedVariant.price,
        totalPrice: this.selectedVariantInputValue * this.selectedVariant.price,
        variant: `${this.selectedVariant.color} - ${this.selectedVariant.type}`,
      };
      this.ELEMENT_DATA.push(variant);
    }

    const totalOrder = this.ELEMENT_DATA.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    this.totalOrder = totalOrder;
    this.dataSource = [...this.ELEMENT_DATA];
  }
}
