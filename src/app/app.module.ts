import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
     UserModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule
    , AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
