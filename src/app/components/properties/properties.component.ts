import { Component, OnInit } from '@angular/core';
import { HttpsServiceService } from 'src/app/service/https-service.service';
import { environment } from 'src/environments/environment.prod';
import {ActivatedRoute, Router} from '@angular/router';

const PAYPAL_API = 'http://68.183.178.106:8080'
const AGENT_API = environment.apiEndpoint + '/api/agent';
const GET_AGENT_DETAIL_API = AGENT_API + '/getAgentId'

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  number = 1;
  public agent: any;

  constructor(private userService: HttpsServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Load Init
    this.getAgentId();
  }

  getAgentId(){
      this.userService.get(GET_AGENT_DETAIL_API, this.route.snapshot.queryParamMap.get('id')).subscribe(data => {
        this.agent = data;
      })
    }


  paypal() {
    this.userService.paypal(PAYPAL_API+ "/pay" , 1).subscribe(res => {
      console.log(res.message);
      window.open(res.message);
    })
  }
}
