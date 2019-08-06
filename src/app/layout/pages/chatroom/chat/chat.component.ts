import { Component, OnInit } from '@angular/core';

import {MessageService} from '../message.service';
import {Message} from '../message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages : Message[];
  username: string;

  constructor(private messageService : MessageService) { }

  ngOnInit() {
    //Gets the database from the server.
    this.messageService.getMessages().subscribe(messages => {
      this.messages = messages["database"];
    });

    //Gets any new messages sent using Socket.IO
    this.messageService.getNewMessage().subscribe(newMessage => {
      //Keeps messages array count at 15
      this.messages.push(newMessage);
      this.messages.shift();

      this.moveToBottom();
    });
  }

  submitNewMessage(message: string){
    //Checks if the message contains a link. If true then displays a Image else displays text.
    if(this.isUrlCheck(message)){
      this.messageService.newMessage(this.username,message,true);
    }else{
      this.messageService.newMessage(this.username,message,false);
    }
    this.moveToBottom();
  }

  isUrlCheck(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var pattern = new RegExp(regex);
    return pattern.test(str);
  }


  uploadFile(files){
    if (files.length === 0)
      return;

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    //Sets the file to text so it can be saved to the database.
    reader.onload = (_event) => {
      this.messageService.newPicture(this.username,reader.result);
    }
    this.moveToBottom();
  }

  //Scrolls the page to the bottom of the screen.
  moveToBottom() {
    return new Promise(resolve => {
      setTimeout(() => {
        let d = document.querySelector('.chatRoom');
        if(d){
          d.scrollTop = d.scrollHeight;
        }
      }, 100);
    });
  }

}