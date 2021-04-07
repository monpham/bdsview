import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpsServiceService} from '../../service/https-service.service';

const NEWS_API = environment.apiEndpoint + '/api/news';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  public htmlTemplate: any;
  htmlContent: string;
  news: any;

  constructor(private route: ActivatedRoute,
              private router: Router, private httpService: HttpsServiceService, private view: ViewContainerRef) {
    setTimeout(() => this.htmlContent = (view.element.nativeElement as HTMLElement).innerHTML);
  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParamMap.get('id'));
    this.httpService.get(NEWS_API, this.route.snapshot.queryParamMap.get('id')).subscribe(data => {
      this.news= data;
      this.htmlTemplate = data.content;
      console.log(data);
      setTimeout(() => this.htmlTemplate = (this.view.element.nativeElement as HTMLElement).innerHTML);
    });
  }

}
