package ar.edu.huergo.jsanchezortega.gymness.service.tarea;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.huergo.jsanchezortega.gymness.entity.tarea.Tarea;
import ar.edu.huergo.jsanchezortega.gymness.repository.tarea.TareaRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class TareaService {
    @Autowired
    private TareaRepository tareaRepository;

    public List<Tarea> obtenerTodoLosTareas(){
        return tareaRepository.findAll();
    }

    public Tarea obtenerTareaPorId(Long id) throws EntityNotFoundException{
        return tareaRepository.findById(id).
            orElseThrow(() -> new EntityNotFoundException("Tarea no encontrada"));
    }

    public Tarea actualizarTarea(Long id, Tarea tarea) throws EntityNotFoundException{

        Tarea tareaExistente = obtenerTareaPorId(id);
        tareaExistente.setTitulo(tarea.getTitulo());
        tareaExistente.setCreador(tarea.getCreador());
        tareaExistente.setDescripcion(tarea.getDescripcion());

        return tareaRepository.save(tareaExistente);

    }

    public Tarea crearTarea(Tarea tarea){
        return tareaRepository.save(tarea);
    }

    public void eliminarTarea(Long id) throws IllegalArgumentException{
        Tarea Tarea = obtenerTareaPorId(id);
        tareaRepository.delete(Tarea);
    }
    
}
