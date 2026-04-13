import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule)
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  },

  {
    path: 'it-admin',
    loadChildren: () =>
      import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [authGuard, roleGuard],
    data: { role: 'it-admin' }
  },

  {
    path: 'hr-admin',
    loadChildren: () =>
      import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [authGuard, roleGuard],
    data: { role: 'hr-admin' }
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user-module').then(m => m.UserModule),
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' }
  },

  {
    path: 'requester',
    loadChildren: () =>
      import('./features/user/user-module').then(m => m.UserModule),
    canActivate: [authGuard, roleGuard],
    data: { role: 'requester' }
  },

  {
    path: 'auditor',
    loadChildren: () =>
      import('./features/user/user-module').then(m => m.UserModule),
    canActivate: [authGuard, roleGuard],
    data: { role: 'auditor' }
  },

  {
    path: 'approver',
    loadChildren: () =>
      import('./features/user/user-module').then(m => m.UserModule),
    canActivate: [authGuard, roleGuard],
    data: { role: 'approver' }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];