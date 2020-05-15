import { Component, OnInit } from '@angular/core';
import { UploadFile } from '../usermodals/UploadFile';
import {FileConstraint}from '../usermodals/sizeConstraints'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng2ImgMaxService } from 'ng2-img-max';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers:[Ng2ImgMaxService]
})
export class UploadImageComponent implements OnInit {

  constructor(private snackBar:MatSnackBar,  private ngimage:Ng2ImgMaxService) { }

  files: UploadFile[] = [];
 
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

   

  setUpResolutionAndCompress(uploadfile){
    let width=FileConstraint.DEFAULT_WIDTH;
    let height=FileConstraint.DEFAULT_HEIGHT;
    let compressionsize=FileConstraint.DEFAULT_COMPRESSION_MB;
     if(localStorage.getItem('width')!=null){
      width=Number.parseFloat(localStorage.getItem('width'));
     }
     if(localStorage.getItem('height')!=null){
       height=Number.parseFloat(localStorage.getItem('height'));
  
     }
     if(localStorage.getItem('size')!=null){
      compressionsize=Number.parseFloat(localStorage.getItem('size'));
 
    }


  // console.log(this.uploadfile.file);
  this.ngimage.resizeImage(uploadfile.file,width,height).subscribe(data=>{
    
    
    let newfile=new File([data],data.name,{type:uploadfile.file.type});
    uploadfile.modifiedFile =newfile;
  
    this.ngimage.compressImage(uploadfile.modifiedFile,compressionsize).subscribe(cdata=>{
      let cnewfile=new File([cdata],cdata.name,{type:uploadfile.file.type});
     uploadfile.modifiedFile=cnewfile;
    //  console.log(uploadfile.modifiedFile);
  this.files.push(uploadfile);
    },(err=>{
      console.log(err);
      this.openSnackBar('Unable To Compress The Image','');
    }))
   
  },(err)=>{
    
    this.openSnackBar('Unable To Resize The Image','');
  })
  
  
  }

onSelect(event) {
   console.log(event);
 //new files added are pushed to list but in class type UploadFile as certain data members are needed later
    event.addedFiles.forEach(element => {
  
   if(element.size>=FileConstraint.MAX_FILE_SIZE){
     this.openSnackBar("Your File Name"+element.name+"Exceeds Max File Size",'');  // size limit
   }else{

       let newobj= new UploadFile(element);
       newobj.name=element.name;
       newobj.progress=0;
      this.setUpResolutionAndCompress(newobj);
        
   }
    });
 
}
 
onRemove(event) {

  this.files.splice(this.files.indexOf(event), 1); // on remove find the index of the obj and splice it 
}
  ngOnInit(): void {
  }

}
