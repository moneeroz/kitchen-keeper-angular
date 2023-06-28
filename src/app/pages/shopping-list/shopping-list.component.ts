import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartApiActions } from 'src/store/cart/cart.actions';
import { selectCartItems } from 'src/store/cart/cart.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  items$ = this.store.select(selectCartItems);

  activeAccordion: number | null = null;
  accordionHeight: number[] = [];

  constructor(private store: Store<IappState>) {
    this.store.dispatch(CartApiActions.getCartRequest());
  }

  ngOnInit() {}

  deleteFromCart(recipeId: string) {
    this.store.dispatch(CartApiActions.removeFromCartRequest({ recipeId }));
  }

  emptyCart() {
    this.store.dispatch(CartApiActions.emptyCartRequest());
  }
}
