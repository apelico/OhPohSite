import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: '', options: {} };

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Nav Components
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { BodyComponent } from './layout/body/body.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
//Dashboard // Home
import { DashboardComponent } from './layout/pages/dashboard/dashboard.component';
//Portfolio
import { PortfolioComponent } from './layout/pages/portfolio/portfolio.component';
//Chat Components
import { ChatComponent } from './layout/pages/chatroom/chat/chat.component';
import { MessageComponent } from './layout/pages/chatroom/message/message.component';
import { UserInputComponent } from './layout/pages/chatroom/user-input/user-input.component';
//Weather Components
import { WeatherComponent } from './layout/pages/weather/weather/weather.component';
import { CurrentWeatherComponent } from './layout/pages/weather/current-weather/current-weather.component';
import { HourlyWeatherComponent } from './layout/pages/weather/hourly-weather/hourly-weather.component';
import { DailyWeatherComponent } from './layout/pages/weather/daily-weather/daily-weather.component';
import { CitySearchComponent } from './layout/pages/weather/city-search/city-search.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    SideBarComponent,
    DashboardComponent,
    PortfolioComponent,
    ChatComponent,
    MessageComponent,
    UserInputComponent,
    WeatherComponent,
    CurrentWeatherComponent,
    HourlyWeatherComponent,
    DailyWeatherComponent,
    CitySearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
