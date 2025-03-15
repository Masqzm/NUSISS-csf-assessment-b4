import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Order, Product} from "./models";

@Injectable()
export class ProductService {

  private http = inject(HttpClient)


  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/api/categories')
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/category/${category}`)
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  checkout(order: Order): Observable<any> {
    // Task 3
    console.info('order request: ', order)

    // Note: http requests are never sent until observable has been subscribed to!
    return this.http.post<any>('/api/order', order)
    // 200 OK response:   {"orderId": "<new order id>"}
    // 400 bad response:  {"message": "<error msg>"}
  }
}
