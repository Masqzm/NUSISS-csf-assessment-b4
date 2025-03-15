import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem, Product} from '../models';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)

  @Input({ required: true })
  product!: Product

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.product.prodId,
      quantity: this.form.value['quantity'],
      name: this.product.name,
      price: this.product.discountPrice       // current price after discount
    }

    // add to store
    this.cartStore.addLineItem(lineItem)

    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}
