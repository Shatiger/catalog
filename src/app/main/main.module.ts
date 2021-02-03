import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CatalogModule } from './catalog/catalog.module';

@NgModule({
  imports: [CommonModule, CatalogModule],
  declarations: [MainComponent],
})
export class MainModule {}
