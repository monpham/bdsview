import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Message} from '../model/message';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

const SOCKET_API = environment.apiEndpoint + '/api/socket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private httpClient: HttpClient) {
  }

  post(data: Message): any {
    console.log(data);
    return this.httpClient.post(SOCKET_API, data);
  }
}
