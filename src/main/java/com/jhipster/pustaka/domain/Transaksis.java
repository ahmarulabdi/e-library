package com.jhipster.pustaka.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Transaksis.
 */
@Entity
@Table(name = "transaksis")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Transaksis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tanggal_pinjam")
    private LocalDate tanggalPinjam;

    @Column(name = "tanggal_kembali")
    private LocalDate tanggalKembali;

    @ManyToOne
    @JsonIgnoreProperties("transakses")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("transakses")
    private Anggotas anggotas;

    @ManyToOne
    @JsonIgnoreProperties("transakses")
    private Bukus bukus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTanggalPinjam() {
        return tanggalPinjam;
    }

    public Transaksis tanggalPinjam(LocalDate tanggalPinjam) {
        this.tanggalPinjam = tanggalPinjam;
        return this;
    }

    public void setTanggalPinjam(LocalDate tanggalPinjam) {
        this.tanggalPinjam = tanggalPinjam;
    }

    public LocalDate getTanggalKembali() {
        return tanggalKembali;
    }

    public Transaksis tanggalKembali(LocalDate tanggalKembali) {
        this.tanggalKembali = tanggalKembali;
        return this;
    }

    public void setTanggalKembali(LocalDate tanggalKembali) {
        this.tanggalKembali = tanggalKembali;
    }

    public User getUser() {
        return user;
    }

    public Transaksis user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Anggotas getAnggotas() {
        return anggotas;
    }

    public Transaksis anggotas(Anggotas anggotas) {
        this.anggotas = anggotas;
        return this;
    }

    public void setAnggotas(Anggotas anggotas) {
        this.anggotas = anggotas;
    }

    public Bukus getBukus() {
        return bukus;
    }

    public Transaksis bukus(Bukus bukus) {
        this.bukus = bukus;
        return this;
    }

    public void setBukus(Bukus bukus) {
        this.bukus = bukus;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaksis)) {
            return false;
        }
        return id != null && id.equals(((Transaksis) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transaksis{" +
            "id=" + getId() +
            ", tanggalPinjam='" + getTanggalPinjam() + "'" +
            ", tanggalKembali='" + getTanggalKembali() + "'" +
            "}";
    }
}
