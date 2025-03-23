import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() idUser: string = "";
  userForm: FormGroup = new FormGroup({}, [])
  user!: IUser;
  usersService = inject(UserService);
  title: string = "Registrar";
  router = inject(Router);

  async ngOnInit() {

    if (this.idUser) {
      try {
        this.user = await this.usersService.getById(this.idUser);
        this.title = 'Actualizar'
      } catch (msg: any) {
        toast.error(msg.error.error)
      }
    }

    this.userForm =  new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      apellidos: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      imagen: new FormControl("", [
        Validators.required,
      ]),
    }, [])

  }

  async getDataForm() {
    let response: IUser | any
    try {
      if (this.userForm.value._id) {
        response = await this.usersService.update(this.userForm.value);
      } else {
        response = await this.usersService.insert(this.userForm.value)
      }

    } catch (msg: any) {
      if (msg.status === 400) {
        msg.error.forEach((oneError: any) => toast.error(oneError.message))
      }
    }
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }

}
