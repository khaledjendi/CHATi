import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() public message: Message
  email: string;
  username: string;
  msgContent: string;
  time: string;


  constructor() { }

  ngOnInit(message = this.message) {
    this.msgContent = message.message;
    this.username = message.username;
    this.email = message.email;
    this.time = message.time;
  }

}
