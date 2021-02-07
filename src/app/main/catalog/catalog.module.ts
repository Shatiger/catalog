import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CardModule } from '../../components/card/card.module';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [CatalogComponent],
  exports: [CatalogComponent],
})
export class CatalogModule {}
