import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { CartApiActions } from 'src/store/cart/cart.actions';
import { FavouriteApiActions } from 'src/store/favourites/favourites.actions';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe?: Irecipe;
  @Input() showCatagory: boolean = true;

  @Output() viewEvent = new EventEmitter();

  constructor(private store: Store) {}

  addToCart(recipeId: string) {
    this.store.dispatch(
      CartApiActions.addToCartRequest({ recipeId: recipeId }),
    );
  }

  addToFavourites(recipeId: string) {
    this.store.dispatch(
      FavouriteApiActions.addToFavouritesRequest({ recipeId }),
    );
  }

  onView(recipe_id: string) {
    this.viewEvent.emit(recipe_id);
  }
}
