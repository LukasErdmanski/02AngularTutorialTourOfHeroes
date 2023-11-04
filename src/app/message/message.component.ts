import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  /**
   * The messageService property must be public because the template is binded to it.
   * Angular only binds to public component properties.
   */
  constructor(public messageService: MessageService) {}
}
