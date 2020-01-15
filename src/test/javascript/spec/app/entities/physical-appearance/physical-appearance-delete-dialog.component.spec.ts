import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SportTrackerTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { PhysicalAppearanceDeleteDialogComponent } from 'app/entities/physical-appearance/physical-appearance-delete-dialog.component';
import { PhysicalAppearanceService } from 'app/entities/physical-appearance/physical-appearance.service';

describe('Component Tests', () => {
  describe('PhysicalAppearance Management Delete Component', () => {
    let comp: PhysicalAppearanceDeleteDialogComponent;
    let fixture: ComponentFixture<PhysicalAppearanceDeleteDialogComponent>;
    let service: PhysicalAppearanceService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SportTrackerTestModule],
        declarations: [PhysicalAppearanceDeleteDialogComponent]
      })
        .overrideTemplate(PhysicalAppearanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PhysicalAppearanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhysicalAppearanceService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.clear();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
