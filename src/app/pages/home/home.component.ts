import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../../shared/user-card/user-card.component';

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsers: IUser[] = [];
  page = 1;
  totalPages = 2
  UsersService = inject(UserService);

  
    ngOnInit(): void {
      this.loadUsers();
    }
  
    async loadUsers() {
      try {
        const resp = await this.UsersService.getAllPromise(this.page);
        this.arrUsers = resp.results;
        this.page = resp.page;
        this.totalPages = resp.total_pages;
      } catch (err) {
        console.log(err);
      }
    }
  
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.loadUsers();
      }
    }
  
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.loadUsers();
      }
    }

    goToPage(pageNumber: number) {
      this.page = pageNumber;
      this.loadUsers();
    }
  }
  
  
  
/*

  deleteEmployee(event: Boolean) {
    if (event) {
      //refrescar la lista de empleados this.arrEmployees
      this.loadUsers()
    }
  }*/


