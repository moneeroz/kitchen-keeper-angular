import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { CartApiActions } from 'src/store/cart/cart.actions';
import { FavouriteApiActions } from 'src/store/favourites/favourites.actions';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe_id: string | null = '';
  recipe?: Irecipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit() {
    this.recipe_id = this.route.snapshot.paramMap.get('recipe_id');

    this.recipeService.getRecipe(this.recipe_id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log(this.recipe);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
}
