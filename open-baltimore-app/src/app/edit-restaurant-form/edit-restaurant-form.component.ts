import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-restaurant-form',
  templateUrl: './edit-restaurant-form.component.html',
  styleUrls: ['./edit-restaurant-form.component.css']
})
export class EditRestaurantFormComponent implements OnInit {
  // form validation
  editRestaurantForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    zip: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    neighborhood: new FormControl('', [Validators.required, Validators.maxLength(50)])

  });

  constructor(private dialogRef: MatDialogRef<EditRestaurantFormComponent>, @Inject(MAT_DIALOG_DATA) data) {
    // set values on form from data injected from dialog config
    this.editRestaurantForm.get('name').setValue(data.name);
    this.editRestaurantForm.get('address').setValue(data.address);
    this.editRestaurantForm.get('zip').setValue(data.zip);
    this.editRestaurantForm.get('neighborhood').setValue(data.neighborhood);

  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(this.editRestaurantForm.value);
}

close(): void {
    this.dialogRef.close();
}


}
