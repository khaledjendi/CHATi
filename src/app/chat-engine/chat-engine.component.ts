import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-chat-engine',
  templateUrl: './chat-engine.component.html',
  styleUrls: ['./chat-engine.component.scss']
})
export class ChatEngineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      adjustHeight();
      $(window).resize(
        function () {
          adjustHeight();
        });
        function adjustHeight() {
          $('#chat-engine').height($(window).height() - ($('header').outerHeight() + $('footer').outerHeight()));
          $('#feed').height($(window).height() - ($('header').outerHeight() + $('footer').outerHeight() + 20));
        }
    });
  }

}
