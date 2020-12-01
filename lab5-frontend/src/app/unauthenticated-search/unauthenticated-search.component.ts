import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-unauthenticated-search',
  templateUrl: './unauthenticated-search.component.html',
  styleUrls: ['./unauthenticated-search.component.css']
})
export class UnauthenticatedSearchComponent implements OnInit {

  constructor(private http:HttpClient) { }
  searchInput:String
  courseInput:String
  results:any;
  fullData:any
  visibleResultsArr1=[];
  visibleResultsArr2=[];
  got=false;
  expandStatus=false;
  resultsStatus:String
  daysString:String;
  instructorsString:String;
  inButton:String="More";
  ngOnInit(): void {
  }
  getValue(data){
    return data.value;
  }
 setInitialValues(){

 }
  visibleResults(){
    if(this.results[0].catalog_nbr)this.visibleResultsArr1.push(["Course Number", this.results[0].catalog_nbr])
    if(this.results[0].subject)this.visibleResultsArr1.push(["Subject", this.results[0].subject])
    if(this.results[0].className)this.visibleResultsArr1.push(["Class Name", this.results[0].className])
    if(this.results[0].course_info[0].class_section)this.visibleResultsArr1.push(["Class Section", this.results[0].course_info[0].class_section])
    if(this.results[0].course_info[0].ssr_component)this.visibleResultsArr1.push(["SSR Component", this.results[0].course_info[0].ssr_component])
  }
  expandedResults(){
    this.instructorsString="";
    this.daysString="";
    this.visibleResultsArr2.push(["Catalog Number", this.results[0].catalog_nbr])
    this.visibleResultsArr2.push(["Subject", this.results[0].subject])
    this.visibleResultsArr2.push(["Class Name", this.results[0].catalog_nbr])
    this.visibleResultsArr2.push(["Class Number", this.results[0].course_info[0].class_nbr])
    this.visibleResultsArr2.push(["Start Time", this.results[0].course_info[0].start_time])
    this.visibleResultsArr2.push(["Long Description", this.results[0].course_info[0].descrlong])
    this.visibleResultsArr2.push(["End time", this.results[0].course_info[0].end_time])
    this.visibleResultsArr2.push(["Campus", this.results[0].course_info[0].campus])
    this.visibleResultsArr2.push(["Facility ID", this.results[0].course_info[0].facility_ID])
    for(let i=0; i < this.results[0].course_info[0].days.length; i++)this.daysString+=this.results[0].course_info[0].days[i]+" ";
    this.visibleResultsArr2.push(["Days", this.daysString])
    for(let i=0; i < this.results[0].course_info[0].instructors.length; i++)this.instructorsString+=this.results[0].course_info[0].instructors[i]+" ";
    this.visibleResultsArr2.push(["Instructors", this.instructorsString])
    this.visibleResultsArr2.push(["Class Section", this.results[0].course_info[0].class_section])
    this.visibleResultsArr2.push(["SSR Component", this.results[0].course_info[0].ssr_component])
    this.visibleResultsArr2.push(["Enrollment Status", this.results[0].course_info[0].enrl_stat])
    this.visibleResultsArr2.push(["Description", this.results[0].course_info[0].descr])
    this.visibleResultsArr2.push(["Catalog Description", this.results[0].catalog_description])


  }
  expand(){
    this.expandStatus=!this.expandStatus;
    if(this.expandStatus){
      this.inButton="Less";
    }else{
      this.inButton="More"
    }  
    
  }
  submit(){
    this.visibleResultsArr1=[]
    this.visibleResultsArr2=[]
    this.expandStatus=false;
    console.log(this.searchInput, this.courseInput)
    if(this.searchInput!=undefined||this.courseInput!=undefined ){
      this.http.post('http://' + window.location.hostname+':3000/public/unauthsearch', {query:this.searchInput, course:this.courseInput}).subscribe(data=>{
      try{
        
          this.resultsStatus=""
          this.results=this.getValue(data)
          this.got=true;
          this.visibleResults()
          this.expandedResults()
          this.inButton="More"
          //console.log(this.results)
          
      }catch{
          this.got=false;
          this.resultsStatus = "No entry found"

      }  
      
        }
      )}
      else{
        this.resultsStatus="Please enter something"
      }
      //console.log(this.results)
    }
  

}
