import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endPoint: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getAllPromise(url: string): Promise<IResponse> {
    url = (url === "") ? 'https://peticiones.online/api/users' : url
    return lastValueFrom(this.httpClient.get<IResponse>(url))
  }

  getById(_id: number): Promise<IUser> {
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


