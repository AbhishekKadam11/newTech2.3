import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { NbMenuService, NbSidebarService, NbSearchService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { Router } from '@angular/router';
import { UserService } from '../../../pages/login/user.service';
import { GlobalShared } from '../../../app.global';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position: string = 'normal';

  user: any;
  public logged: boolean = false;
  public profileName: string;
  public profilePic: string;
  public userId: string;
  public hidebttn: boolean = false;
  menuClick: EventEmitter<NbMenuService>;
  searchString: string;

  userMenu = [{ title: 'Profile', path: 'profile'  }, { title: 'Log out' , path: 'logout' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private router: Router,
              public globalShared: GlobalShared,
              private userService: UserService,
              private searchService: NbSearchService) {
  }

  ngOnInit() {
  //  console.log(this.userService.profileName);
    if ( this.userService.profileName ) {
      this.logged = this.userService.loggedIn;
      this.profileName = this.userService.profileName;
      this.profilePic = this.userService.basicdata['profilePic'];
      this.userId = this.userService.userId;
      this.hidebttn = true;
    }

    this.searchService.onSearchSubmit().subscribe((result) => {
    //  this.searchString = result;
      this.router.navigate(['/pages/searchresult', result.term]);
    //  console.log(result.term);
    })
  }

  onMenuClick(path) {
    if (path === 'profile') {
      this.router.navigate(['/pages/profile']);
    }
    if (path === 'logout') {
   //   this.userService.logout();
      this.router.navigate(['/pages/dashboard']);
      this.hidebttn = false;
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  // toggleSettings(): boolean {
  //   this.sidebarService.toggle(false, 'settings-sidebar');
  //   return false;
  // }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  // searchServicesubmitSearch() {
  //   console.log('text');
  // }
}
