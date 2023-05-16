import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async p => {
      if (p['shortUrl']) {
        await this.redirect(p['shortUrl']);
      }
    })
  }

  async redirect(shortUrl: string) {
    try {
      const res = await this.apiService.getRedirect(shortUrl);
      window.location.href = res.longUrl;
    } catch(e) {
      console.log(e);
    }
  }

}
