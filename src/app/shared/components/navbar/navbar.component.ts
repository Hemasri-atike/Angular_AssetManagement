import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

interface NavLink {
  name: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();

  profileOpen = false;
  mobileMenuOpen = false;
  currentPath = '';
  userRole = '';
  userName = 'User';
  userInitials = 'U';
  navLinks: NavLink[] = [];
  private authSub?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.urlAfterRedirects;
    });
  }

  ngOnInit() {
    this.authSub = this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      this.updateNavbarConfig();
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  updateNavbarConfig() {
    if (!this.userRole) return;

    this.userName = `${this.userRole} User`;
    this.userInitials = this.userRole.charAt(0).toUpperCase();

    const role = this.userRole.toLowerCase();

    // Map Navbar Links based on Role
    if (role.includes('admin')) {
      this.navLinks = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Assets', path: '/admin/assets/list' },
        { name: 'Masters', path: '/admin/assign-role' },
        { name: 'Reports', path: '/admin/AssetReports' },
      ];
    } else {
      // For Requester, Approver, Auditor
      this.navLinks = [
        { name: 'Dashboard', path: '/user' },
        { name: 'My Assets', path: '/user/allocatedassets' },
        { name: 'Requests', path: '/user/history' },
        { name: 'Chatbot', path: '/user/chatbot' },
      ];
    }
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleProfile() {
    this.profileOpen = !this.profileOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.profileOpen = false;
  }
}
