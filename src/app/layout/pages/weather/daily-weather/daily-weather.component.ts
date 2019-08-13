import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent implements OnInit {
  //all daily json objects;
  data: Object[] = [];
  @Input() daily: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
    //Loop for 7 day forcast
    for(var i = 0; i < 7;i++)
    {
      //adds to data array
      this.data.push(this.daily["data"][i+1]);
      // converts unix time to day;
      var date = new Date(this.daily["data"][i+1].time * 1000).getDay();
      this.data[i]["time"] = this.getDay(date);
      //Rounds all floats to int
      this.data[i]["temperatureHigh"] = Math.ceil(this.data[i]["temperatureHigh"]);
      this.data[i]["temperatureLow"] = Math.ceil(this.data[i]["temperatureLow"]);
      this.data[i]["precipProbability"] = Math.ceil(this.data[i]["precipProbability"] * 100);
    }
  }

  //Takes in a number and returns the day in a string
  getDay(day: number){
    switch(day){
      case 0:
      return "Sunday";
      case 1:
      return "Monday";
      case 2:
      return "Tuesday";
      case 3:
      return "Wednesday";
      case 4:
      return "Thursday";
      case 5:
      return "Friday";
      case 6:
      return "Saturday";
      default:
        return "Null";
    }
  }

}
