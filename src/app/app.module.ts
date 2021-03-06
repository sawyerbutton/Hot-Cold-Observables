import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ServiceTestComponent } from './service-test/service-test.component';
import { TestPipe } from './test.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ServiceTestComponent,
    TestPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
