import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service'
@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  msg: string;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  handleSubmit(event) {
    if(event.keyCode == 13) {
      this.send();
    }
  }

  send() {
    if(this.chatService.sendMsg(this.msg)) {
      this.msg = "";
    }
  }
}
