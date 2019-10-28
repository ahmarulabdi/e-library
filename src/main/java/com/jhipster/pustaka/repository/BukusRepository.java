package com.jhipster.pustaka.repository;
import com.jhipster.pustaka.domain.Bukus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Bukus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BukusRepository extends JpaRepository<Bukus, Long> {

}
