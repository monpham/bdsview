import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service/service.service';
import {environment} from '../../../environments/environment.prod';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoadingService} from "../../service/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

const PRODUCT_API = environment.apiEndpoint + '/api/product';
const PROJECT_API = environment.apiEndpoint + '/api/project'
const GET_COUNT_PRODUCT_BY_PROJECT = PRODUCT_API + '/countProductByProject';
const GET_PRODUCT_BY_PROJECT_API = PRODUCT_API + '/getByProjectId';


declare var loadCar: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT43JMDb6bteHLIF9_oXUXrGjaaOBSAYYMAgA&usqp=CAU';
  public properties: Array<any>;
  public products: Array<any>;
  public projects: Array<any>;
  public countProuct: Array<Array<any>>;
  public term: string;

  constructor(private userServce: ServiceService,
              private spinner: NgxSpinnerService,
              private  reloadService: LoadingService,
              public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {
    this.spinner.show('homes');
  }

  ngOnInit(): void {
    //Load Init
    this.getProductSlide();
    this.getAllProject();
    this.getCountProduct();
    this.getAllProduct();
  }

  getAllProject(){
    this.userServce.getAll(PROJECT_API).subscribe(data => {
      this.projects = data.filter((value,i) => i <= 5);
    });
    this.getProductByProject();
  }

  getProductByProject(){
    if (this.route.snapshot.queryParamMap.get('id') === '') {
      this.userServce.getAll(PRODUCT_API).subscribe(data => {
        this.properties = data;
        this.spinner.hide('homes');
      });
    } else (
      this.userServce.get(GET_PRODUCT_BY_PROJECT_API, this.route.snapshot.queryParamMap.get('id')).subscribe(data => {
        this.properties = data;
      })
    );
  }

  // getProductByProject(idProduct){
  //   let project = this.projects.filter(item => item.tenDuAn == idProduct)[0]
  //   return this.http.get<any>(this.userServce + GET_PRODUCT_BY_ID_API + project.id);
  // }

  getAllProduct(){
    this.userServce.getAll(PRODUCT_API).subscribe(data => {
      this.products = data.filter((value,i) => i <= 6);
      this.reloadService.reloadJs();
    });
  }

  privew(id: string) {
    this.router.navigate(['/project/view-product/'], {queryParams: {id: id}});
    window.scroll(0,0);
  }

  previewDetailProduct(id: string) {
    this.router.navigate(['/list-product/view-detail-product/'], {queryParams: {id: id}});
  }

  getCountProduct(){
    this.userServce.getAll(GET_COUNT_PRODUCT_BY_PROJECT).subscribe(data => {
      this.countProuct = data;
    })
  }

  getProductSlide(){
    this.userServce.getAll(PRODUCT_API).subscribe(data => {
      this.properties = data.filter((value,i) => i <= 2);
      this.spinner.hide('homes');
      this.reloadService.reloadJs();
    });
  }
}
