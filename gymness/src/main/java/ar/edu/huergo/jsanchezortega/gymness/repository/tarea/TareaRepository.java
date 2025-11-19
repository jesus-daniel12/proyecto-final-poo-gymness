package ar.edu.huergo.jsanchezortega.gymness.repository.tarea;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ar.edu.huergo.jsanchezortega.gymness.entity.tarea.Tarea;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
    Optional<Tarea> findByCreador(String creador);

    
} 
