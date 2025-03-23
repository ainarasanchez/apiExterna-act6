import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() myUser: IUser | any;

  UsersService = inject(UserService)
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  router = inject(Router);

  @Input() volver: Boolean = false;

  deleteUser(_id: string) {
    toast(`Vas a borrar al empleado ${this.myUser.nombre} ${this.myUser.apellidos} `, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          await this.UsersService.delete(_id)
          if (this.deleteItemEmit.observed) {
            this.deleteItemEmit.emit(true)
          } else {
            this.router.navigate(['/dashboard', 'empleados'])
          }

        }
      }
    });
  }
}
