/**
 * Created by bryan on 4-12-2018.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MetaSenderComponent } from './meta/meta-sender/meta-sender.component'
import {HomeComponent} from "./home/home.component";
import {AddCoinsComponent} from "./addCoins/add.coins.component";
import {RefundComponent} from "./refund/refund.component";
import {BlockComponent} from "./block/block.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AddCardComponent} from "./addCard/add.card.component";
import {BarComponent} from "./bar/bar.component";
import {AuthGuard} from "./services/authguard.service";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'addcoins',  component: AddCoinsComponent, canActivate: [AuthGuard] },
  { path: 'refund',  component: RefundComponent, canActivate: [AuthGuard] },
  { path: 'block',  component: BlockComponent, canActivate: [AuthGuard] },
  { path: 'login',  component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'addcard', component: AddCardComponent, canActivate: [AuthGuard]},
  { path: 'bar', component: BarComponent, canActivate: [AuthGuard]}
  // { path: 'metaSender', component: MetaSenderComponent },
  // { path: 'metasender', component: MetaSenderComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
