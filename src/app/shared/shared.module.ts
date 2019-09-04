import {PipesModule} from './../pipes/pipes.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {CommonModule} from '@angular/common';
import {ModalUploadComponent} from './../components/modal-upload/modal-upload.component';

@NgModule({
  imports: [CommonModule, RouterModule, PipesModule],
  declarations: [
    PagenotfoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ModalUploadComponent,
  ],
  exports: [
    PagenotfoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ModalUploadComponent,
  ],
})
export class SharedModule {}
