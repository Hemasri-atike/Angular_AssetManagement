import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  userId = '';
  password = '';
  showPassword = false;
  selectedRole = 'Requester';

  roles = [
    'Requester',
    'Auditor',
    'Approver',
    'Admin',
    'IT-Admin',
    'HR Admin'
  ];

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.userId || !this.password) {
      alert('Please enter both User ID and Password');
      return;
    }

    // Save selected role to local storage
    localStorage.setItem('userRole', this.selectedRole);
    
    // In a real app, you'd verify credentials here.
    // Redirection logic based on role:
    const path = this.selectedRole.toLowerCase();
    this.router.navigate([`/${path}`]);
  }

  onDownload() {
    console.log('Download clicked');
    // Implement download logic if needed
  }
}
