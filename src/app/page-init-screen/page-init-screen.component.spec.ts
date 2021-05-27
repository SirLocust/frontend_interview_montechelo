import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInitScreenComponent } from './page-init-screen.component';

describe('PageInitScreenComponent', () => {
  let component: PageInitScreenComponent;
  let fixture: ComponentFixture<PageInitScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageInitScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInitScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
