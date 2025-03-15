import { inject, Injectable } from "@angular/core";
import { Cart, LineItem, Product } from "./models";
import { ComponentStore } from "@ngrx/component-store";
import { ProductService } from "./product.service";
import { firstValueFrom } from "rxjs";

// Cart store's slice (db)
// interface CartSlice {
//     cart: Cart
// }

// Init values for CartSlice
const INIT: Cart = {
    lineItems: []
}
// const INIT: CartSlice = {
//     cart: { lineItems: [] },
//     other things to store...
// }

// Use the following class to implement your store
@Injectable()
export class CartStore extends ComponentStore<Cart> {
    private productSvc = inject(ProductService)

    constructor() {
        // Init the store (initially store is empty)
        super(INIT)
    }

    resetStore() {
        this.setState(INIT)
    }

    // Mutators - update mtds
    // addLineItem(lineItem)
    readonly addLineItem = this.updater<LineItem>(      // updater<obj to be passed in to update>
        (slice: Cart, li: LineItem) => {
            console.info('adding to store: ', li)
            return {
                lineItems: [...slice.lineItems, li],
            } as Cart
        }
    )

    // Selectors (query)
    readonly getTotalProductsCount$ = this.select<number>(
        (slice: Cart) => {
            // Get all items id and create Set to remove dupl ids before counting
            const lineItemIds: string[] = slice.lineItems.map(item => item.name) 
            const distinctCount = new Set(lineItemIds).size

            return distinctCount
        }
    )

    readonly getCart$ = this.select<Cart>((slice: Cart) => slice)

    // readonly getCartTotalPrice$ = this.select<number>(
    //     (slice: Cart) => slice.lineItems.reduce((total, item) => total + item.price, 0) // 0 - init total (acc) value
    // )
    readonly getCartTotalPrice$ = this.select<number>(
        (slice: Cart) => slice.lineItems.reduce((total, item) => {
            total += item.price * item.quantity
            console.info('updated total: ', total)
            return total
        }, 0) // 0 - init total (acc) value
    )
}
