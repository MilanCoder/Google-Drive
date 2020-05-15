import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class getErrorMessage{
    
    geterror(){
    return {
        'name': [
          { type: 'required', message: 'Name is required' },
          { type: 'minlength', message: 'Name must be at least 4 characters' },
          { type: 'maxlength', message: 'Name must be less than 25 characters' },
           {type:'pattern', message:'Only Alphabhets are allowed'}
        ],
        'emailid': [
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Enter a valid email' }
        ],
        'pwd': [
          { type: 'required', message: 'Password is required' },
          { type: 'minlength', message: 'Password must be at least 5 characters' },
          { type: 'maxlength', message: 'Password cannot be more than 25 characters' },
         { type :'pattern', message: 'Must contain one with Number'  }
        ],

      
        "id":[
          {type:'required', message:'Mandatory Field'}
        ],
         "width":[
          { type: 'required', message: 'Width is required' },
           {type:'max',message:'Width Must Be less than 1440px'},
           {type:'min',message:"Width must be greater than 1px"}
           
         ]
         , "height":[

          { type: 'required', message: 'Height is required' },
          {type:'max',message:'Height Must Be less than 821px'},
          {
           type:'min',message:"Height must be greater than 1px"}  
          ],
          "size":[
            { type: 'required', message: 'size is required' },
          ]
        }

}}