import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SportTrackerTestModule } from '../../../test.module';
import { PhysicalAppearanceComponent } from 'app/entities/physical-appearance/physical-appearance.component';
import { PhysicalAppearanceService } from 'app/entities/physical-appearance/physical-appearance.service';
import { PhysicalAppearance } from 'app/shared/model/physical-appearance.model';

describe('Component Tests', () => {
  describe('PhysicalAppearance Management Component', () => {
    let comp: PhysicalAppearanceComponent;
    let fixture: ComponentFixture<PhysicalAppearanceComponent>;
    let service: PhysicalAppearanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SportTrackerTestModule],
        declarations: [PhysicalAppearanceComponent],
        providers: []
      })
        .overrideTemplate(PhysicalAppearanceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PhysicalAppearanceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhysicalAppearanceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PhysicalAppearance(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.physicalAppearances && comp.physicalAppearances[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
