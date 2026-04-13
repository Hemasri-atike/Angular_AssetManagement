import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.userId || !this.password) {
      alert('Please enter both User ID and Password');
      return;
    }

    console.log('Login attempt with role:', this.selectedRole);

    // Save selected role via AuthService
    this.authService.setRole(this.selectedRole);

    // Explicit mapping to prevent URL segment errors like 'hr%20admin'
    const roleRouteMap: { [key: string]: string } = {
      'Requester': 'requester',
      'Auditor': 'auditor',
      'Approver': 'approver',
      'Admin': 'admin',
      'IT-Admin': 'it-admin',
      'HR Admin': 'hr-admin'
    };

    const path = roleRouteMap[this.selectedRole] || 'user';
    console.log('Navigating to path:', path);

    // In a real app, you'd verify credentials here.
    this.router.navigate([`/${path}`]);
  }

  onDownload() {
    console.log('Download clicked');
  }
}
