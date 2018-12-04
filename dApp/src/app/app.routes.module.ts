/**
 * Created by bryan on 4-12-2018.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaSenderComponent } from './meta/meta-sender/meta-sender.component'
import {HomeComponent} from "./home/home.component";
import {AddCoinsComponent} from "./addCoins/add.coins.component";
import {RefundComponent} from "./refund/refund.component";
import {BlockComponent} from "./block/block.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'addcoins',  component: AddCoinsComponent },
  { path: 'refund',  component: RefundComponent },
  { path: 'block',  component: BlockComponent },
  { path: 'metaSender', component: MetaSenderComponent },
  { path: 'metasender', component: MetaSenderComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
