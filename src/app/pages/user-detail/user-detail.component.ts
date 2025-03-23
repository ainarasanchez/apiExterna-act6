import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { toast } from 'ngx-sonner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [ButtonsComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  @Input() idUser: string = "";
  user!: IUser | null;
  UsersServices = inject(UserService);
  isLoading: boolean = false;

  async ngOnInit() {
    let _id = this.idUser;
    console.log(_id)
    this.isLoading = true;
    try {
      this.user = await this.UsersServices.getById(_id);
    } catch (msg: any) {
      toast.error(msg.error)
    } finally {
      this.isLoading = false;
    }
  }

}