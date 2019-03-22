import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';

const routes: Routes = [
  { path: '', component: BudgetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
