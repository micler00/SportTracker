package at.fhv.sporttracker.web.rest;

import at.fhv.sporttracker.SportTrackerApp;
import at.fhv.sporttracker.domain.PhysicalAppearance;
import at.fhv.sporttracker.repository.PhysicalAppearanceRepository;
import at.fhv.sporttracker.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static at.fhv.sporttracker.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PhysicalAppearanceResource} REST controller.
 */
@SpringBootTest(classes = SportTrackerApp.class)
public class PhysicalAppearanceResourceIT {

    private static final Double DEFAULT_WEIGHT = 1D;
    private static final Double UPDATED_WEIGHT = 2D;

    private static final Double DEFAULT_HEIGHT = 1D;
    private static final Double UPDATED_HEIGHT = 2D;

    @Autowired
    private PhysicalAppearanceRepository physicalAppearanceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPhysicalAppearanceMockMvc;

    private PhysicalAppearance physicalAppearance;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PhysicalAppearanceResource physicalAppearanceResource = new PhysicalAppearanceResource(physicalAppearanceRepository);
        this.restPhysicalAppearanceMockMvc = MockMvcBuilders.standaloneSetup(physicalAppearanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PhysicalAppearance createEntity(EntityManager em) {
        PhysicalAppearance physicalAppearance = new PhysicalAppearance()
            .weight(DEFAULT_WEIGHT)
            .height(DEFAULT_HEIGHT);
        return physicalAppearance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PhysicalAppearance createUpdatedEntity(EntityManager em) {
        PhysicalAppearance physicalAppearance = new PhysicalAppearance()
            .weight(UPDATED_WEIGHT)
            .height(UPDATED_HEIGHT);
        return physicalAppearance;
    }

    @BeforeEach
    public void initTest() {
        physicalAppearance = createEntity(em);
    }

    @Test
    @Transactional
    public void createPhysicalAppearance() throws Exception {
        int databaseSizeBeforeCreate = physicalAppearanceRepository.findAll().size();

        // Create the PhysicalAppearance
        restPhysicalAppearanceMockMvc.perform(post("/api/physical-appearances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(physicalAppearance)))
            .andExpect(status().isCreated());

        // Validate the PhysicalAppearance in the database
        List<PhysicalAppearance> physicalAppearanceList = physicalAppearanceRepository.findAll();
        assertThat(physicalAppearanceList).hasSize(databaseSizeBeforeCreate + 1);
        PhysicalAppearance testPhysicalAppearance = physicalAppearanceList.get(physicalAppearanceList.size() - 1);
        assertThat(testPhysicalAppearance.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testPhysicalAppearance.getHeight()).isEqualTo(DEFAULT_HEIGHT);
    }

    @Test
    @Transactional
    public void createPhysicalAppearanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = physicalAppearanceRepository.findAll().size();

        // Create the PhysicalAppearance with an existing ID
        physicalAppearance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhysicalAppearanceMockMvc.perform(post("/api/physical-appearances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(physicalAppearance)))
            .andExpect(status().isBadRequest());

        // Validate the PhysicalAppearance in the database
        List<PhysicalAppearance> physicalAppearanceList = physicalAppearanceRepository.findAll();
        assertThat(physicalAppearanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = physicalAppearanceRepository.findAll().size();
        // set the field null
        physicalAppearance.setWeight(null);

        // Create the PhysicalAppearance, which fails.

        restPhysicalAppearanceMockMvc.perform(post("/api/physical-appearances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(physicalAppearance)))
            .andExpect(status().isBadRequest());

        List<PhysicalAppearance> physicalAppearanceList = physicalAppearanceRepository.findAll();
        assertThat(physicalAppearanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPhysicalAppearances() throws Exception {
        // Initialize the database
        physicalAppearanceRepository.saveAndFlush(physicalAppearance);

        // Get all the physicalAppearanceList
        restPhysicalAppearanceMockMvc.perform(get("/api/physical-appearances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(physicalAppearance.getId().intValue())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPhysicalAppearance() throws Exception {
        // Initialize the database
        physicalAppearanceRepository.saveAndFlush(physicalAppearance);

        // Get the physicalAppearance
        restPhysicalAppearanceMockMvc.perform(get("/api/physical-appearances/{id}", physicalAppearance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(physicalAppearance.getId().intValue()))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPhysicalAppearance() throws Exception {
        // Get the physicalAppearance
        restPhysicalAppearanceMockMvc.perform(get("/api/physical-appearances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhysicalAppearance() throws Exception {
        // Initialize the database
        physicalAppearanceRepository.saveAndFlush(physicalAppearance);

        int databaseSizeBeforeUpdate = physicalAppearanceRepository.findAll().size();

        // Update the physicalAppearance
        PhysicalAppearance updatedPhysicalAppearance = physicalAppearanceRepository.findById(physicalAppearance.getId()).get();
        // Disconnect from session so that the updates on updatedPhysicalAppearance are not directly saved in db
        em.detach(updatedPhysicalAppearance);
        updatedPhysicalAppearance
            .weight(UPDATED_WEIGHT)
            .height(UPDATED_HEIGHT);

        restPhysicalAppearanceMockMvc.perform(put("/api/physical-appearances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPhysicalAppearance)))
            .andExpect(status().isOk());

        // Validate the PhysicalAppearance in the database
        List<PhysicalAppearance> physicalAppearanceList = physicalAppearanceRepository.findAll();
        assertThat(physicalAppearanceList).hasSize(databaseSizeBeforeUpdate);
        PhysicalAppearance testPhysicalAppearance = physicalAppearanceList.get(physicalAppearanceList.size() - 1);
        assertThat(testPhysicalAppearance.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testPhysicalAppearance.getHeight()).isEqualTo(UPDATED_HEIGHT);
    }

    @Test
    @Transactional
    public void updateNonExistingPhysicalAppearance() throws Exception {
        int databaseSizeBeforeUpdate = physicalAppearanceRepository.findAll().size();

        // Create the PhysicalAppearance

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPhysicalAppearanceMockMvc.perform(put("/api/physical-appearances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(physicalAppearance)))
            .andExpect(status().isBadRequest());

        // Validate the PhysicalAppearance in the database
        List<PhysicalAppearance> physicalAppearanceList = physicalAppearanceRepository.findAll();
        assertThat(physicalAppearanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePhysicalAppearance() throws Exception {
        // Initialize the database
        physicalAppearanceRepository.saveAndFlush(physicalAppearance);

        int databaseSizeBeforeDelete = physicalAppearanceRepository.findAll().size();

        // Delete the physicalAppearance
        restPhysicalAppearanceMockMvc.perform(delete("/api/physical-appearances/{id}", physicalAppearance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PhysicalAppearance> physicalAppearanceList = physicalAppearanceRepository.findAll();
        assertThat(physicalAppearanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
