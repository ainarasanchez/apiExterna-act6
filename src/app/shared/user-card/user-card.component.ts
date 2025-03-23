import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { ButtonsComponent } from "../buttons/buttons.component";

@Component({
  selector: '[app-user-card]',
  imports: [ButtonsComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: IUser

  deleteUser(event: Boolean) {

  }

}
