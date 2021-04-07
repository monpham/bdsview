import {Component, OnInit} from '@angular/core';
import {HttpsServiceService} from '../../service/https-service.service';
import {environment} from '../../../environments/environment.prod';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

const NEWS_API = environment.apiEndpoint + '/api/news';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  public newsList: Array<any>;

  constructor(private httpService: HttpsServiceService, public router: Router, private spinner: NgxSpinnerService) {
    this.spinner.show('loading_list');
  }

  ngOnInit(): void {
    this.httpService.getAll(NEWS_API).subscribe(data => {
      console.log(data);
      this.newsList = data;
      this.spinner.hide('loading_list');
    });
  }
  preview(id: string) {
    // this.route.navigate(['preview', htmlTemplate: this.news.content])
    this.router.navigate(['/news-detail'], {queryParams: {id: id}});

  }

}
