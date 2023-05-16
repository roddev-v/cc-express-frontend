import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  showNotification(message: string): void {
    this.snackbar.open(message, undefined, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 5000
    });
  }
}
