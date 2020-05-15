import { Component, OnInit, Input, EventEmitter ,Output} from '@angular/core';
import { UploadService } from './services/upload.service';
import { UploadFile } from '../usermodals/UploadFile';
import {FileConstraint} from '../usermodals/sizeConstraints';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatDialog } from '@angular/material/dialog';
import { ImageInfoComponent } from '../image-info/image-info.component';

@Component({
  selector: 'preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.css'],
  providers:[UploadService,Ng2ImgMaxService]
})
export class PreviewImageComponent implements OnInit {
@Input() uploadfile:UploadFile;
@Output() removeEmit:EventEmitter<any>=new EventEmitter();

  constructor(private uploadService:UploadService,private snackBar:MatSnackBar,
    private ngimage:Ng2ImgMaxService,private dialog:MatDialog) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  openModifyImage(){
    if(this.uploadfile.key!=null){
    let dialog=this.dialog.open(ImageInfoComponent,{
  
   width:"300px",
    data:this.uploadfile
    })
     
  }
  }

  ngOnInit(): void {
   
   this.uploadFileToS3();
  }


  async uploadFileToS3(){

    try{
      let upf= await this.uploadService.uploadFile(this.uploadfile);
      this.uploadfile.key=upf.Key;
      this.uploadfile.url=upf.Location;
      // upload and put key and url for later use like deletion or geting image from url
    }
    catch(err){
   // any error means remove from the list as otherwise it would show as div 
      this.removeEmit.emit(this.uploadfile);
    }
 
  

  
  }
 async removeFromBack(){
   
    if(this.uploadfile.key==null){
      this.uploadfile.request.abort();
 // to abort the upload this triggers the catch of uploadFiletoS3 and the file is removed from the list too.
    }else{
      try{
        let response=await this.uploadService.deleteFile(this.uploadfile);
        this.removeEmit.emit(this.uploadfile);
        // if the file is removed then remove from the list too.
       }catch(err){
         this.openSnackBar(err.message,'');
         // unable to delete the file
       }


    }

  
  
 }

 onRemove(event) {
   this.removeFromBack();

}

}
