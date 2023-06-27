import { Iingredient } from './iingredient';
import { Irecipe } from './irecipe';

export interface IcartItem {
  userId: string;
  recipeId: string;
  createdAt: string;
  recipe: Irecipe;
  ingredients: Iingredient[];
  showIngredients: boolean;
}
