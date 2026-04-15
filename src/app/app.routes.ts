import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule)
  },

  // Authenticated Routes wrapped in the Main Layout Shell
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: 'profile', 
        loadComponent: () => import('./features/user/profile/profile.component').then(m => m.ProfileComponent) 
      },

      // ✅ OVERVIEW GRID ROUTE - Added for Admin only
      {
        path: 'overview-grid',
        loadComponent: () => import('./shared/overview-grid/overview-grid')
                             .then(m => m.OverviewGridComponent),
        canActivate: [roleGuard],
        data: { role: 'admin' }          // ← This restricts it to Admin only
      },

      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin-module').then(m => m.AdminModule),
        canActivate: [roleGuard],
        data: { role: 'admin' }
      },
      {
        path: 'it-admin',
        loadChildren: () =>
          import('./features/admin/admin-module').then(m => m.AdminModule),
        canActivate: [roleGuard],
        data: { role: 'it-admin' }
      },
      {
        path: 'hr-admin',
        loadChildren: () =>
          import('./features/admin/admin-module').then(m => m.AdminModule),
        canActivate: [roleGuard],
        data: { role: 'hr-admin' }
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./features/user/user-module').then(m => m.UserModule),
        canActivate: [roleGuard],
        data: { role: 'user' }
      },
      {
        path: 'requester',
        loadChildren: () =>
          import('./features/user/user-module').then(m => m.UserModule),
        canActivate: [roleGuard],
        data: { role: 'requester' }
      },
      {
        path: 'auditor',
        loadChildren: () =>
          import('./features/user/user-module').then(m => m.UserModule),
        canActivate: [roleGuard],
        data: { role: 'auditor' }
      },
      {
        path: 'approver',
        loadChildren: () =>
          import('./features/user/user-module').then(m => m.UserModule),
        canActivate: [roleGuard],
        data: { role: 'approver' }
      },
      {
        path: 'ai-chatbot',
        loadComponent: () => import('./features/chatbot/chatbot.component').then(m => m.ChatbotComponent)
      },
      { path: 'dashboard', redirectTo: 'user', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];