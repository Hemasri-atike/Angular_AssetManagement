import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auditor-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './auditor-dashboard.html',
  styleUrl: './auditor-dashboard.css'
})
export class AuditorDashboardComponent {
  auditStats = [
    { label: 'Active Audits', count: '3', icon: 'pending_actions', sub: 'In progress' },
    { label: 'Compliance', count: '94%', icon: 'verified', sub: '+2% vs last Q' },
    { label: 'Asset Covered', count: '1,204', icon: 'done_all', sub: 'Out of 1,284' },
    { label: 'Discrepancies', count: '14', icon: 'warning', sub: 'Action required' }
  ];

  recentAudits = [
    { name: 'Q3 Annual Audit', date: 'Sep 2023', progress: 100, status: 'Completed' },
    { name: 'IT Infrastructure Verify', date: 'Oct 2023', progress: 65, status: 'In Progress' }
  ];
}
