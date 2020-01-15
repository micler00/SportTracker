package at.fhv.sporttracker.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "e_mail")
    private String eMail;

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Workout> workouts = new HashSet<>();

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PhysicalAppearance> physicalAppearances = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Patient firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Patient lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public Patient gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Patient dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String geteMail() {
        return eMail;
    }

    public Patient eMail(String eMail) {
        this.eMail = eMail;
        return this;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public Patient workouts(Set<Workout> workouts) {
        this.workouts = workouts;
        return this;
    }

    public Patient addWorkout(Workout workout) {
        this.workouts.add(workout);
        workout.setPatient(this);
        return this;
    }

    public Patient removeWorkout(Workout workout) {
        this.workouts.remove(workout);
        workout.setPatient(null);
        return this;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }

    public Set<PhysicalAppearance> getPhysicalAppearances() {
        return physicalAppearances;
    }

    public Patient physicalAppearances(Set<PhysicalAppearance> physicalAppearances) {
        this.physicalAppearances = physicalAppearances;
        return this;
    }

    public Patient addPhysicalAppearance(PhysicalAppearance physicalAppearance) {
        this.physicalAppearances.add(physicalAppearance);
        physicalAppearance.setPatient(this);
        return this;
    }

    public Patient removePhysicalAppearance(PhysicalAppearance physicalAppearance) {
        this.physicalAppearances.remove(physicalAppearance);
        physicalAppearance.setPatient(null);
        return this;
    }

    public void setPhysicalAppearances(Set<PhysicalAppearance> physicalAppearances) {
        this.physicalAppearances = physicalAppearances;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Patient)) {
            return false;
        }
        return id != null && id.equals(((Patient) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", gender='" + getGender() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", eMail='" + geteMail() + "'" +
            "}";
    }
}
