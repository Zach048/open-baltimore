import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-restaurant-form',
  templateUrl: './new-restaurant-form.component.html',
  styleUrls: ['./new-restaurant-form.component.css']
})
export class NewRestaurantFormComponent implements OnInit {
  // form validation
  newRestaurantForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    zip: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    neighborhood: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(private dialogRef: MatDialogRef<NewRestaurantFormComponent>) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(this.newRestaurantForm.value);
}

close(): void {
    this.dialogRef.close();
}

}
