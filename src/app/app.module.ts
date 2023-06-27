import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appStoreModule } from 'src/store/appStoreModule';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { CustomFilterPipe } from './pipes/custom-filter.pipe';
import { PipesModule } from './pipes/pipes.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RecipesComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    RecipeCardComponent,
    CategoriesComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ...appStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
