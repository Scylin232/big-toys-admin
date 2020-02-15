import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-typography',
  styleUrls: ['./typography.component.scss'],
  templateUrl: './typography.component.html',
})
export class TypographyComponent {
  statisticObject = {};

  constructor(private http: HttpClient) {
    this.http.get<any>('http://95.179.132.10:4615/statistics').subscribe(res => {
      this.statisticObject = res;
    });
  }
}
