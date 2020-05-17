# Googledrive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# UploadDrive
Upload Drive is a web page to allow user to upload images to AWS s3 along with resizing and compressing. 

# Upload Section 
 The upload section primarly consist of upload area where the user can drag/drop the files which are needed to be uploaded along with they can see which files are being uploaded so that they do not upload wrong images, and to do so cancel feature is provided to abort the upload. 
 To do so NgxDropZone is used which allow us to drag/ drop files and preview them with great look and feel.
  
  
 But before upload the image files are resized and compressed according to either the localstorage stored height , width and compression size or their default stored values. These all operations are carried by ng2ImgMax library which has 2 functions:
 1. Resize() : This function returns Observable which resizes the images by parameters width and height, on completion it               gives Blob(Binary large object) which can be later used by converting it to File.
 2. Compress() : This function returns Observable which compresses the images by parameter of compression size, on completion         it gives Blob(Binary large object) too which can be later used by converting it to File.
These both function are needed in order to create resoluted images as per the demand of the user.
To upload these images to server , S3 upload function is used.

# S3 
  The s3 upload function takes parameters as shown below
 
         const params = {
          Bucket: BUCKET.bucketname,
          Key:file.name+new Date(),
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      
          const bucket = new S3(
          {
              accessKeyId: BUCKET.accessKeyId,
              secretAccessKey:BUCKET.secretAccessKey,
              region: BUCKET.region
          }
          
  The bucket is used as bucket.upload(params).on or send , the on() helps us to get the update for progress in upload. 
  on() event listener is fired whenever httpprogress observe considerable progress and in these function we can update our progress bar value to see it on a progress bar.
  send() : function tells whether the upload was successful or failure.
  
  After successfull completion the new file returned have key , url and file size which is stored for showing the difference in the old and new file by clicking on the uploaded image which thereby opens up a dialog box containing all these information.
  
  # Setting Section
   This section is used for changing the width, height and compression quality of images according to user. For that formgroup is used to create a form in which takes width , height and compression MB size and stores in localstorage which are used by the ng2ImgMax. Validations are used so that illegal values are not used while uploading the images.
  

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
