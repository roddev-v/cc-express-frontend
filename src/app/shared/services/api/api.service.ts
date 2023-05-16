import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient
  ) { }

  async getUrls(): Promise<any> {
    // TODO for testing purpose
    return [
      {
        "id": 1,
        "longUrl": "https://www.example.com/abcdef",
        "shortUrl": "abc"
      },
      {
        "id": 2,
        "longUrl": "https://www.example.com/ghijkl",
        "shortUrl": "def"
      },
      {
        "id": 3,
        "longUrl": "https://www.example.com/mnopqr",
        "shortUrl": "ghi"
      },
      {
        "id": 4,
        "longUrl": "https://www.example.com/stuvwx",
        "shortUrl": "jkl"
      },
      {
        "id": 5,
        "longUrl": "https://www.example.com/yz1234",
        "shortUrl": "mno"
      }
    ];
    return await this.http.get(`${environment.apiUrl}/url/all`).toPromise();
  }

  async createUrl(url: string): Promise<any> {
    return await this.http.post(`${environment.apiUrl}/url/url`, {url}).toPromise();
  }

  async getRedirect(urlCode: string): Promise<any> {
    return {longUrl: 'https://www.google.com'}
    return await this.http.get(`${environment.apiUrl}/url/${urlCode}`).toPromise();
  }
}
