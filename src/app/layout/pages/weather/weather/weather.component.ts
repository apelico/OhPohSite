import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  current: Object;
  daily: Object;
  hourly: Object;
  city: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

  }

  searchCity(city:string){
    if(city == undefined)
      return;
    this.weatherService.getWeather(city).subscribe(val => {
      if(val["error"]){
        alert("City does not exist.")
      }else{
      this.current = val["current"]
      this.daily = val["daily"]
      this.hourly = val["hourly"]
      this.city = val["city"].toUpperCase();
    }
    });
  }
}
