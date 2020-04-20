import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {MessengerApiService} from '../messenger-api.service';
import {GrandService} from '../grand.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  friends: User[];

  constructor(private api: MessengerApiService, private grand: GrandService) {
  }

  ngOnInit(): void {
    this.getChats();
  }

  getChats() {
    const info = this.grand.getInfo();
    this.api.getFriendsInfo(info.userId)
      .subscribe(
        (doc) => {
          this.friends = doc;
        }
      );
  }
}
