import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../models/message.model';
import { AuthService } from '../services/auth.service';

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

  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.email;
    });
  }

  ngOnInit(message = this.message) {
    this.msgContent = message.message;
    this.username = message.username;
    this.email = message.email;
    this.time = message.time;
  }

}
