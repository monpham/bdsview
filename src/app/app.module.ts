
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {PropertiesComponent} from './components/properties/properties.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminLayoutComponent} from './main-layouts/main/admin-layout.component';
import {HeaderComponent} from './main-layouts/header/header.component';
import {FooterComponent} from './main-layouts/footer/footer.component';
import {DemoMaterialModule} from './material-module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {RoutingModule} from './main-layouts/main/routing.module';
import { AboutComponent } from './components/about/about.component';
import { AgentsComponent } from './components/agents/agents.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { PropertyComponent } from './components/property/property.component';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';
import { PropertySaleComponent } from './components/property-sale/property-sale.component';
import { PropertyRentComponent } from './components/property-rent/property-rent.component';
import { ProjectComponent } from './components/project/project.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CodeSocketComponent } from './components/code-socket/code-socket.component';
import {Vr360ImageComponent} from './vr360-image/vr360-image.component';
import {ToastrModule} from 'ngx-toastr';
import {YamiCodeSocketComponent} from './components/yami-code-socket/yami-code-socket.component';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatFriendListComponent } from './components/chat-friend-list/chat-friend-list.component';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './components/payment/payment.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { SendemailComponent } from './components/sendemail/sendemail.component';


// import { Vr360ImageComponent } from './vr360-image/vr360-image.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminLayoutComponent,
    FooterComponent,
    AboutComponent,
    AgentsComponent,
    NewsListComponent,
    NewsDetailComponent,
    ContactComponent,
    PropertyComponent,
    ListPropertiesComponent,
    PropertySaleComponent,
    PropertyRentComponent,
    ProjectComponent,
    RegisterComponent,
    LoginComponent,
    CodeSocketComponent,
    YamiCodeSocketComponent,
    Vr360ImageComponent,
    ChatFriendListComponent,
    PaymentComponent,
    ResetpasswordComponent,
    SendemailComponent,
  ],
  imports: [
    DemoMaterialModule,
    HttpClientModule,
    RoutingModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ChatModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbTypeaheadModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA7aApxGxKvRCJGlyuP2ZUjQEPlhhZZmvk",
      authDomain: "demofxte.firebaseapp.com",
      databaseURL: "https://demofxte.firebaseio.com",
      projectId: "demofxte",
      storageBucket: "demofxte.appspot.com",
      messagingSenderId: "316683732284",
      appId: "1:316683732284:web:94afe90ad58d5d0c0aca39"
    }),
    AngularFireStorageModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
