import { Injectable } from '@angular/core';

/**
 * Injectable, application-wide service for sending messages to be displayed in 'MessagesComponent' at the bottom of the screen. 
 * Injected MessageService into the HeroService. A message is displayed for example when HeroService fetches heroes successfully.
 * 
 * The service exposes its cache of messages and two methods:
 * - One to add() a message to the cache.
 * - Another to clear() the cache.
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message:string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
