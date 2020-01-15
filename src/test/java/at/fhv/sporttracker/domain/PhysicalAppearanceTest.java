package at.fhv.sporttracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import at.fhv.sporttracker.web.rest.TestUtil;

public class PhysicalAppearanceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PhysicalAppearance.class);
        PhysicalAppearance physicalAppearance1 = new PhysicalAppearance();
        physicalAppearance1.setId(1L);
        PhysicalAppearance physicalAppearance2 = new PhysicalAppearance();
        physicalAppearance2.setId(physicalAppearance1.getId());
        assertThat(physicalAppearance1).isEqualTo(physicalAppearance2);
        physicalAppearance2.setId(2L);
        assertThat(physicalAppearance1).isNotEqualTo(physicalAppearance2);
        physicalAppearance1.setId(null);
        assertThat(physicalAppearance1).isNotEqualTo(physicalAppearance2);
    }
}
