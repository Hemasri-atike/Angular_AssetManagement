import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ItAdminDashboardComponent } from '../dashboards/it-admin/it-admin-dashboard';
import { HrAdminDashboardComponent } from '../dashboards/hr-admin/hr-admin-dashboard';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    ItAdminDashboardComponent, 
    HrAdminDashboardComponent
  ],
  template: `
    <div [ngSwitch]="currentRole">
      <app-it-admin-dashboard *ngSwitchCase="'IT-Admin'"></app-it-admin-dashboard>
      <app-hr-admin-dashboard *ngSwitchCase="'HR Admin'"></app-hr-admin-dashboard>
      <!-- Default to IT Admin for generic Admin role -->
      <app-it-admin-dashboard *ngSwitchDefault></app-it-admin-dashboard>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  currentRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.currentRole = role || '';
    });
  }
}
