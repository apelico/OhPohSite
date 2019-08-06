import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  @Output() File: EventEmitter<any> = new EventEmitter();
  @Output() Text: EventEmitter<string> = new EventEmitter();

  message: string;
  constructor() { }

  ngOnInit() {
  }

  SubmitMessage(){
    this.Text.emit(this.message);
    this.message = '';
  }

  uploadFile(file : any){
    this.File.emit(file);
  }

}
