import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { BodyComponent } from './Layout/body/body.component';
import { SideBarComponent } from './Layout/side-bar/side-bar.component';

import { DashboardComponent } from './Layout/pages/dashboard/dashboard.component';
import { WeatherComponent } from './Layout/pages/weather/weather.component';
import { PortfolioComponent } from './Layout/pages/portfolio/portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    SideBarComponent,
    DashboardComponent,
    WeatherComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
