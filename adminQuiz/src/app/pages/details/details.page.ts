import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  questions: any = []
  category: any = []
  catName: String;
  question = { catId: "", question: "", optionA: "", optionB: "", optionC: "", correctAnswer: "" }
  constructor(private helper: HelperService, private crudService: CrudService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.user;
        this.question.catId = this.category.id
        console.log(this.category)
        this.readData(this.category.id)
      }
    });
    console.log(this.category)
    //if(this.question.catId!=undefined)
    // this.readData()

  }
  ngOnInit() {
  }
  radioGroupChange(event) {
    //console.log("radioGroupChange",event.detail);
    // this.selectedRadioGroup = event.detail;
  }
  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.question.correctAnswer = event.detail.value;
  }
  CreateRecord() {
    console.log(this.question)
    let record = {};
    record['catName'] = this.catName;
    // this.helper.presentLoadingWithOptions()
    this.crudService.create_NewQuestion(this.question).then(resp => {
      //    this.helper.hideLoader()
      this.catName = "";
      console.log(resp);
    })
      .catch(error => {
        //this.helper.hideLoader()
        console.log(error);
      });
  }

  readData(id: any) {
    this.helper.presentLoadingWithOptions()
    console.log(id);

    this.crudService.read_Questions(id).subscribe(data => {
      var datas: any = data
      console.log(datas)
      this.questions = datas.map(e => {
        // return e;
        return {

          id: e.payload.doc.id,
          catId: e.payload.doc.data()['catId'],
          question: e.payload.doc.data()['question'],
          correctAnswer: e.payload.doc.data()['correctAnswer'],
          optionA: e.payload.doc.data()['optionA'],
          optionB:e.payload.doc.data()['optionB'],
          optionC:e.payload.doc.data()['optionC']
        };
      })
      console.log(this.questions);
      this.helper.hideLoader()
      // this.questions = this.helper.sort(this.questions)
    },
      err => {
        console.log("error");
      });
  }

}
