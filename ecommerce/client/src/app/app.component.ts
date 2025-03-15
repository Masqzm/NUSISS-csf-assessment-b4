import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)

  itemCount!: number

  ngOnInit(): void {
    this.itemCount = 0  // TO DO: get count from cart.store instead
  }

  checkout(): void {
    if(this.itemCount == 0)
      alert('No items in cart. Cannot checkout')
    else
      this.router.navigate([ '/checkout' ])
  }
}
