import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SportTrackerTestModule } from '../../../test.module';
import { PhysicalAppearanceDetailComponent } from 'app/entities/physical-appearance/physical-appearance-detail.component';
import { PhysicalAppearance } from 'app/shared/model/physical-appearance.model';

describe('Component Tests', () => {
  describe('PhysicalAppearance Management Detail Component', () => {
    let comp: PhysicalAppearanceDetailComponent;
    let fixture: ComponentFixture<PhysicalAppearanceDetailComponent>;
    const route = ({ data: of({ physicalAppearance: new PhysicalAppearance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SportTrackerTestModule],
        declarations: [PhysicalAppearanceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PhysicalAppearanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PhysicalAppearanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load physicalAppearance on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.physicalAppearance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
