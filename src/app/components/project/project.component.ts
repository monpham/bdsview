import {Component, OnInit, Pipe} from '@angular/core';
import {ServiceService} from '../../service/service.service';
import {HttpsServiceService} from '../../service/https-service.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../../environments/environment.prod';
import {LoadingService} from '../../service/loading.service';

declare var $: any;

const PROJECT_API = environment.apiEndpoint + '/api/project';
const PRODUCT_API = 'https://safe-citadel-42709.herokuapp.com/api/product';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  public projects: Array<any>;
  public products: Array<any>;
  pageNews = 1;
  pageSize = 6;

  constructor(private userService: ServiceService,
              private  reloadService: LoadingService, public router: Router, private spinner: NgxSpinnerService) {
    this.spinner.show('loading_projects');
  }

  ngOnInit(): void {
    this.userService.getAll(PROJECT_API).subscribe(data => {
      this.projects = data;
      this.onPageChange();
      this.spinner.hide('loading_projects');
    });
  }

  privew(id: string) {
    this.router.navigate(['/project/view-product/'], {queryParams: {id: id}});
  }
  onPageChange() {
    this.reloadService.reloadJs();
  }
}
