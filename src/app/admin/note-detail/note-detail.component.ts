import { Component, OnInit } from '@angular/core';
import { NoteBookService,AlertService } from '../../_services/index';
import { NoteBook } from '../models/notebook.model';
import { NullDefaultValueDirective } from '../../_helpers/index'

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  model : any = {};  // search data
  success = false; // table display status
  notebooks : any = {}; // list result 
  note : NoteBook; // model to update/delete
  id : any; //data
  edit = true; // edit status
  
  // select search option
  kinds = [
    {name: "Mã sinh viên", value: "student_code" },
    {name: "Vị trí lưu trữ", value: "save_place"},
    {name: "Khoa", value:"faculty"}
  ]
  constructor(private notebookService: NoteBookService,
              private alertService: AlertService
  ) {
    // create a empty model
      this.note = new NoteBook('','','','','','','','',0,'','','','',)  ;  
   }

  ngOnInit() {
    this.model.selectedValue="student_code";
  }

  //search function
  find()
  {
    //console.log(this.model.selectedValue);
    this.notebookService.search(this.model)
      .subscribe(data =>
         {
           //search successful
           this.notebooks = data.docs;
           this.success = true;
          },
         (err) => {this.alertService.error(err)}); // search fail
  }

  // bind data to modal collapse
  getInfo(note: NoteBook)
  {
    // bind data to modal collapse
    this.note = note;
   
  }
  // update data
  save_info()
  {
    this.notebookService.update(this.note._id,this.note).subscribe(data =>
      {
        this.edit = !this.edit;
        this.alertService.success(data.json());
      },
      (err) => {this.alertService.error(err)});

   
  }
  //change edit status
  change()
  {
    this.edit = !this.edit;
  }
  //delete data
  _delete()
  {
    //confirm
    var r = confirm("Do you want to delete this notebook? Student code: "+ this.note.student_code);
    
    if(r == true)
    {
      this.notebookService._delte(this.note._id).subscribe(data =>
        {
          this.edit = true;
          this.alertService.success("Delete successful!");
        },
        (err) => {this.alertService.error(err)});
      
    }
  }
}
