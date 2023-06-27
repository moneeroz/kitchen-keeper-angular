import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FavouriteApiActions } from 'src/store/favourites/favourites.actions';
import { selectFavouriteItems } from 'src/store/favourites/favourites.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  items$ = this.store.select(selectFavouriteItems);
  constructor(private router: Router, private store: Store<IappState>) {}

  ngOnInit() {
    this.store.dispatch(FavouriteApiActions.getFavouritesRequest());
  }

  onView(recipe_id: string) {
    console.log(recipe_id);
    this.router.navigate(['recipe', recipe_id]);
  }
}
