import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isEditing = false;
  user = 'User';
  role = 'Role';
  email = '';

  profileData = {
    firstName: '',
    lastName: '',
    employer: 'Neemus Software Solutions',
    employeeId: 'EMP001',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    email: '',
    role: ''
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.user = localStorage.getItem('userRole') || 'User';
    this.role = localStorage.getItem('userRole') || 'User';
    this.email = localStorage.getItem('email') || `${this.user.toLowerCase()}@neemus.com`;
    
    this.profileData.firstName = this.user;
    this.profileData.role = this.role;
    this.profileData.email = this.email;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    localStorage.setItem('email', this.email);
    this.profileData.email = this.email;
    this.isEditing = false;
    alert("Profile updated successfully! ✅");
  }

  openChangePassword() {
    this.dialog.open(PasswordComponent, {
      width: '450px',
      panelClass: 'custom-dialog-container'
    });
  }
}
