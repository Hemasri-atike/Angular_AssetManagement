import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-requester-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './requester-dashboard.html',
  styleUrl: './requester-dashboard.css'
})
export class RequesterDashboardComponent {
  myAssets = [
    { name: 'MacBook Pro 14"', serial: 'APP-LT-9421', date: 'Oct 2023', status: 'Active', icon: 'laptop_mac' },
    { name: 'Dell 27" 4K Monitor', serial: 'DEL-MN-0042', date: 'Jan 2024', status: 'Active', icon: 'desktop_windows' }
  ];

  pendingRequests = [
    { type: 'iPhone 15 Pro', date: '2 days ago', stage: 'HOD Approval', color: 'blue' }
  ];

  quickActions = [
    { label: 'Request Asset', icon: 'add_shopping_cart', path: '/user/assets/request-access' },
    { label: 'Asset Return', icon: 'keyboard_return', path: '/user/assets/asset-return' },
    { label: 'Location Transfer', icon: 'location_on', path: '/user/assets/location-transfer' },
    { label: 'Chat Support', icon: 'chat', path: '/user/chatbot' }
  ];
}
