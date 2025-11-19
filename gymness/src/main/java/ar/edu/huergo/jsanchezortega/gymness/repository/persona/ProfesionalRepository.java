package ar.edu.huergo.jsanchezortega.gymness.repository.persona;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ar.edu.huergo.jsanchezortega.gymness.entity.persona.Profesional;

@Repository
public interface ProfesionalRepository extends JpaRepository<Profesional, Long> {
    Optional<Profesional> findByEmail(String email);
    Optional<Profesional> findByMatriculaProfesional(String matricula);
    List<Profesional> findByActivo(Boolean activo);
    List<Profesional> findByEspecialidadId(Long especialidadId);
    boolean existsByEmail(String email);
    boolean existsByMatriculaProfesional(String matricula);
    
    @Query("SELECT p FROM Profesional p WHERE p.especialidad.nombre = :nombreEspecialidad AND p.activo = true")
    List<Profesional> findByEspecialidadNombreAndActivo(@Param("nombreEspecialidad") String nombreEspecialidad);
}