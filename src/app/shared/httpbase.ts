import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class HttpBase {
  httpClient = inject(HttpClient);

  //baseUrl = 'https://jsonplaceholder.typicode.com';
  baseUrl = 'https://todolisttec-default-rtdb.europe-west1.firebasedatabase.app';

  baseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
}
