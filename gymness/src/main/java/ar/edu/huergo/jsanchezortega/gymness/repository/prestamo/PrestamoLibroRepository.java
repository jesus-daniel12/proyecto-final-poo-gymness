package ar.edu.huergo.jsanchezortega.gymness.repository.prestamo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ar.edu.huergo.jsanchezortega.gymness.entity.prestamo.PrestamoLibro;

@Repository

public interface PrestamoLibroRepository extends JpaRepository<PrestamoLibro, Long> {

    List<PrestamoLibro> findByNombreUsuario(String nombreUsuario);
    
}
