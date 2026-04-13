import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hr-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './hr-admin-dashboard.html',
  styleUrl: './hr-admin-dashboard.css'
})
export class HrAdminDashboardComponent {
  metrics = [
    { label: 'Total Employees', count: '842', icon: 'groups', sub: '+14 new this month' },
    { label: 'Asset Density', count: '1.4', icon: 'devices', sub: 'Devices per user' },
    { label: 'Onboarding', count: '12', icon: 'person_add', sub: 'Pending allocation' },
    { label: 'Offboarding', count: '5', icon: 'person_remove', sub: 'Pending return' }
  ];

  departments = [
    { name: 'Engineering', employees: 320, assets: 450, health: 94 },
    { name: 'Marketing', employees: 85, assets: 110, health: 88 },
    { name: 'Sales', employees: 140, assets: 180, health: 92 },
    { name: 'Operations', employees: 210, assets: 240, health: 96 },
    { name: 'Support', employees: 87, assets: 95, health: 85 }
  ];
}
