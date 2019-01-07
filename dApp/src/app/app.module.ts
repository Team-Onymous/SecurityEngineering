import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { BlockComponent } from './block/block.component';
import { AddCoinsComponent } from './addCoins/add.coins.component';
import { RefundComponent } from './refund/refund.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddCardComponent } from './addCard/add.card.component';
import { MaterialModule } from './material.module';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/authguard.service';

import { AppComponent } from './app.component';
import { MetaModule } from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {BarComponent} from "./bar/bar.component";
import {Web3Service} from "./util/web3.service";



@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent,
    HomeComponent,
    BlockComponent,
    RefundComponent,
    AddCoinsComponent,
    LoginComponent,
    RegisterComponent,
    AddCardComponent,
    BarComponent,
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // MetaModule
  ],
  providers: [
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
