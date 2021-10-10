import { TestBed } from '@angular/core/testing';

import { EditedEvenementService } from './edited-evenement.service';

describe('EditedEvenementService', () => {
  let service: EditedEvenementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditedEvenementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
