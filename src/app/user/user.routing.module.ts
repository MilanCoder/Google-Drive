import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

{path:'user',component:UserComponent,
children:[
    {path:'home',component:HomeComponent}
]
}

];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
