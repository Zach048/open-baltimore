import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReviewsComponent implements OnInit {
  columnsToDisplay: string[] = ['restaurant', 'address', 'zipcode', 'neighborhood'];
    dataSource = new MatTableDataSource();
    reviews: any = [];
    api = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
    this.http.get(this.api + 'review/all/user@email.com').subscribe((data: any) => {
      this.dataSource.data = data;
      this.reviews = data;
      console.log(this.reviews);
    });
  }

  ngOnInit(): void {
  }

}
