package ar.edu.huergo.jsanchezortega.gymness.repository.tarea;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ar.edu.huergo.jsanchezortega.gymness.entity.tarea.Tarea;

@Repository
public interface TareaRepository extends JpaRepository<Tarea,Long>{

    List<Tarea> findByCreador(String creador);

    // Query para contar tareas completadas por creador
    @Query("SELECT COUNT(t) FROM Tarea t WHERE t.creador = :creador AND t.completada = true")
    Integer countTareasCompletadasByCreador(@Param("creador") String creador);
    
    // Query para contar tareas pendientes por creador
    @Query("SELECT COUNT(t) FROM Tarea t WHERE t.creador = :creador AND t.completada = false")
    Integer countTareasPendientesByCreador(@Param("creador") String creador);
    
} 
