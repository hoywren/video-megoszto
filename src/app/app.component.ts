import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {AuthService} from "./shared/services/auth.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'video-megoszto';
  currentPage: string = 'home';
  isAuthenticated: boolean = false;
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    let routes = this.router.config.map(conf => conf.path) as string[];
    console.log(routes);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((events : any) => {
      let page = (events.urlAfterRedirects as string).substring(1) as string;

      if (routes.includes(page))
        this.currentPage = page;

    });

    this.authService.isUserLoggedIn().subscribe(user =>{
      console.log(user);
      this.loggedInUser = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      }
    }, error => {
      console.error(error);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('user', JSON.stringify('null'));
      }
    })
  }

  changePage(selectedPage: string){
    this.router.navigateByUrl(selectedPage);
  }

  logout(){

  }
}
