import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/store/auth/auth.actions';
import {
  selectIsLoggedIn,
  selectUserName,
} from 'src/store/auth/auth.selectors';
import { selectCartItemCount } from 'src/store/cart/cart.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  itemCount$ = this.store.select(selectCartItemCount);
  userName$ = this.store.select(selectUserName);

  constructor(private store: Store<IappState>, private router: Router) {}

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.store.dispatch(AuthActions.logoutSuccess());
  }
}
