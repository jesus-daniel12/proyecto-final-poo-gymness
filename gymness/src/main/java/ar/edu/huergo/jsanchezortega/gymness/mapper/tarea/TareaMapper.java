package ar.edu.huergo.jsanchezortega.gymness.mapper.tarea;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.TareaRequestDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.TareaResponseDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.tarea.Tarea;

@Component
public class TareaMapper {

    public Tarea toEntity(TareaRequestDTO tareaResponseDTO){
        if (tareaResponseDTO == null) {
            return null;
        }

        Tarea tarea = new Tarea();
        tarea.setTitulo(tareaResponseDTO.getTitulo());
        tarea.setDescripcion(tareaResponseDTO.getDescripcion());
        tarea.setCreador(tareaResponseDTO.getDescripcion());
        tarea.setCompletada(false);
        return tarea;
    }

    public TareaResponseDTO toDto(Tarea tarea){
        if (tarea == null) {
            return null;
        }
        return new TareaResponseDTO(tarea.getId(), tarea.getTitulo(), tarea.getDescripcion(), tarea.getCreador(), tarea.isCompletada());
    } 

    public List<TareaResponseDTO> toDTOList(List<Tarea> entities) {
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public void ActualizarEntidadDeDto(Tarea tarea, TareaRequestDTO tareaRequestDTO){
        tarea.setTitulo(tareaRequestDTO.getTitulo());
        tarea.setCreador(tareaRequestDTO.getCreador());
        tarea.setDescripcion(tareaRequestDTO.getDescripcion());
    }
    
}
