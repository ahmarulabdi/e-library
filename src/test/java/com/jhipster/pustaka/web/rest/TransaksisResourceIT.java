package com.jhipster.pustaka.web.rest;

import com.jhipster.pustaka.PustakaApp;
import com.jhipster.pustaka.domain.Transaksis;
import com.jhipster.pustaka.repository.TransaksisRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.jhipster.pustaka.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TransaksisResource} REST controller.
 */
@SpringBootTest(classes = PustakaApp.class)
public class TransaksisResourceIT {

    private static final LocalDate DEFAULT_TANGGAL_PINJAM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TANGGAL_PINJAM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TANGGAL_KEMBALI = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TANGGAL_KEMBALI = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TransaksisRepository transaksisRepository;

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

    private MockMvc restTransaksisMockMvc;

    private Transaksis transaksis;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransaksisResource transaksisResource = new TransaksisResource(transaksisRepository);
        this.restTransaksisMockMvc = MockMvcBuilders.standaloneSetup(transaksisResource)
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
    public static Transaksis createEntity(EntityManager em) {
        Transaksis transaksis = new Transaksis()
            .tanggalPinjam(DEFAULT_TANGGAL_PINJAM)
            .tanggalKembali(DEFAULT_TANGGAL_KEMBALI);
        return transaksis;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transaksis createUpdatedEntity(EntityManager em) {
        Transaksis transaksis = new Transaksis()
            .tanggalPinjam(UPDATED_TANGGAL_PINJAM)
            .tanggalKembali(UPDATED_TANGGAL_KEMBALI);
        return transaksis;
    }

    @BeforeEach
    public void initTest() {
        transaksis = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransaksis() throws Exception {
        int databaseSizeBeforeCreate = transaksisRepository.findAll().size();

        // Create the Transaksis
        restTransaksisMockMvc.perform(post("/api/transakses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaksis)))
            .andExpect(status().isCreated());

        // Validate the Transaksis in the database
        List<Transaksis> transaksisList = transaksisRepository.findAll();
        assertThat(transaksisList).hasSize(databaseSizeBeforeCreate + 1);
        Transaksis testTransaksis = transaksisList.get(transaksisList.size() - 1);
        assertThat(testTransaksis.getTanggalPinjam()).isEqualTo(DEFAULT_TANGGAL_PINJAM);
        assertThat(testTransaksis.getTanggalKembali()).isEqualTo(DEFAULT_TANGGAL_KEMBALI);
    }

    @Test
    @Transactional
    public void createTransaksisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transaksisRepository.findAll().size();

        // Create the Transaksis with an existing ID
        transaksis.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransaksisMockMvc.perform(post("/api/transakses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaksis)))
            .andExpect(status().isBadRequest());

        // Validate the Transaksis in the database
        List<Transaksis> transaksisList = transaksisRepository.findAll();
        assertThat(transaksisList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTransakses() throws Exception {
        // Initialize the database
        transaksisRepository.saveAndFlush(transaksis);

        // Get all the transaksisList
        restTransaksisMockMvc.perform(get("/api/transakses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transaksis.getId().intValue())))
            .andExpect(jsonPath("$.[*].tanggalPinjam").value(hasItem(DEFAULT_TANGGAL_PINJAM.toString())))
            .andExpect(jsonPath("$.[*].tanggalKembali").value(hasItem(DEFAULT_TANGGAL_KEMBALI.toString())));
    }
    
    @Test
    @Transactional
    public void getTransaksis() throws Exception {
        // Initialize the database
        transaksisRepository.saveAndFlush(transaksis);

        // Get the transaksis
        restTransaksisMockMvc.perform(get("/api/transakses/{id}", transaksis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transaksis.getId().intValue()))
            .andExpect(jsonPath("$.tanggalPinjam").value(DEFAULT_TANGGAL_PINJAM.toString()))
            .andExpect(jsonPath("$.tanggalKembali").value(DEFAULT_TANGGAL_KEMBALI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransaksis() throws Exception {
        // Get the transaksis
        restTransaksisMockMvc.perform(get("/api/transakses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransaksis() throws Exception {
        // Initialize the database
        transaksisRepository.saveAndFlush(transaksis);

        int databaseSizeBeforeUpdate = transaksisRepository.findAll().size();

        // Update the transaksis
        Transaksis updatedTransaksis = transaksisRepository.findById(transaksis.getId()).get();
        // Disconnect from session so that the updates on updatedTransaksis are not directly saved in db
        em.detach(updatedTransaksis);
        updatedTransaksis
            .tanggalPinjam(UPDATED_TANGGAL_PINJAM)
            .tanggalKembali(UPDATED_TANGGAL_KEMBALI);

        restTransaksisMockMvc.perform(put("/api/transakses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransaksis)))
            .andExpect(status().isOk());

        // Validate the Transaksis in the database
        List<Transaksis> transaksisList = transaksisRepository.findAll();
        assertThat(transaksisList).hasSize(databaseSizeBeforeUpdate);
        Transaksis testTransaksis = transaksisList.get(transaksisList.size() - 1);
        assertThat(testTransaksis.getTanggalPinjam()).isEqualTo(UPDATED_TANGGAL_PINJAM);
        assertThat(testTransaksis.getTanggalKembali()).isEqualTo(UPDATED_TANGGAL_KEMBALI);
    }

    @Test
    @Transactional
    public void updateNonExistingTransaksis() throws Exception {
        int databaseSizeBeforeUpdate = transaksisRepository.findAll().size();

        // Create the Transaksis

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransaksisMockMvc.perform(put("/api/transakses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaksis)))
            .andExpect(status().isBadRequest());

        // Validate the Transaksis in the database
        List<Transaksis> transaksisList = transaksisRepository.findAll();
        assertThat(transaksisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransaksis() throws Exception {
        // Initialize the database
        transaksisRepository.saveAndFlush(transaksis);

        int databaseSizeBeforeDelete = transaksisRepository.findAll().size();

        // Delete the transaksis
        restTransaksisMockMvc.perform(delete("/api/transakses/{id}", transaksis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Transaksis> transaksisList = transaksisRepository.findAll();
        assertThat(transaksisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transaksis.class);
        Transaksis transaksis1 = new Transaksis();
        transaksis1.setId(1L);
        Transaksis transaksis2 = new Transaksis();
        transaksis2.setId(transaksis1.getId());
        assertThat(transaksis1).isEqualTo(transaksis2);
        transaksis2.setId(2L);
        assertThat(transaksis1).isNotEqualTo(transaksis2);
        transaksis1.setId(null);
        assertThat(transaksis1).isNotEqualTo(transaksis2);
    }
}
