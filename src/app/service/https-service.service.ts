import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpRequest} from '@angular/common/http';
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import {any} from 'codelyzer/util/function';

let $: any = jQuery;

@Injectable({
  providedIn: 'root'
})
export class HttpsServiceService {

  constructor(private http: HttpClient) {
  }

  postReq(url, object): Observable<any> {
    const req = new HttpRequest('POST', url, object);
    this.showNotification('Thông báo', 'sucsfully!');
    return this.http.request(req);
  }
  getAll(url): Observable<any> {
    // console.log(url);
    return this.http.get<any>(url + '/');
  }

  paypal(url, num: any): Observable<any> {
    this.showNotification('Thông báo', "Successfully!");
    return this.http.post(url , num);
  }

  save(url, model: any,): Observable<any> {
    const req = new HttpRequest('POST', url + '/save', model);
    return this.http.request(req);
  }
  sendemail(url, email:any): Observable<any> {
    const req = new HttpRequest('POST', url, email);
    this.showNotification('Thông báo', 'send email sucsfully!');
    return this.http.request(req);
  }
  searchAllColumn(url, term: any,): Observable<any> {
    // this.showNotification('Thông báo', "Delete successfully!");
    return this.http.post(url + '/searchAllColumn', {searchString: term});
  }

  get(url, id: any) {
    return this.http.get<any>(url + '/' + id);
  }

  delete(url, id: any): Observable<any> {
    return this.http.post(url + '/delete', id);
  }

  find(url, id: any): Observable<any> {
    return this.http.get(url + '/' + id);
  }

  post(url, model): Observable<any> {
    return this.http.post(url, model);
  }

  showNotification(title, message) {
    const type = ['', 'info', 'success', 'warning'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: 'notifications',
      title: title,
      message: message,
    }, {
      type: type[color],
      timer: 1500,
      placement: {
        from: 'top',
        align: 'right'
      },
      template:
        '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
