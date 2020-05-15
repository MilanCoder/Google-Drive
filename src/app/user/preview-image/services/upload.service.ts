import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';
import {BUCKET} from '../../usermodals/s3credentials';
import { Observable, throwError } from 'rxjs';
import { UploadFile } from '../../usermodals/UploadFile';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class UploadService {

constructor(){

}

    setUpBucket(){
          const bucket = new S3(
          {
              accessKeyId: BUCKET.accessKeyId,
              secretAccessKey:BUCKET.secretAccessKey,
              region: BUCKET.region
          }
      );

      return bucket;
    }





  async uploadFile(upobj:UploadFile){
      let file=upobj.modifiedFile;
    const contentType = file.type;
    const bucket =this.setUpBucket(); // set bucket credentials
       
    
      const params = {
          Bucket: BUCKET.bucketname,
          Key:file.name+new Date(),
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };

       // params needed for upload
    
//for upload progress   
 upobj.request= bucket.upload(params).on('httpUploadProgress', function (evt) {
          upobj.progress=( evt.loaded /evt.total)*100;
        //  console.log(upobj.progress);
      })
      
      // stored as upob.request bcz to later use in aborting the upload

      let uploadb=upobj.request.promise();  // make the managedupload to then and able type 
   return uploadb; // return promise
    
}


 async deleteFile(dobj):Promise<any>{
     //console.log(dobj);
   const bucket= this.setUpBucket();
   const params = {
    Bucket: BUCKET.bucketname,
    Key:dobj.key,
}; 
// key needed for deletion of the object
 
return new Promise((resolve,reject)=>{
    bucket.deleteObject(params,(err,data)=>{
        if(err){
            reject({code:'E',message:'Unable To Delete The File'}); // error
        }else{
           resolve({code:'S',"file":data}); //success
        }
    });
})



 }


}
