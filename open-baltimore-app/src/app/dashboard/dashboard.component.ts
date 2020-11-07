import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { NewRestaurantFormComponent } from '../new-restaurant-form/new-restaurant-form.component';
import { EditRestaurantFormComponent } from '../edit-restaurant-form/edit-restaurant-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements AfterViewInit {

    public restaurants: any = [];
    api = 'http://localhost:8080/';
    public restaurant: any = {};

    displayedColumns: string[] = ['restaurant', 'address', 'zipcode', 'neighborhood', 'restaurantChange', 'closedRestaurant'];
    dataSource = new MatTableDataSource();
    // References to table elements
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable, {static: true}) table: MatTable<any>;

    constructor(private http: HttpClient, private dialog: MatDialog) {
      this.http.get(this.api + 'restaurant/all').subscribe((data: any) => {
        this.dataSource.data = data;
        this.restaurants = data;
      });
    }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    /* Opens dialoge to add restaurant when button is pushed */
    addRestaurant(): void {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      const dialogRef = this.dialog.open(NewRestaurantFormComponent, dialogConfig);
      this.saveRestaurant(dialogRef);

    }

    /* Saves restaurant to database and propagates table accordingly */
    saveRestaurant(dialogRef, id?): void {
      if (id != null) {
        this.restaurant.id = id;
      }
      dialogRef.afterClosed().subscribe(data => {
        if (data === null) { return; }
        this.restaurant.name = data.name;
        this.restaurant.address = data.address;
        this.restaurant.zipCode = data.zip;
        this.restaurant.neighborhood = data.neighborhood;
        // add data
        if (!id) {
          this.http.post(this.api + 'restaurant/save', this.restaurant).subscribe((data: any) => {
            this.restaurant.id = data;
            this.restaurants.push(this.restaurant);
            this.dataSource.data = this.restaurants;
          },
          error => console.error('Error adding restaurant', error));
        }
          // update data
          else{
            this.http.put(this.api + 'restaurant/update', this.restaurant)
            .subscribe(
              response => console.log('Successfully updated restaurant', response),
              error => console.error('Error updating restaurant', error)
            );
            const index = this.restaurants.findIndex((item) => item.id === id);
            if (index > -1) {
                this.restaurants[index] = this.restaurant;
            }
            this.dataSource.data = this.restaurants;
          }
      });
    }
      /* Opens dialoge to edit restaurant when button is pushed */
      editRestaurant(r: any): void {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      // Sends data to NewRestaurantFormComponent
      dialogConfig.data = {
          name: r.name,
          address: r.address,
          zip: r.zipCode,
          neighborhood: r.neighborhood
      };

      this.dialog.open(EditRestaurantFormComponent, dialogConfig);

      const dialogRef = this.dialog.open(EditRestaurantFormComponent, dialogConfig);
      this.saveRestaurant(dialogRef, r.id);
    }
    /* Opens dialoge to delete restaurant when button is pushed */
    deleteRestaurant(r: any): void {
      if (confirm('Are you sure you want to delete ' + r.name + '?')) { // prompts user for confirmation
      this.http.post(this.api + 'restaurant/delete', r.id)
      .subscribe(
        response => console.log('Successfully deleted restaurant', response),
        error => console.error('Error deleting restaurant', error)
      );
      const index =  this.restaurants.findIndex(x => x.id === r.id);
      this.restaurants.splice(index, 1);
      this.dataSource.data = this.restaurants;
    }
  }
}
