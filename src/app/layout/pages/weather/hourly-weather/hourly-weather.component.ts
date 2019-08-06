import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})

export class HourlyWeatherComponent implements OnInit {
  //All hourly json objects
  data: Object[] = [];
  @Input() hourly : any;

  constructor() {}

  ngOnInit() {
    //Loop for 12 hour forcast
    for(var i = 0; i < 12;i++)
    {
      //adds to data array
      this.data.push(this.hourly["data"][i]);
      // converts unix time to day;

      var hour = new Date(this.hourly["data"][i].time * 1000).getHours() + 1;
      this.data[i]["time"] = this.getTime(hour);

      //Rounds all floats to int
      this.data[i]["temperature"] = Math.ceil(this.data[i]["temperature"]);
      this.data[i]["precipProbability"] = Math.ceil(this.data[i]["precipProbability"] * 100);
    }
  }

  //Takes in a number and checks if its AM or PM
  getTime(hour: number){
    if(hour <= 12){
      return hour + " AM"
    }
    hour -= 12;
    return hour + " PM"
  }
}
