import { Component } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { AlertController } from '@ionic/angular';
import { HelperService } from '../services/helper.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  students: any = [];
  studentName: string = "";
  studentAge: number = 0;
  studentAddress: string = "";

  questions: any = []
  catName: String;
  doSomething(first: MatExpansionPanel, second: MatExpansionPanel) {
    if (first.expanded) {  // check if first panel is expanded
      first.close(); // close first panel
    }
    else first.toggle()
  }
  constructor(private router: Router,private alertController: AlertController,
     private helper: HelperService, private crudService: CrudService) { }


  goToDetails(item){
    let navigationExtras: NavigationExtras = {
      state: {
        user: item
      }
    };
    this.router.navigateByUrl('/details', navigationExtras);
  }
  ngOnInit() {
    this.readData()
  }
  readData() {
    this.helper.presentLoadingWithOptions()
    this.crudService.read_Categories().subscribe(data => {
      var datas: any = data
      this.questions = datas.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          catName: e.payload.doc.data()['catName']
        };
      })
      this.helper.hideLoader()
      this.questions = this.helper.sort(this.questions)
    },
      err => {
        this.helper.hideLoader()
        this.helper.presentToast(err)
      });
  }

  CreateRecord() {
    let record = {};
    record['catName'] = this.catName;
    this.helper.presentLoadingWithOptions()
    this.crudService.create_Category(record).then(resp => {
      this.helper.hideLoader()
      this.catName = "";
      console.log(resp);
    })
      .catch(error => {
        this.helper.hideLoader()
        this.helper.presentToast(error);
      });
  }



  RemoveRecord(rowID) {
   
    this.helper.presentAlertConfirm("Sure to delete?", "Once deleted , it cannot be undone").then(data => {
      this.helper.presentLoadingWithOptions()
      this.crudService.delete_Category(rowID).then(data => {
        this.helper.hideLoader()
      }, err => {
        this.helper.hideLoader()
      })
      // this.readData()
    }, err => {
      this.helper.presentToast(err)
      this.helper.hideLoader()
      console.log("no")
    })


  }

  updateRecord(recordRow) {
    let record = {};
    record['catName'] = recordRow.catName;
    this.helper.presentLoadingWithOptions()
    this.crudService.update_Category(recordRow.id, record).then(res=>{
    this.helper.hideLoader()
    },err=>{
      this.helper.presentToast(err)
      this.helper.hideLoader()
    })
  }






}