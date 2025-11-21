package ar.edu.huergo.jsanchezortega.gymness.service.tarea;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.ResumenCreadorDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.tarea.Tarea;
import ar.edu.huergo.jsanchezortega.gymness.repository.tarea.TareaRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class TareaService {

    @Autowired
    private  TareaRepository tareaRepository;

    public Tarea marcarComoTareaCompletada (Long id){
        Tarea tarea = obtenerTareaPorId(id);
        tarea.setCompletada(true);
        return tareaRepository.save(tarea);
    }

    public List<Tarea> obtenerTodasLTareas(){
        return tareaRepository.findAll();
    }

    public Tarea obtenerTareaPorId(Long id) throws EntityNotFoundException{
        return tareaRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Tarea no encontrada"));
    }

    public Tarea crearTarea(Tarea tarea){
        return tareaRepository.save(tarea);
    }

    public Tarea actualizTarea(Tarea tarea, Long id) throws EntityNotFoundException{
        Tarea tareaExistente = obtenerTareaPorId(id);
        tareaExistente.setTitulo(tarea.getTitulo());
        tareaExistente.setDescripcion(tarea.getDescripcion());
        tareaExistente.setCreador(tarea.getCreador());
        
        return tareaRepository.save(tareaExistente);
    }

    public void eliminarTarea (Long id) throws EntityNotFoundException{
        Tarea tarea = obtenerTareaPorId(id);
        tareaRepository.delete(tarea);
    }

     public ResumenCreadorDTO obtenerResumenPorCreador(String creador) {
        List<Tarea> tareas = tareaRepository.findByCreador(creador);
        
        if (tareas.isEmpty()) {
            throw new RuntimeException("No se encontraron tareas para el creador: " + creador);
        }
        
        Integer totalTareas = tareas.size();
        Integer tareasCompletadas = tareaRepository.countTareasCompletadasByCreador(creador);
        Integer tareasPendientes = tareaRepository.countTareasPendientesByCreador(creador);
        
        Double porcentajeCompletado = totalTareas > 0 
            ? (tareasCompletadas * 100.0) / totalTareas 
            : 0.0;
        
        return new ResumenCreadorDTO(
            creador,
            totalTareas,
            tareasCompletadas,
            tareasPendientes,
            Math.round(porcentajeCompletado * 100.0) / 100.0
        );
    }

    
}
