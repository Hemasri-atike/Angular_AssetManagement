import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-support-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './support-chat.component.html',
  styleUrl: './support-chat.component.css'
})
export class SupportChatComponent implements AfterViewChecked {
  @ViewChild('chatEnd') private chatEnd!: ElementRef;

  open = false;
  messages: Message[] = [];
  input = '';
  isTyping = false;

  constructor(private http: HttpClient) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.open = !this.open;
  }

  sendMessage() {
    if (!this.input.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: this.input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.messages.push(userMsg);
    const messageToSend = this.input;
    this.input = '';
    this.isTyping = true;

    this.http.post<any>('http://localhost:5000/chat', { message: messageToSend }).subscribe({
      next: (res) => {
        setTimeout(() => {
          const botMsg: Message = {
            sender: 'bot',
            text: res.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          this.messages.push(botMsg);
          this.isTyping = false;
        }, 1000);
      },
      error: (err) => {
        console.error('Chat error:', err);
        this.isTyping = false;
      }
    });
  }

  setQuickReply(text: string) {
    this.input = text;
    this.sendMessage();
  }

  private scrollToBottom(): void {
    try {
      if (this.open) {
        this.chatEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {}
  }
}
