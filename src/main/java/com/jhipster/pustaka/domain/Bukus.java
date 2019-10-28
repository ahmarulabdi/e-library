package com.jhipster.pustaka.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Bukus.
 */
@Entity
@Table(name = "bukus")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bukus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nama", nullable = false)
    private String nama;

    @NotNull
    @Column(name = "pengarang", nullable = false)
    private String pengarang;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public Bukus nama(String nama) {
        this.nama = nama;
        return this;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getPengarang() {
        return pengarang;
    }

    public Bukus pengarang(String pengarang) {
        this.pengarang = pengarang;
        return this;
    }

    public void setPengarang(String pengarang) {
        this.pengarang = pengarang;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bukus)) {
            return false;
        }
        return id != null && id.equals(((Bukus) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Bukus{" +
            "id=" + getId() +
            ", nama='" + getNama() + "'" +
            ", pengarang='" + getPengarang() + "'" +
            "}";
    }
}
