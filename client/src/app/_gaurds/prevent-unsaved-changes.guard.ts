import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MembersEditComponent } from '../members/members-edit/members-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MembersEditComponent> {
  canDeactivate(component: MembersEditComponent): boolean {
    if(component.editForm?.dirty){
      return confirm('Are you sure to countinue? Any unsaved chages will be lost');
    }
    return true;
  }

}
