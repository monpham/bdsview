import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ServiceService} from '../../service/service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, last, map, switchMap, tap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoadingService} from '../../service/loading.service';

declare var $: any;

const PRODUCT_API = environment.apiEndpoint + '/api/product';
const GET_PRODUCT_BY_PROJECT_API = PRODUCT_API + '/getByProjectId';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.css']
})
export class ListPropertiesComponent implements OnInit {
  private requestSource = new Subject<any>();

  DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT43JMDb6bteHLIF9_oXUXrGjaaOBSAYYMAgA&usqp=CAU';
  public properties: Array<any>;
  public propertiesGetAll: Array<any>;
  public term: string;
  searching = false;
  pageNews = 1;
  pageSize = 3;

  constructor(private route: ActivatedRoute,
              private  reloadService: LoadingService,
              private router: Router, private userService: ServiceService, private spinner: NgxSpinnerService) {
    this.spinner.show('loading_list');
  }

  ngOnInit(): void {
    //Load Init
    this.getAll();
  }

  getAll() {
    this.getProductByProject();
  }

  getProductByProject() {
    console.log(this.route.snapshot.queryParamMap.get('id'))
    if (this.route.snapshot.queryParamMap.get('id') === null) {
      this.userService.searchAllColumn(PRODUCT_API, '').subscribe(data => {
        this.properties = [];
        data.hits.hits.map((item, idx) => {
          this.properties.push(item.sourceAsMap)
          this.spinner.hide('loading_list');
        });
        console.log(this.properties)
      });
    } else (
      this.userService.get(GET_PRODUCT_BY_PROJECT_API, this.route.snapshot.queryParamMap.get('id')).subscribe(data => {
        this.properties = data;
        this.spinner.hide('loading_list');
      })
    );
    this.reloadService.reloadJs();
  }

  previewDetailProduct(id: string) {
    this.router.navigate(['/list-product/view-detail-product/'], {queryParams: {id: id}});
  }

  request() {
    this.requestSource.next();
  }

  onSearchChange(value) {
    this.userService.searchAllColumn(PRODUCT_API, value).subscribe(data => {
      this.properties = [];
      data.hits.hits.map((item, idx) => {
        this.properties.push(item.sourceAsMap);
        this.reloadService.reloadJs();
      });
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(() =>
        this.userService.post(PRODUCT_API + '/getHints', this.term).pipe()
      ),
      tap(() => this.searching = false)
    );

  onPageChange() {
    this.reloadService.reloadJs();
  }
}
