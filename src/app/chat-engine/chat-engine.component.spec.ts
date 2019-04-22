import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEngineComponent } from './chat-engine.component';

describe('ChatEngineComponent', () => {
  let component: ChatEngineComponent;
  let fixture: ComponentFixture<ChatEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
