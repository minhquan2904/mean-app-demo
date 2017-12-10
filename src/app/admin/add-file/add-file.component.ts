import { Component, OnInit } from '@angular/core';
import { appConfig } from '../../app.config';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { AlertService } from '../../_services/index';

const URL = appConfig.apiUrl + "/upload"
@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  // set up file uploader
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  
  constructor(private alertService: AlertService) {
    // upload successful
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number) => {
      console.log(status);
      if(status === 200)
      {
        alertService.success("Upload ok!");
      }
      else{
        alertService.error("Status: " + status + "||" + response);
      }
    }

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number) => {
      this.alertService.error(response);
      console.log(response);
    }


   }

  ngOnInit() {
    console.log(URL);
  }

}
