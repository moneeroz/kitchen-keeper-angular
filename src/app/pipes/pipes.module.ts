import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFilterPipe } from './custom-filter.pipe';

@NgModule({
  declarations: [CustomFilterPipe],
  imports: [CommonModule],
  exports: [CustomFilterPipe],
})
export class PipesModule {}
