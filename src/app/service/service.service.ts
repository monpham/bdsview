import {Injectable} from '@angular/core';
import * as jQuery from 'jquery';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {last, tap} from 'rxjs/operators';

let $: any = jQuery;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  getAll(url): Observable<any> {
    return this.http.get<any>(url + '/');
  }

  save(url, depart: any): Observable<any> {
    const req = new HttpRequest('POST', 'url' + '/save', depart);
    this.showNotification('Thông báo', 'Lưu thành công');
    return this.http.request(req);
  }

  searchAllColumn(url, term: any,): Observable<any> {
    console.log(term);
    // return this.http.post(url + '/searchAllColumn2', {searchString: term}).pipe();

    return this.http.post(url + '/searchAllColumn2', {searchString: term}).pipe(
      last()
    );
  }

  post(url, term: any,): Observable<any> {
    return this.http.post(url, {searchString: term});
  }

  get(url, id: any) {
    return this.http.get<any>(url + '/' + id);
  }

  getID(url, id: any) {
    return this.http.get<any>(url + '/getProductId' + id);
  }

  delete(url, id: any): Observable<any> {
    this.showNotification('Thông báo', 'Delete successfully!');
    return this.http.post(url + '/delete', id);
  }

  findAllRecord(url, id: any): Observable<any> {
    return this.http.get(url + '/' + id);
  }

  showNotification(title, message) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
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
