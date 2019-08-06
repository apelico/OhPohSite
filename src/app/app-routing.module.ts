import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent} from './layout/pages/dashboard/dashboard.component';
import { WeatherComponent} from './layout/pages/weather/weather/weather.component';
import { PortfolioComponent} from './layout/pages/portfolio/portfolio.component';
import { ChatComponent} from './layout/pages/chatroom/chat/chat.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
