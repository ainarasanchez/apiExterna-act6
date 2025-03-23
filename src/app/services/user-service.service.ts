import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private endPoint: string = 'https://peticiones.online/users';
  private httpClient = inject(HttpClient);

  getAll(): Promise<IUser[]> {
    return lastValueFrom(this.httpClient.get<IUser[]>(this.endPoint))
  }

  getById(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.endPoint}/${_id}`))
  }

  delete(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.endPoint}/${_id}`));
  }

  update(employee: IUser): Promise<IUser> {
    let { _id, ...user } = employee;
    return lastValueFrom(this.httpClient.put<IUser>(`${this.endPoint}/${_id}`, user)) 
  }

  insert(employee: IUser): Promise<IUser> {
    let { _id, ...user } = employee;
    return lastValueFrom(this.httpClient.post<IUser>(this.endPoint, user))
  }

}


