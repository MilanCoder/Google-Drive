import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import { UploadFile } from '../usermodals/UploadFile';
import {FileConstraint} from '../usermodals/sizeConstraints';
@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.css']
})
export class ImageInfoComponent implements OnInit {
   shouldShow:Boolean=false;
   size=(this.data.file.size/1000);
   mwidth:any=localStorage.getItem('width')!=null?parseFloat(localStorage.getItem('width')):FileConstraint.DEFAULT_WIDTH;
   mheight:any=localStorage.getItem('height')!=null?parseFloat(localStorage.getItem('height')):FileConstraint.DEFAULT_HEIGHT;
   msize:any=null;
  constructor(public dialogRef: MatDialogRef<ImageInfoComponent>,
  @Inject(MAT_DIALOG_DATA) public data:UploadFile) {
  }
  getImageDimension (file): Observable<any> {
    return new Observable(observer => {
    let myfile=this;
        let fs=new FileReader();
        fs.readAsDataURL(file);
        fs.onload=(e)=>{
          const img = new Image();
          img.src=<string>fs.result;
          img.onload = function (event) {
              const loadedImage: any = event.currentTarget;
              myfile.data.width= loadedImage.width;
              myfile.data.height = loadedImage.height;
              observer.next();
              observer.complete();
          }
        }
    
    });
}
  ngOnInit(): void {
  //console.log(this.data);
  this.msize=this.data.modifiedFile.size/1000;
  this.getImageDimension(this.data.file).subscribe(data=>{
             this.shouldShow=true;
  });
  }

}
