import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import navona library
import { Navona } from 'ngx-navona';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Navona],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
