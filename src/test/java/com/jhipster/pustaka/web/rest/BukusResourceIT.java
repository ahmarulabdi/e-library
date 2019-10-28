package com.jhipster.pustaka.web.rest;

import com.jhipster.pustaka.PustakaApp;
import com.jhipster.pustaka.domain.Bukus;
import com.jhipster.pustaka.repository.BukusRepository;
import com.jhipster.pustaka.web.rest.errors.ExceptionTranslator;

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

import static com.jhipster.pustaka.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BukusResource} REST controller.
 */
@SpringBootTest(classes = PustakaApp.class)
public class BukusResourceIT {

    private static final String DEFAULT_NAMA = "AAAAAAAAAA";
    private static final String UPDATED_NAMA = "BBBBBBBBBB";

    private static final String DEFAULT_PENGARANG = "AAAAAAAAAA";
    private static final String UPDATED_PENGARANG = "BBBBBBBBBB";

    @Autowired
    private BukusRepository bukusRepository;

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

    private MockMvc restBukusMockMvc;

    private Bukus bukus;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BukusResource bukusResource = new BukusResource(bukusRepository);
        this.restBukusMockMvc = MockMvcBuilders.standaloneSetup(bukusResource)
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
    public static Bukus createEntity(EntityManager em) {
        Bukus bukus = new Bukus()
            .nama(DEFAULT_NAMA)
            .pengarang(DEFAULT_PENGARANG);
        return bukus;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bukus createUpdatedEntity(EntityManager em) {
        Bukus bukus = new Bukus()
            .nama(UPDATED_NAMA)
            .pengarang(UPDATED_PENGARANG);
        return bukus;
    }

    @BeforeEach
    public void initTest() {
        bukus = createEntity(em);
    }

    @Test
    @Transactional
    public void createBukus() throws Exception {
        int databaseSizeBeforeCreate = bukusRepository.findAll().size();

        // Create the Bukus
        restBukusMockMvc.perform(post("/api/bukuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bukus)))
            .andExpect(status().isCreated());

        // Validate the Bukus in the database
        List<Bukus> bukusList = bukusRepository.findAll();
        assertThat(bukusList).hasSize(databaseSizeBeforeCreate + 1);
        Bukus testBukus = bukusList.get(bukusList.size() - 1);
        assertThat(testBukus.getNama()).isEqualTo(DEFAULT_NAMA);
        assertThat(testBukus.getPengarang()).isEqualTo(DEFAULT_PENGARANG);
    }

    @Test
    @Transactional
    public void createBukusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bukusRepository.findAll().size();

        // Create the Bukus with an existing ID
        bukus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBukusMockMvc.perform(post("/api/bukuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bukus)))
            .andExpect(status().isBadRequest());

        // Validate the Bukus in the database
        List<Bukus> bukusList = bukusRepository.findAll();
        assertThat(bukusList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNamaIsRequired() throws Exception {
        int databaseSizeBeforeTest = bukusRepository.findAll().size();
        // set the field null
        bukus.setNama(null);

        // Create the Bukus, which fails.

        restBukusMockMvc.perform(post("/api/bukuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bukus)))
            .andExpect(status().isBadRequest());

        List<Bukus> bukusList = bukusRepository.findAll();
        assertThat(bukusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPengarangIsRequired() throws Exception {
        int databaseSizeBeforeTest = bukusRepository.findAll().size();
        // set the field null
        bukus.setPengarang(null);

        // Create the Bukus, which fails.

        restBukusMockMvc.perform(post("/api/bukuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bukus)))
            .andExpect(status().isBadRequest());

        List<Bukus> bukusList = bukusRepository.findAll();
        assertThat(bukusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBukuses() throws Exception {
        // Initialize the database
        bukusRepository.saveAndFlush(bukus);

        // Get all the bukusList
        restBukusMockMvc.perform(get("/api/bukuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bukus.getId().intValue())))
            .andExpect(jsonPath("$.[*].nama").value(hasItem(DEFAULT_NAMA)))
            .andExpect(jsonPath("$.[*].pengarang").value(hasItem(DEFAULT_PENGARANG)));
    }
    
    @Test
    @Transactional
    public void getBukus() throws Exception {
        // Initialize the database
        bukusRepository.saveAndFlush(bukus);

        // Get the bukus
        restBukusMockMvc.perform(get("/api/bukuses/{id}", bukus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bukus.getId().intValue()))
            .andExpect(jsonPath("$.nama").value(DEFAULT_NAMA))
            .andExpect(jsonPath("$.pengarang").value(DEFAULT_PENGARANG));
    }

    @Test
    @Transactional
    public void getNonExistingBukus() throws Exception {
        // Get the bukus
        restBukusMockMvc.perform(get("/api/bukuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBukus() throws Exception {
        // Initialize the database
        bukusRepository.saveAndFlush(bukus);

        int databaseSizeBeforeUpdate = bukusRepository.findAll().size();

        // Update the bukus
        Bukus updatedBukus = bukusRepository.findById(bukus.getId()).get();
        // Disconnect from session so that the updates on updatedBukus are not directly saved in db
        em.detach(updatedBukus);
        updatedBukus
            .nama(UPDATED_NAMA)
            .pengarang(UPDATED_PENGARANG);

        restBukusMockMvc.perform(put("/api/bukuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBukus)))
            .andExpect(status().isOk());

        // Validate the Bukus in the database
        List<Bukus> bukusList = bukusRepository.findAll();
        assertThat(bukusList).hasSize(databaseSizeBeforeUpdate);
        Bukus testBukus = bukusList.get(bukusList.size() - 1);
        assertThat(testBukus.getNama()).isEqualTo(UPDATED_NAMA);
        assertThat(testBukus.getPengarang()).isEqualTo(UPDATED_PENGARANG);
    }

    @Test
    @Transactional
    public void updateNonExistingBukus() throws Exception {
        int databaseSizeBeforeUpdate = bukusRepository.findAll().size();

        // Create the Bukus

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBukusMockMvc.perform(put("/api/bukuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bukus)))
            .andExpect(status().isBadRequest());

        // Validate the Bukus in the database
        List<Bukus> bukusList = bukusRepository.findAll();
        assertThat(bukusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBukus() throws Exception {
        // Initialize the database
        bukusRepository.saveAndFlush(bukus);

        int databaseSizeBeforeDelete = bukusRepository.findAll().size();

        // Delete the bukus
        restBukusMockMvc.perform(delete("/api/bukuses/{id}", bukus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bukus> bukusList = bukusRepository.findAll();
        assertThat(bukusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bukus.class);
        Bukus bukus1 = new Bukus();
        bukus1.setId(1L);
        Bukus bukus2 = new Bukus();
        bukus2.setId(bukus1.getId());
        assertThat(bukus1).isEqualTo(bukus2);
        bukus2.setId(2L);
        assertThat(bukus1).isNotEqualTo(bukus2);
        bukus1.setId(null);
        assertThat(bukus1).isNotEqualTo(bukus2);
    }
}
