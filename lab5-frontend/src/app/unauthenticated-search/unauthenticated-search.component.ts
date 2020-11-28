import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'

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

  ngOnInit(): void {
  }
  getValue(data){
    return data.value;
  }
  submit(){
    this.http.post('http://' + window.location.hostname+':3000/public/unauthsearch', {query:this.searchInput, course:this.courseInput}).subscribe(data=>{
      this.results=this.getValue(data)
      //console.log(this.results)
    })
  }

}
