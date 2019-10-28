package com.jhipster.pustaka.web.rest;

import com.jhipster.pustaka.PustakaApp;
import com.jhipster.pustaka.domain.Anggotas;
import com.jhipster.pustaka.repository.AnggotasRepository;
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
 * Integration tests for the {@link AnggotasResource} REST controller.
 */
@SpringBootTest(classes = PustakaApp.class)
public class AnggotasResourceIT {

    private static final String DEFAULT_NAMA = "AAAAAAAAAA";
    private static final String UPDATED_NAMA = "BBBBBBBBBB";

    @Autowired
    private AnggotasRepository anggotasRepository;

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

    private MockMvc restAnggotasMockMvc;

    private Anggotas anggotas;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnggotasResource anggotasResource = new AnggotasResource(anggotasRepository);
        this.restAnggotasMockMvc = MockMvcBuilders.standaloneSetup(anggotasResource)
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
    public static Anggotas createEntity(EntityManager em) {
        Anggotas anggotas = new Anggotas()
            .nama(DEFAULT_NAMA);
        return anggotas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Anggotas createUpdatedEntity(EntityManager em) {
        Anggotas anggotas = new Anggotas()
            .nama(UPDATED_NAMA);
        return anggotas;
    }

    @BeforeEach
    public void initTest() {
        anggotas = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnggotas() throws Exception {
        int databaseSizeBeforeCreate = anggotasRepository.findAll().size();

        // Create the Anggotas
        restAnggotasMockMvc.perform(post("/api/anggotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anggotas)))
            .andExpect(status().isCreated());

        // Validate the Anggotas in the database
        List<Anggotas> anggotasList = anggotasRepository.findAll();
        assertThat(anggotasList).hasSize(databaseSizeBeforeCreate + 1);
        Anggotas testAnggotas = anggotasList.get(anggotasList.size() - 1);
        assertThat(testAnggotas.getNama()).isEqualTo(DEFAULT_NAMA);
    }

    @Test
    @Transactional
    public void createAnggotasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anggotasRepository.findAll().size();

        // Create the Anggotas with an existing ID
        anggotas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnggotasMockMvc.perform(post("/api/anggotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anggotas)))
            .andExpect(status().isBadRequest());

        // Validate the Anggotas in the database
        List<Anggotas> anggotasList = anggotasRepository.findAll();
        assertThat(anggotasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNamaIsRequired() throws Exception {
        int databaseSizeBeforeTest = anggotasRepository.findAll().size();
        // set the field null
        anggotas.setNama(null);

        // Create the Anggotas, which fails.

        restAnggotasMockMvc.perform(post("/api/anggotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anggotas)))
            .andExpect(status().isBadRequest());

        List<Anggotas> anggotasList = anggotasRepository.findAll();
        assertThat(anggotasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAnggotas() throws Exception {
        // Initialize the database
        anggotasRepository.saveAndFlush(anggotas);

        // Get all the anggotasList
        restAnggotasMockMvc.perform(get("/api/anggotas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anggotas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nama").value(hasItem(DEFAULT_NAMA)));
    }
    
    @Test
    @Transactional
    public void getAnggotas() throws Exception {
        // Initialize the database
        anggotasRepository.saveAndFlush(anggotas);

        // Get the anggotas
        restAnggotasMockMvc.perform(get("/api/anggotas/{id}", anggotas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(anggotas.getId().intValue()))
            .andExpect(jsonPath("$.nama").value(DEFAULT_NAMA));
    }

    @Test
    @Transactional
    public void getNonExistingAnggotas() throws Exception {
        // Get the anggotas
        restAnggotasMockMvc.perform(get("/api/anggotas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnggotas() throws Exception {
        // Initialize the database
        anggotasRepository.saveAndFlush(anggotas);

        int databaseSizeBeforeUpdate = anggotasRepository.findAll().size();

        // Update the anggotas
        Anggotas updatedAnggotas = anggotasRepository.findById(anggotas.getId()).get();
        // Disconnect from session so that the updates on updatedAnggotas are not directly saved in db
        em.detach(updatedAnggotas);
        updatedAnggotas
            .nama(UPDATED_NAMA);

        restAnggotasMockMvc.perform(put("/api/anggotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnggotas)))
            .andExpect(status().isOk());

        // Validate the Anggotas in the database
        List<Anggotas> anggotasList = anggotasRepository.findAll();
        assertThat(anggotasList).hasSize(databaseSizeBeforeUpdate);
        Anggotas testAnggotas = anggotasList.get(anggotasList.size() - 1);
        assertThat(testAnggotas.getNama()).isEqualTo(UPDATED_NAMA);
    }

    @Test
    @Transactional
    public void updateNonExistingAnggotas() throws Exception {
        int databaseSizeBeforeUpdate = anggotasRepository.findAll().size();

        // Create the Anggotas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnggotasMockMvc.perform(put("/api/anggotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anggotas)))
            .andExpect(status().isBadRequest());

        // Validate the Anggotas in the database
        List<Anggotas> anggotasList = anggotasRepository.findAll();
        assertThat(anggotasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnggotas() throws Exception {
        // Initialize the database
        anggotasRepository.saveAndFlush(anggotas);

        int databaseSizeBeforeDelete = anggotasRepository.findAll().size();

        // Delete the anggotas
        restAnggotasMockMvc.perform(delete("/api/anggotas/{id}", anggotas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Anggotas> anggotasList = anggotasRepository.findAll();
        assertThat(anggotasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Anggotas.class);
        Anggotas anggotas1 = new Anggotas();
        anggotas1.setId(1L);
        Anggotas anggotas2 = new Anggotas();
        anggotas2.setId(anggotas1.getId());
        assertThat(anggotas1).isEqualTo(anggotas2);
        anggotas2.setId(2L);
        assertThat(anggotas1).isNotEqualTo(anggotas2);
        anggotas1.setId(null);
        assertThat(anggotas1).isNotEqualTo(anggotas2);
    }
}
