import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.scss'],
})
export class SearchComponent {
  constructor (private http: HttpClient) {}

  responseMessage: string;

  updateEasyPay(login: string, password: string) {
    if (login.trim() && password.trim()) {
      return this.http.post<any>('http://localhost:4515/setCredentials', {}, {
        params: { login: login, password: password },
        responseType: 'blob' as 'json',
      }).subscribe(() => {
        this.responseMessage = '✅ Новые данные применены корректно!';
      });
    }
    this.responseMessage = '❌ Одно из полей отсутвует! Пожалуйста, убедитесь, что всё заполнено корректно.';
  }
}
