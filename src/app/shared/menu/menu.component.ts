import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  @Output() pageClicked: EventEmitter<void> = new EventEmitter<void>();
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService){

  }

  ngOnInit(){
    this.authService.isUserLoggedIn().subscribe(user =>{
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    })
  }

  onPageClicked(){
    this.pageClicked.emit();
  }

  onSelectPage(register: string) {

  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Logged out successfully!');
    }).catch(error =>{
      console.error(error);
    });
  }
}
