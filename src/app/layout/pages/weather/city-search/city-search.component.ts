import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  @Output() city: EventEmitter<any> = new EventEmitter();

  cityName: string;

  constructor() { }

  ngOnInit() {
  }

  //Emits the cityName and resets the input value
  onSubmit(){
    this.city.emit(this.cityName);
    this.cityName = "";
  }

}
