import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MyOwnCustomMaterialModule} from '../importMats.module';
import { UserRoutingModule } from './user.routing.module';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { Ng2ImgMaxModule, Ng2ImgMaxService } from 'ng2-img-max';
import { ImageInfoComponent } from './image-info/image-info.component';

@NgModule({
  declarations: [UserComponent, 
    UploadImageComponent, PreviewImageComponent, SettingsComponent, HeaderComponent, HomeComponent, ImageInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule,
    Ng2ImgMaxModule,
    NgxDropzoneModule,
  ],
  providers:[],
  entryComponents:[ImageInfoComponent]
})
export class UserModule { }
