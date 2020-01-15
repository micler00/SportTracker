package at.fhv.sporttracker.web.rest;

import at.fhv.sporttracker.domain.PhysicalAppearance;
import at.fhv.sporttracker.repository.PhysicalAppearanceRepository;
import at.fhv.sporttracker.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link at.fhv.sporttracker.domain.PhysicalAppearance}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PhysicalAppearanceResource {

    private final Logger log = LoggerFactory.getLogger(PhysicalAppearanceResource.class);

    private static final String ENTITY_NAME = "physicalAppearance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PhysicalAppearanceRepository physicalAppearanceRepository;

    public PhysicalAppearanceResource(PhysicalAppearanceRepository physicalAppearanceRepository) {
        this.physicalAppearanceRepository = physicalAppearanceRepository;
    }

    /**
     * {@code POST  /physical-appearances} : Create a new physicalAppearance.
     *
     * @param physicalAppearance the physicalAppearance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new physicalAppearance, or with status {@code 400 (Bad Request)} if the physicalAppearance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/physical-appearances")
    public ResponseEntity<PhysicalAppearance> createPhysicalAppearance(@Valid @RequestBody PhysicalAppearance physicalAppearance) throws URISyntaxException {
        log.debug("REST request to save PhysicalAppearance : {}", physicalAppearance);
        if (physicalAppearance.getId() != null) {
            throw new BadRequestAlertException("A new physicalAppearance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PhysicalAppearance result = physicalAppearanceRepository.save(physicalAppearance);
        return ResponseEntity.created(new URI("/api/physical-appearances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /physical-appearances} : Updates an existing physicalAppearance.
     *
     * @param physicalAppearance the physicalAppearance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated physicalAppearance,
     * or with status {@code 400 (Bad Request)} if the physicalAppearance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the physicalAppearance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/physical-appearances")
    public ResponseEntity<PhysicalAppearance> updatePhysicalAppearance(@Valid @RequestBody PhysicalAppearance physicalAppearance) throws URISyntaxException {
        log.debug("REST request to update PhysicalAppearance : {}", physicalAppearance);
        if (physicalAppearance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PhysicalAppearance result = physicalAppearanceRepository.save(physicalAppearance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, physicalAppearance.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /physical-appearances} : get all the physicalAppearances.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of physicalAppearances in body.
     */
    @GetMapping("/physical-appearances")
    public List<PhysicalAppearance> getAllPhysicalAppearances() {
        log.debug("REST request to get all PhysicalAppearances");
        return physicalAppearanceRepository.findAll();
    }

    /**
     * {@code GET  /physical-appearances/:id} : get the "id" physicalAppearance.
     *
     * @param id the id of the physicalAppearance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the physicalAppearance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/physical-appearances/{id}")
    public ResponseEntity<PhysicalAppearance> getPhysicalAppearance(@PathVariable Long id) {
        log.debug("REST request to get PhysicalAppearance : {}", id);
        Optional<PhysicalAppearance> physicalAppearance = physicalAppearanceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(physicalAppearance);
    }

    /**
     * {@code DELETE  /physical-appearances/:id} : delete the "id" physicalAppearance.
     *
     * @param id the id of the physicalAppearance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/physical-appearances/{id}")
    public ResponseEntity<Void> deletePhysicalAppearance(@PathVariable Long id) {
        log.debug("REST request to delete PhysicalAppearance : {}", id);
        physicalAppearanceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
