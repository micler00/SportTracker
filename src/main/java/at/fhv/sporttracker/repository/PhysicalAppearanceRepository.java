package at.fhv.sporttracker.repository;

import at.fhv.sporttracker.domain.PhysicalAppearance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PhysicalAppearance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhysicalAppearanceRepository extends JpaRepository<PhysicalAppearance, Long> {

}
