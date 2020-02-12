import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchTerm: string;
  
  constructor() { }

  ngOnInit() {
  }

  public doSearch(): void {
    if (this.searchTerm.trim().length > 0) {
      console.log(`Search for : ${this.searchTerm}`);
    }
  }

}
