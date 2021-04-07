import {Injectable} from '@angular/core';
import * as jQuery from 'jquery';
import 'bootstrap-notify';

let $: any = jQuery;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  showNotification(title, message, typeSelect) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: 'notifications',
      title: title,
      message: message,
    }, {
      type: typeSelect ? typeSelect : type[color],
      timer: 1500,
      placement: {
        from: 'top',
        align: 'right'
      },
      template:
        '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidMatIconModuleden="true" class="close mat-button" data-notify="dismiss">  <i class="fa fa-times"></i></button>' +
        '<i class="fa fa-bell-o"></i>' +
        '<span class="pl-5" data-notify="title">{1}</span> ' +
        '<div data-notify="message">{2}</div>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
