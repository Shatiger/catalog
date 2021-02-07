import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CatalogModule } from './catalog/catalog.module';
import { MainRoutingModule } from './main-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, CatalogModule, MainRoutingModule, TranslateModule],
  declarations: [MainComponent],
})
export class MainModule {}
