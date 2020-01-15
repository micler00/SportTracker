import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SportTrackerTestModule } from '../../../test.module';
import { PhysicalAppearanceUpdateComponent } from 'app/entities/physical-appearance/physical-appearance-update.component';
import { PhysicalAppearanceService } from 'app/entities/physical-appearance/physical-appearance.service';
import { PhysicalAppearance } from 'app/shared/model/physical-appearance.model';

describe('Component Tests', () => {
  describe('PhysicalAppearance Management Update Component', () => {
    let comp: PhysicalAppearanceUpdateComponent;
    let fixture: ComponentFixture<PhysicalAppearanceUpdateComponent>;
    let service: PhysicalAppearanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SportTrackerTestModule],
        declarations: [PhysicalAppearanceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PhysicalAppearanceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PhysicalAppearanceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhysicalAppearanceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PhysicalAppearance(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PhysicalAppearance();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
