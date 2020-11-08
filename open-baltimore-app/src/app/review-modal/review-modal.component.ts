import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {
  reviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.maxLength(200)])
  });


  constructor(private dialogRef: MatDialogRef<ReviewModalComponent>) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(this.reviewForm.value);
}

close(): void {
    this.dialogRef.close();
}

}
