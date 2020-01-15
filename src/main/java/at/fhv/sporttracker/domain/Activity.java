package at.fhv.sporttracker.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Activity.
 */
@Entity
@Table(name = "activity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Activity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "cal_per_hour", nullable = false)
    private Double calPerHour;

    @OneToMany(mappedBy = "activity")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Workout> workouts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Activity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getCalPerHour() {
        return calPerHour;
    }

    public Activity calPerHour(Double calPerHour) {
        this.calPerHour = calPerHour;
        return this;
    }

    public void setCalPerHour(Double calPerHour) {
        this.calPerHour = calPerHour;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public Activity workouts(Set<Workout> workouts) {
        this.workouts = workouts;
        return this;
    }

    public Activity addWorkout(Workout workout) {
        this.workouts.add(workout);
        workout.setActivity(this);
        return this;
    }

    public Activity removeWorkout(Workout workout) {
        this.workouts.remove(workout);
        workout.setActivity(null);
        return this;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Activity)) {
            return false;
        }
        return id != null && id.equals(((Activity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Activity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", calPerHour=" + getCalPerHour() +
            "}";
    }
}
