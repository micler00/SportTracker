package at.fhv.sporttracker.repository;

import at.fhv.sporttracker.domain.Workout;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Workout entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {

}
