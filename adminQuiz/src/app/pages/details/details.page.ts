import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { CrudService } from 'src/app/services/crud.service';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  today= new Date();
  questions: any = []
  category: any = []
  catName: String;
  updateQuestion = { catId: "", question: "", optionA: "", optionB: "", optionC: "", correctAnswer: "",date:this.today }

  question = { catId: "", question: "", optionA: "", optionB: "", optionC: "", correctAnswer: "",date:this.today }

  doSomething(first: MatExpansionPanel) {
    if (first.expanded) {  // check if first panel is expanded
      first.close(); // close first panel
    }
    else first.toggle()
  }

  constructor(private helper: HelperService, private crudService: CrudService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.user;
        this.question.catId = this.category.id
      
        this.readData(this.category.id)
      }
    });
  }
  ngOnInit() {
  }
  radioGroupChange(event) {
   
  }
  radioUpdateSelect(event,item) {
    item.correctAnswer = event.detail.value;
  }
  radioSelect(event,item) {

    this.question.correctAnswer = event.detail.value;
  }
  CreateRecord() {
   
    
  this.helper.presentLoadingWithOptions()
    this.crudService.create_NewQuestion(this.question).then(resp => {
          this.helper.hideLoader()
      this.catName = "";
      console.log(resp);
    })
      .catch(error => {
        this.helper.hideLoader()
        this.helper.presentToast(error)
        //this.helper.hideLoader()
        console.log(error);
      });
  }

  readData(id: any) {
    this.helper.presentLoadingWithOptions()
 

    this.crudService.read_Question(id).subscribe(data => {
      var datas: any = data
      console.log(datas)
      this.questions = datas.map(e => {
      
        return {

          id: e.payload.doc.id,
          catId: e.payload.doc.data()['catId'],
          question: e.payload.doc.data()['question'],
          correctAnswer: e.payload.doc.data()['correctAnswer'],
          optionA: e.payload.doc.data()['optionA'],
          optionB:e.payload.doc.data()['optionB'],
          optionC:e.payload.doc.data()['optionC'],
          date:e.payload.doc.data()['date']
        };
      })
     
      this.helper.hideLoader()
      // this.questions = this.helper.sort(this.questions)
    },
      err => {
        this.helper.presentToast(err)
        setTimeout(() => {
          this.helper.hideLoader()
        }, 500);
        
      });
  }


  deleteRecord(record) {
   
    this.helper.presentAlertConfirm("Sure to delete?", "Once deleted , it cannot be undone").then(data => {
      this.helper.presentLoadingWithOptions()
      this.crudService.delete_Question(record.id).then(data => {
        this.helper.hideLoader()
      }, err => {
        this.helper.hideLoader()
      })
      
      // this.readData(record.catId)
    }, err => {
      this.helper.presentToast(err)
      this.helper.hideLoader()
      console.log("no")
    })


  }

  updateRecord(recordRow) {
    console.log(recordRow)
    
    this.updateQuestion.catId=recordRow.catId
    this.updateQuestion.question=recordRow.question
    this.updateQuestion.optionA=recordRow.optionA
    this.updateQuestion.optionB=recordRow.optionB
    this.updateQuestion.optionC=recordRow.optionC
    this.updateQuestion.correctAnswer=recordRow.correctAnswer

    
    this.helper.presentLoadingWithOptions()
    this.crudService.update_Question(recordRow.id, this.updateQuestion).then(res=>{
    this.helper.hideLoader()

    },err=>{
      this.helper.hideLoader()
      this.helper.presentToast(err)
    })
  }

}
