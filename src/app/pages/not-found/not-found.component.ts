import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  colors = ['red', 'green', 'yellow', 'purple'];
  currColors: string[] = ['red'];

  onClick() {
    console.log("clicked")
    this.currColors.push(this.colors[this.currColors.length])
  }
}
