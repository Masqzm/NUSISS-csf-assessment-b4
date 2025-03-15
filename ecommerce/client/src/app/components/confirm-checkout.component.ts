import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { Cart, Order } from '../models';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy {
  // Task 3
  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)
  private productSvc = inject(ProductService)
  private router = inject(Router)

  form!: FormGroup

  cart$!: Observable<Cart>
  cartTotalPrice$!: Observable<number>

  orderSub$!: Subscription
  
  ngOnInit(): void {
    this.form = this.createForm()

    this.cart$ = this.cartStore.getCart$
    this.cartTotalPrice$ = this.cartStore.getCartTotalPrice$
  }

  ngOnDestroy(): void {
    this.orderSub$.unsubscribe()
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required ]),
      address: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
  }

  // async keyword needed for await (handles promise/observable returned by firstValueFrom - conversion to value)
  async placeOrder () {
    const formValue = this.form.value
    console.info('formValue: ', formValue)

    const order: Order = {
      name: formValue['name'],
      address: formValue['address'],
      priority: formValue['priority'],
      comments: formValue['comments'],
      cart: await firstValueFrom(this.cart$)
    }

    this.orderSub$ = this.productSvc.checkout(order).subscribe({
      next: (response) => {
        alert(`Order placed successfully!\n${JSON.stringify(response)}`)
        console.log('>>> response: ', response)
        this.cartStore.resetStore() // reset store
        this.router.navigate([''])  // navigate to view 0 (MainComponent)
      },
      
      error: (err) => alert(`Order failed!\nError:\n${JSON.stringify(err.error)}`),   // remain in current view
      // err.error used here as Angular's HttpClient handles errors by returning HttpErrorResponse obj

      complete: () => this.orderSub$.unsubscribe()
    }) 
  }
}
