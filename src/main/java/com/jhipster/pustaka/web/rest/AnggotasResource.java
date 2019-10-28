package com.jhipster.pustaka.web.rest;

import com.jhipster.pustaka.domain.Anggotas;
import com.jhipster.pustaka.repository.AnggotasRepository;
import com.jhipster.pustaka.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.pustaka.domain.Anggotas}.
 */
@RestController
@RequestMapping("/api")
public class AnggotasResource {

    private final Logger log = LoggerFactory.getLogger(AnggotasResource.class);

    private static final String ENTITY_NAME = "anggotas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnggotasRepository anggotasRepository;

    public AnggotasResource(AnggotasRepository anggotasRepository) {
        this.anggotasRepository = anggotasRepository;
    }

    /**
     * {@code POST  /anggotas} : Create a new anggotas.
     *
     * @param anggotas the anggotas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new anggotas, or with status {@code 400 (Bad Request)} if the anggotas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/anggotas")
    public ResponseEntity<Anggotas> createAnggotas(@Valid @RequestBody Anggotas anggotas) throws URISyntaxException {
        log.debug("REST request to save Anggotas : {}", anggotas);
        if (anggotas.getId() != null) {
            throw new BadRequestAlertException("A new anggotas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Anggotas result = anggotasRepository.save(anggotas);
        return ResponseEntity.created(new URI("/api/anggotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /anggotas} : Updates an existing anggotas.
     *
     * @param anggotas the anggotas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated anggotas,
     * or with status {@code 400 (Bad Request)} if the anggotas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the anggotas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/anggotas")
    public ResponseEntity<Anggotas> updateAnggotas(@Valid @RequestBody Anggotas anggotas) throws URISyntaxException {
        log.debug("REST request to update Anggotas : {}", anggotas);
        if (anggotas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Anggotas result = anggotasRepository.save(anggotas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, anggotas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /anggotas} : get all the anggotas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of anggotas in body.
     */
    @GetMapping("/anggotas")
    public List<Anggotas> getAllAnggotas() {
        log.debug("REST request to get all Anggotas");
        return anggotasRepository.findAll();
    }

    /**
     * {@code GET  /anggotas/:id} : get the "id" anggotas.
     *
     * @param id the id of the anggotas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the anggotas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/anggotas/{id}")
    public ResponseEntity<Anggotas> getAnggotas(@PathVariable Long id) {
        log.debug("REST request to get Anggotas : {}", id);
        Optional<Anggotas> anggotas = anggotasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(anggotas);
    }

    /**
     * {@code DELETE  /anggotas/:id} : delete the "id" anggotas.
     *
     * @param id the id of the anggotas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/anggotas/{id}")
    public ResponseEntity<Void> deleteAnggotas(@PathVariable Long id) {
        log.debug("REST request to delete Anggotas : {}", id);
        anggotasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
