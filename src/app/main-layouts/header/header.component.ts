import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../auth/storage.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private listTitles: any[];
  location: Location;
  public products: Array<any>;

  constructor(location: Location, private router: Router, private route: ActivatedRoute, private token: StorageService, public translate: TranslateService) {
    translate.setDefaultLang('vn');
    this.location = location;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
  }

  getTitle() {
    return this.token.getName();
  }

  logOut(): void {
    this.token.signOut();
    this.router.navigate(['login'], {relativeTo: this.route.parent});
  }

  priview(id: string) {

  }
}
