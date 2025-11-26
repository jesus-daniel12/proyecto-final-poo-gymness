package ar.edu.huergo.jsanchezortega.gymness.entity.prestamo;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Prestamo")

public class PrestamoLibro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String tituloLibro;

    private String nombreUsuario;

    private LocalDate fechaPrestamo = LocalDate.now();

    private LocalDate fechaDevolucion;

    private Integer diasPrestamo;

    private Boolean devuelto = false;

}

