import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  @Input() current: any;
  @Input() city: String;

  constructor() { }

  ngOnInit() {
    //Rounds all floats to int
    this.current["temperature"] = Math.ceil(this.current["temperature"]);
    this.current["apparentTemperature"] = Math.ceil(this.current["apparentTemperature"]);
    this.current["precipProbability"] = Math.ceil(this.current["precipProbability"] * 100);
    this.current["humidity"] = Math.ceil(this.current["humidity"] * 100);
  }

}
