package com.jhipster.pustaka.web.rest;

import com.jhipster.pustaka.domain.Transaksis;
import com.jhipster.pustaka.repository.TransaksisRepository;
import com.jhipster.pustaka.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.pustaka.domain.Transaksis}.
 */
@RestController
@RequestMapping("/api")
public class TransaksisResource {

    private final Logger log = LoggerFactory.getLogger(TransaksisResource.class);

    private static final String ENTITY_NAME = "transaksis";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransaksisRepository transaksisRepository;

    public TransaksisResource(TransaksisRepository transaksisRepository) {
        this.transaksisRepository = transaksisRepository;
    }

    /**
     * {@code POST  /transakses} : Create a new transaksis.
     *
     * @param transaksis the transaksis to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transaksis, or with status {@code 400 (Bad Request)} if the transaksis has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transaksis")
    public ResponseEntity<Transaksis> createTransaksis(@RequestBody Transaksis transaksis) throws URISyntaxException {
        log.debug("REST request to save Transaksis : {}", transaksis);
        if (transaksis.getId() != null) {
            throw new BadRequestAlertException("A new transaksis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transaksis result = transaksisRepository.save(transaksis);
        return ResponseEntity.created(new URI("/api/transakses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transaksis} : Updates an existing transaksis.
     *
     * @param transaksis the transaksis to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transaksis,
     * or with status {@code 400 (Bad Request)} if the transaksis is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transaksis couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transaksis")
    public ResponseEntity<Transaksis> updateTransaksis(@RequestBody Transaksis transaksis) throws URISyntaxException {
        log.debug("REST request to update Transaksis : {}", transaksis);
        if (transaksis.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transaksis result = transaksisRepository.save(transaksis);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transaksis.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transakses} : get all the transaksipustaka.jss.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transakses in body.
     */
    @GetMapping("/transaksis")
    public List<Transaksis> getAllTransaksis() {
        log.debug("REST request to get all Transaksis");
        return transaksisRepository.findByUserIsCurrentUser();
    }

    /**
     * {@code GET  /transaksis/:id} : get the "id" transaksis.
     *
     * @param id the id of the transaksis to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transaksis, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transaksis/{id}")
    public ResponseEntity<Transaksis> getTransaksis(@PathVariable Long id) {
        log.debug("REST request to get Transaksis : {}", id);
        Optional<Transaksis> transaksis = transaksisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transaksis);
    }

    /**
     * {@code DELETE  /transaksis/:id} : delete the "id" transaksis.
     *
     * @param id the id of the transaksis to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transaksis/{id}")
    public ResponseEntity<Void> deleteTransaksis(@PathVariable Long id) {
        log.debug("REST request to delete Transaksis : {}", id);
        transaksisRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
