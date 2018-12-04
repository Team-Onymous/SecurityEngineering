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
import { MaterialModule } from './material.module';

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

@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent,
    HomeComponent,
    BlockComponent,
    RefundComponent,
    AddCoinsComponent,
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
    MetaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
