import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import {Observable} from 'rxjs';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService{
  //Gets newest message from server
  message = this.socket.fromEvent<Message>('message');

  constructor(private socket: Socket, private http: HttpClient) { }

  getNewMessage(){
    return this.message;
  }

  //Sends data to the server using Socket.io
  newMessage(username: string,message: string, isURL: boolean) {
    //Does not send to server if message is empty
    if(message == undefined || message === "")
      return;

    //Sets username to anonymous if empty
    if(username === undefined || username === ""){
      username = "anonymous";
    }

    if(message.includes("*/")){
      this.socket.emit('commands', { username: username, message: message});
      return;
    }
    //Submits message to server
    this.socket.emit('addMessage', { username: username, message: message, isURL: isURL });
  }

  newPicture(username: string,imgURL: any) {
    //Sets username to anonymous if empty
    if(username === undefined || username === ""){
      username = "anonymous";
    }
    //Submits message to server
    this.socket.emit('addMessage', { username: username, isURL: false, isImage: true, imageURL: imgURL});
  }

  //Gets current message database from server.
  getMessages():Observable<Message[]> {
    return this.http.get<Message[]>('/getMessages');
  }
}
