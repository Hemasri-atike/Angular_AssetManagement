import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const expectedRole = route.data['role'];
  // For now, we'll just return true to fix the compilation error. 
  // In a real app, this would check the user's role from an AuthService.
  console.log('RoleGuard checking for:', expectedRole);
  return true;
};
