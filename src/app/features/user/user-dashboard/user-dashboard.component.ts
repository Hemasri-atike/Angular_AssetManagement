import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { RequesterDashboardComponent } from '../dashboards/requester/requester-dashboard';
import { ApproverDashboardComponent } from '../dashboards/approver/approver-dashboard';
import { AuditorDashboardComponent } from '../dashboards/auditor/auditor-dashboard';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    RequesterDashboardComponent, 
    ApproverDashboardComponent, 
    AuditorDashboardComponent
  ],
  template: `
    <div [ngSwitch]="currentRole">
      <app-requester-dashboard *ngSwitchCase="'Requester'"></app-requester-dashboard>
      <app-approver-dashboard *ngSwitchCase="'Approver'"></app-approver-dashboard>
      <app-auditor-dashboard *ngSwitchCase="'Auditor'"></app-auditor-dashboard>
      <!-- Default to Requester -->
      <app-requester-dashboard *ngSwitchDefault></app-requester-dashboard>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  currentRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.currentRole = role || '';
    });
  }
}
