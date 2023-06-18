import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectspicsComponent } from './projectspics.component';

describe('ProjectspicsComponent', () => {
  let component: ProjectspicsComponent;
  let fixture: ComponentFixture<ProjectspicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectspicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectspicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
