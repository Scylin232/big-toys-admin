import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService {
  constructor(private http: HttpClient) {
  }

  data: any = [];

  getData() {
    return this.http.get('http://localhost:4615/places').toPromise()
      .then(res => this.data = res);
  }
}
