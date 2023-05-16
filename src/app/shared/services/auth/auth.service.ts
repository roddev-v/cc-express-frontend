import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private username: string | null = null;

  tokenChecked = false;
  tokenCheckedSubject: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    const token = this.cookieService.get('cc-url-shortener-token');
    if (token.length === 0) {
      this.tokenChecked = true;
      this.tokenCheckedSubject.next();
    }
  }

  getUsername(): string {
    return this.username ? this.username : '';
  }

  removeToken(): void {
    this.token = null;
    this.cookieService.delete('cc-url-shortener-token');
    this.cookieService.delete('cc-url-shortener-username');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getAccessToken(): string {
    if (!this.token) {
      throw 'Fatal error';
    }

    return this.token;
  }

  private setToken(token: string, username: string): void {
    this.token = token;
    this.username = username;
    this.cookieService.set('cc-url-shortener-token', token);
    this.cookieService.set('cc-url-shortener-username', username);
  }

  async login(username: string, password: string): Promise<void> {
    const body = {
      email: username,
      password
    }
    const result: any = await this.http.post(`${environment.apiUrl}/identity/login`, body).toPromise();
    this.setToken(result.accessToken, username);
    this.router.navigateByUrl('main');
  }

  async register(username: string, password: string): Promise<void> {
    const body = {
      email: username,
      password
    }
    await this.http.post(`${environment.apiUrl}/identity/register`, body).toPromise();
  }

  logout(): void {
    this.removeToken();
    this.router.navigateByUrl('login');
  }
}
