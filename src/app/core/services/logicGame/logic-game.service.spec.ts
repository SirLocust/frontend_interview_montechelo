import { TestBed } from '@angular/core/testing';

import { LogicGameService } from './logic-game.service';

describe('LogicGameService', () => {
  let service: LogicGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
