import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { InserisciComponent } from './inserisci/inserisci.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { InsertButtonsComponent } from './insert-buttons/insert-buttons.component';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';
import { ScaricaComponent } from './scarica/scarica.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { BookAccordionComponent } from './book-accordion/book-accordion.component';
import { NgbModule, NgbCollapseModule, NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { RicercaComponent } from './ricerca/ricerca.component';
import { InsertMemberComponent } from './insert-member/insert-member.component';
import { MemberDirective } from './member.directive';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import { MemberAccordionComponent } from './member-accordion/member-accordion.component';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { BookCardComponent } from './book-card/book-card.component';
import { PublicLibraryComponent } from './public-library/public-library.component';
import { GestisciScaffaleComponent } from './gestisci-scaffale/gestisci-scaffale.component';

registerLocaleData(localeIt,'it');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InserisciComponent,
    BookDetailComponent,
    InsertButtonsComponent,
    BarcodeReaderComponent,
    ScaricaComponent,
    CatalogoComponent,
    BookAccordionComponent,
    RicercaComponent,
    InsertMemberComponent,
    MemberDirective,
    ManageMemberComponent,
    MemberAccordionComponent,
    BookCardComponent,
    PublicLibraryComponent,
    GestisciScaffaleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    NgbCollapseModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useFactory: function(router: Router, authenticationService: AuthenticationService) {
        return new JwtInterceptor(router);
      },useClass: JwtInterceptor, multi: true, deps: [Router] },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: LOCALE_ID, useValue: "it" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
