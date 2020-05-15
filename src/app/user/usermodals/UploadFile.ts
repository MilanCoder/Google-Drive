export class UploadFile{
    file:File;
    key:string;
    name:string;
    url:string;
    progress:Number;
    modifiedFile:File;
    width:any;
    height:any;
    createdAt:Date=new Date();
    request:any;
 

    constructor(file:File) {
       this.file=file;
      
        
    }
    
}