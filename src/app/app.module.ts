import {SharedModule} from './shared/shared.module';
import {PagesComponent} from './pages/pages.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// Routes
import {APP_ROUTES} from './app.routes';

// Temporary
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Services
import {ServiceModule} from './services/service.module';

// Components
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
