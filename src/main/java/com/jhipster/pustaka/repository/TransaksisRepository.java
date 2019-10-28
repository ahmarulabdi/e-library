package com.jhipster.pustaka.repository;
import com.jhipster.pustaka.domain.Transaksis;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Transaksis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransaksisRepository extends JpaRepository<Transaksis, Long> {

    @Query("select transaksis from Transaksis transaksis where transaksis.user.login = ?#{principal.username}")
    List<Transaksis> findByUserIsCurrentUser();

}
