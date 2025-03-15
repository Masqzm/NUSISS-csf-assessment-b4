import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {Observable, Subscription, tap} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)

  itemCount!: number

  productsSub!: Subscription

  ngOnInit(): void {
    this.productsSub = this.cartStore.getTotalProductsCount$.pipe(
      tap(v => this.itemCount = v)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe()
  }

  checkout(): void {
    if(this.itemCount <= 0)
      alert('No items in cart. Cannot checkout')
    else
      this.router.navigate([ '/checkout' ])
  }
}
