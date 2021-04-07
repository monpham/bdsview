import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpsServiceService} from '../../service/https-service.service';
import {environment} from '../../../environments/environment.prod';

const USER_COUNT_API = environment.apiEndpoint + '/api/auth';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent implements OnInit {
  email: String;

  constructor(private httpService: HttpsServiceService,
              public dialogRef: MatDialogRef<any>) {
  }

  ngOnInit(): void {
  }

  send(email: any) {
    console.log(email);
    this.httpService.sendemail(USER_COUNT_API + '/forgot_password', email).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
