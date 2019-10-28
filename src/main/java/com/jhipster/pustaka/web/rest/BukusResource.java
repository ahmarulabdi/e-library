package com.jhipster.pustaka.web.rest;

import com.jhipster.pustaka.domain.Bukus;
import com.jhipster.pustaka.repository.BukusRepository;
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
 * REST controller for managing {@link com.jhipster.pustaka.domain.Bukus}.
 */
@RestController
@RequestMapping("/api")
public class BukusResource {

    private final Logger log = LoggerFactory.getLogger(BukusResource.class);

    private static final String ENTITY_NAME = "bukus";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BukusRepository bukusRepository;

    public BukusResource(BukusRepository bukusRepository) {
        this.bukusRepository = bukusRepository;
    }

    /**
     * {@code POST  /bukuses} : Create a new bukus.
     *
     * @param bukus the bukus to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bukus, or with status {@code 400 (Bad Request)} if the bukus has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bukuses")
    public ResponseEntity<Bukus> createBukus(@Valid @RequestBody Bukus bukus) throws URISyntaxException {
        log.debug("REST request to save Bukus : {}", bukus);
        if (bukus.getId() != null) {
            throw new BadRequestAlertException("A new bukus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bukus result = bukusRepository.save(bukus);
        return ResponseEntity.created(new URI("/api/bukuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bukuses} : Updates an existing bukus.
     *
     * @param bukus the bukus to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bukus,
     * or with status {@code 400 (Bad Request)} if the bukus is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bukus couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bukuses")
    public ResponseEntity<Bukus> updateBukus(@Valid @RequestBody Bukus bukus) throws URISyntaxException {
        log.debug("REST request to update Bukus : {}", bukus);
        if (bukus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bukus result = bukusRepository.save(bukus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bukus.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bukuses} : get all the bukuses.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bukuses in body.
     */
    @GetMapping("/bukuses")
    public List<Bukus> getAllBukuses() {
        log.debug("REST request to get all Bukuses");
        return bukusRepository.findAll();
    }

    /**
     * {@code GET  /bukuses/:id} : get the "id" bukus.
     *
     * @param id the id of the bukus to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bukus, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bukuses/{id}")
    public ResponseEntity<Bukus> getBukus(@PathVariable Long id) {
        log.debug("REST request to get Bukus : {}", id);
        Optional<Bukus> bukus = bukusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bukus);
    }

    /**
     * {@code DELETE  /bukuses/:id} : delete the "id" bukus.
     *
     * @param id the id of the bukus to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bukuses/{id}")
    public ResponseEntity<Void> deleteBukus(@PathVariable Long id) {
        log.debug("REST request to delete Bukus : {}", id);
        bukusRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
