import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaItemComponent } from './mesa-item.component';

describe('MesaItemComponent', () => {
  let component: MesaItemComponent;
  let fixture: ComponentFixture<MesaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesaItemComponent]
    });
    fixture = TestBed.createComponent(MesaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
