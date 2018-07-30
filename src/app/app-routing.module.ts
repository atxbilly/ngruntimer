import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentCanDeactivate, PendingChangesGuard } from './guard';


import { MainwindowComponent } from './mainwindow/mainwindow.component';
const routes: Routes = [
  {path: '', redirectTo: '/mainwindow', pathMatch: 'full', canDeactivate: [PendingChangesGuard], runGuardsAndResolvers: 'always'},
  {path: 'mainwindow', component: MainwindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
