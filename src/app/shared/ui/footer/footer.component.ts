import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/core/models/user-interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public user: UserInterface;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }

}
