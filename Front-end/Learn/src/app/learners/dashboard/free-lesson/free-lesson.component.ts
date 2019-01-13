import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user/user.service';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';


@Component({
  selector: 'app-free-lesson',
  templateUrl: './free-lesson.component.html',
  styleUrls: ['./free-lesson.component.scss']
})
export class FreeLessonComponent implements OnInit {

  intelProfile: any = null; // intelligenceProfile - ignore
  topFive: any = null; // top five intelligences of the user
  totalParts: number = 6; // how many parts to show in this demo
  totalOccurances: number = 0; // ignore
  checkpageindex:number=0;
  checkpagename:string=null;
  totalShown: number = 0; // how many parts have been shown
  parts: any[] = []; // we will use this to display all the parts
  shownparts=[];
  checkpart=null;
  checkpartstring:string=null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.GenerateProfile();

  }


  // goes to the API and gets data
  GenerateProfile() {
    this.userService.GetIntelProfile().subscribe((resp:any) => {
      this.intelProfile = JSON.parse(resp.info.intelligence_profile);

      var topFive = JSON.parse(resp.info.top_five);

      let that = this; // use this to reference the class inside a function's local scope

      topFive.map(function(row, index){
        var occurances:any = row.ratio * that.totalParts / 100;
        row.occurances = parseFloat(occurances).toFixed(0);
        that.totalOccurances += parseInt(row.occurances);
      });

      var difference:any = this.totalParts - this.totalOccurances;


      // whatever the excess/lack there is, we add/subtract it from the first/last intelligence
      if(difference < 0) {
          topFive[topFive.length - 1].occurances = parseInt(topFive[topFive.length - 1].occurances) + difference;
      } else {
          topFive[0].occurances = parseInt(topFive[0].occurances) + difference;
      }

      this.topFive = topFive;

      this.GenerateParts(); // generate the parts
      this.checkpage();


    }, (err: HttpErrorResponse) => {
      console.error(err);

    });
  }

  GenerateParts() {
    let that = this; // for use inside other functions
    // this.topFive.sort(function() { return 0.5 - Math.random() });
    this.topFive.map((row, index) => {

      for (let i = 0; i < row.occurances; i++) {
        that.parts.push({
          intel: row.title,
          completed: false
        });
      }

    });

    this.parts.sort(() => { return 0.5 - Math.random() });

    console.log(this.parts);

  }

  checkpage(){
  if(this.checkpageindex!=6){
    this.checkpartstring=this.parts[this.checkpageindex].intel;
     if(this.shownparts.indexOf(this.checkpartstring) >= 0){
       this.checkpagename=this.parts[this.checkpageindex].intel+"2";
       this.shownparts.push(this.checkpagename);
     }else{
      this.checkpagename=this.parts[this.checkpageindex].intel;
      this.shownparts.push(this.checkpagename);
     }

   console.log(this.shownparts);
    this.checkpageindex++;
  }else{
    this.checkpagename="end";
  }
    console.log(this.checkpagename);

    console.log(this.parts);
  }

  // eof
}
