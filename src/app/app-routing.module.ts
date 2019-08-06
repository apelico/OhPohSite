import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent} from './Layout/pages/dashboard/dashboard.component';
import { WeatherComponent} from './Layout/pages/weather/weather.component';
import { PortfolioComponent} from './Layout/pages/portfolio/portfolio.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'portfolio', component: PortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
