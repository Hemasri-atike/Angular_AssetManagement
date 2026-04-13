import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-approver-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './approver-dashboard.html',
  styleUrl: './approver-dashboard.css'
})
export class ApproverDashboardComponent {
  queues = [
    { label: 'Allocation', count: 12, icon: 'add_task', color: 'blue' },
    { label: 'Transfers', count: 5, icon: 'swap_horiz', color: 'purple' },
    { label: 'Returns', count: 3, icon: 'keyboard_return', color: 'orange' }
  ];

  criticalRequests = [
    { id: 'REQ-942', user: 'Rahul Sharma', asset: 'MacBook Pro 14"', date: 'Oct 24, 2023', priority: 'High' },
    { id: 'REQ-943', user: 'Sneha Patil', asset: 'Dell Monitor 27"', date: 'Oct 25, 2023', priority: 'Medium' }
  ];
}
