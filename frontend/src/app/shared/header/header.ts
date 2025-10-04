import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  isMenuOpen = false;

  constructor(
    public authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Méthode utilitaire pour éviter les erreurs SSR
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}