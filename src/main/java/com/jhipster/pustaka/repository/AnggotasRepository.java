package com.jhipster.pustaka.repository;
import com.jhipster.pustaka.domain.Anggotas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Anggotas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnggotasRepository extends JpaRepository<Anggotas, Long> {

}
