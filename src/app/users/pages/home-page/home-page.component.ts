import { Component, inject } from '@angular/core';
import { User } from '../../../auth/interfaces';
import { PageResponse } from '../../../shared/interfaces/page-response.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public title: string = 'Users list';
  public users: User[] = [];
  public page: number = 1;
  public paginator!: PageResponse<User>;

  public userService: UserService = inject(UserService);
  public activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        let page: number = +params.get('page')!;
        if(page != 0) {
          this.page = page;
        };

        this.userService.index(this.page - 1)
          .subscribe(response => {
            this.paginator = response.payload;
            this.users = response.payload.content;
          });
      }
    );     
  }

  destroy(user: User): void {
    Swal.fire({
      title: 'Are you sure that want to delete this user?',
      text: 'This action is irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#085d6',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.destroy(user.id).subscribe(
          response => {
            this.users = this.users.filter(u => u.id != user.id);
            Swal.fire(
              'User deleted',
              'User deleted successfully',
              'success'
            )
          }
        );
      }
    })
  }
}
