import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFailureNotificationComponent } from './purchase-failure-notification.component';

describe('PurchaseFailureNotificationComponent', () => {
  let component: PurchaseFailureNotificationComponent;
  let fixture: ComponentFixture<PurchaseFailureNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseFailureNotificationComponent]
    });
    fixture = TestBed.createComponent(PurchaseFailureNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
