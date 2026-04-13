import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-it-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './it-admin-dashboard.html',
  styleUrl: './it-admin-dashboard.css'
})
export class ItAdminDashboardComponent {
  stats = [
    { label: 'Asset Utilization', value: '88%', trend: '+4%', icon: 'pie_chart', color: 'blue' },
    { label: 'Pending Allocations', value: '24', trend: 'High', icon: 'assignment_turned_in', color: 'purple' },
    { label: 'Out for Repair', value: '7', trend: '3 urgent', icon: 'build', color: 'orange' },
    { label: 'Total Inventory', value: '412', trend: '+12 new', icon: 'category', color: 'green' }
  ];

  recentLogs = [
    { action: 'Bulk Import', user: 'Admin User', time: '10 mins ago', status: 'Success' },
    { action: 'Asset Return', user: 'Rahul K.', time: '1h ago', status: 'Pending' },
    { action: 'New Allocation', user: 'Priya S.', time: '2h ago', status: 'Success' },
    { action: 'Repair Request', user: 'Amit M.', time: '5h ago', status: 'In Review' }
  ];
}
