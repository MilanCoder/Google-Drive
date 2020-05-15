import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileConstraint } from '../usermodals/sizeConstraints';
import { getErrorMessage } from '../usermodals/Validation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from '../preview-image/services/upload.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[UploadService]
})
export class SettingsComponent implements OnInit {
  public error_messages:any;
  settingForm:FormGroup;
  constructor(private fb:FormBuilder,private errorMessage:getErrorMessage,
    private snackBar:MatSnackBar,private uploadService:UploadService) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
 createForm(){

  this.settingForm=this.fb.group({
    width:[localStorage.getItem('width')!=null?parseFloat(localStorage.getItem('width')):FileConstraint.DEFAULT_WIDTH,  // validations 
                        [Validators.required,Validators.max(1440),Validators.min(1)]],
    height:[localStorage.getItem('height')!=null?parseFloat(localStorage.getItem('height')):FileConstraint.DEFAULT_WIDTH,
                        [Validators.required,Validators.max(821),Validators.min(1)]],
    size:[localStorage.getItem('size')!=null?parseFloat(localStorage.getItem('size')):FileConstraint.DEFAULT_COMPRESSION_MB,
                        [Validators.required]]
  })
 }
   
  ngOnInit(): void {
  this.error_messages= this.errorMessage.geterror(); // gets the validation messages
  this.createForm(); // creates form

  }



  
  changeSizeAndRatio(){
   localStorage.setItem('width',this.settingForm.controls.width.value);  // updates the value of width specified for changing the resolution
   localStorage.setItem('height',this.settingForm.controls.height.value); // updates the vlaue of height specified for changing the resolution
   localStorage.setItem('size', this.settingForm.controls.size.value); // for changing the compression of image
   this.openSnackBar('Successfully updated','');

  }
  


}
