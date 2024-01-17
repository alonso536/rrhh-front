import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../auth/interfaces';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {
  private userService: UserService = inject(UserService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  public title: string = 'Show user';
  public user?: User;

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe(params => {
      let id: number = +params.get('id')!;
      if(id < 0) {
        this.router.navigateByUrl("/404");
      };

      this.userService.show(id)
        .pipe(
          catchError(response => {
            this.router.navigateByUrl("/404");
            return of(response.error);
          })
        )
        .subscribe(response => {
          this.user = response.payload;
        });
    }
  );
  }
}
