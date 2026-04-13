import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() variant: 'primary' | 'secondary' | 'accent' | 'dark' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() class: string = '';

  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.btnClick.emit();
    }
  }
}
