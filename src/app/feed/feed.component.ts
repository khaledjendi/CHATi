import { Component, OnInit, OnChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service'
import { Message } from '../models/message.model';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('feed1') private feedElm: ElementRef;
  feed: Observable<Message[]>;
  constructor(private chat: ChatService) {

  }

  ngOnInit(): void {
    this.feed = this.chat.getMsgs().valueChanges();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.feed = this.chat.getMsgs().valueChanges();
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.feedElm.nativeElement.scrollTop = this.feedElm.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
