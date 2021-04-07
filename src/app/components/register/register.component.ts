import {Component, OnInit} from '@angular/core';
import {HttpsServiceService} from '../../service/https-service.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {UploadAdapter} from '../../service/upload-adapter';
import {NotificationService} from '../../service/notification.service';
import {environment} from '../../../environments/environment.prod';
import {Router} from '@angular/router';

const SIGN_UP_AS_AGENT = environment.apiEndpoint + '/api/agent/signup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: any = {user: {}};
  public Editor = DecoupledEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };
  selectedFiles: FileList;

  selectFile(event, index: number) {
    const file = event.target.files.item(0);
    if (event.target.files.length > 0 && file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('Invaild Format');
    }
    if (event.target.files.length > 0) {
      this.readThis(event.target, index);
    }
  }

  readThis(inputValue: any, index: number): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.registerUser.user.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  constructor(private httpsServiceService: HttpsServiceService, private notification: NotificationService, public router: Router) {
  }

  ngOnInit(): void {
    this.registerUser.content = '<p>Tôi tên là: ....</p>';
  }

  signUpAsAgent() {
    if (this.registerUser.user.password !== this.registerUser.user.repassword) {
      this.notification.showNotification('Không hợp lệ', 'Mật khẩu không khớp', 'danger');
    } else {
      this.httpsServiceService.post(SIGN_UP_AS_AGENT, this.registerUser).subscribe(
        data => {
          this.notification.showNotification('Đăng ký thành công', 'Đăng ký thành công', '');
          this.router.navigate(['/login']);
        }, error => {
          this.notification.showNotification('Đăng ký thất bại', error.error.message, 'danger');
        }
      );
    }
  }
}
