import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes.module';
import {NavbarComponent} from "./navbar/navbar.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {HomeComponent} from "./home/home.component";
import {BalanceComponent} from "./balance/balance.component";
import {CreateWalletComponent} from "./createWallet/createWallet.component";
import {BlockComponent} from "./block/block.component";
import {RefundComponent} from "./refund/refund.component";
import {AddCoinsComponent} from "./addCoins/add.coins.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AddCardComponent} from "./addCard/add.card.component";
import {BarComponent} from "./bar/bar.component";
import {MaterialModule} from "./material.module";
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./services/authguard.service";
import {UserService} from "./services/user.service";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ToolbarComponent,
        HomeComponent,
        BalanceComponent,
        CreateWalletComponent,
        BlockComponent,
        RefundComponent,
        AddCoinsComponent,
        LoginComponent,
        RegisterComponent,
        AddCardComponent,
        BarComponent,
        AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,],
    providers: [
        StatusBar,
        SplashScreen,
        AuthGuard,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
