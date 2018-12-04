/**
 * Created by bryan on 4-12-2018.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaSenderComponent } from './meta/meta-sender/meta-sender.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: MetaSenderComponent },
  { path: 'metaSender', component: MetaSenderComponent },
  { path: 'metasender', component: MetaSenderComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
