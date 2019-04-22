import { Component, OnInit, OnChanges } from '@angular/core';

import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service'
import { Message } from '../models/message.model';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<Message[]>;
  constructor(private chat: ChatService) { 

  }

  ngOnInit(): void {
    this.feed = this.chat.getMsgs().valueChanges();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.feed = this.chat.getMsgs().valueChanges();
  }

}
