package ar.edu.huergo.jsanchezortega.gymness.mapper.tarea;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.TareaRequestDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.TareaResponseDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.tarea.Tarea;

@Component
public class TareaMapper {

    public Tarea toEntity(TareaRequestDTO tareaDTO){
        if (tareaDTO == null) {
            return null;
        }

        Tarea tarea = new Tarea();
        tarea.setTitulo(tareaDTO.getTitulo());
        tarea.setDescripcion(tareaDTO.getDescripcion());
        tarea.setCreador(tareaDTO.getCreador());
        tarea.setCompletada(false);
        return tarea;
    }

    public TareaResponseDTO toResponseDTO(Tarea entity){
        if (entity == null) {
            return null;
        }

        TareaResponseDTO dto = new TareaResponseDTO();
        dto.setId(entity.getId());
        dto.setTitulo(entity.getTitulo());
        dto.setDescripcion(entity.getDescripcion());
        dto.setCreador(entity.getCreador());
        dto.setCompletada(false);
        return dto;
    }

    public void updateEntity(Tarea tarea, TareaRequestDTO dto){
        tarea.setTitulo(dto.getTitulo());
        tarea.setDescripcion(dto.getDescripcion());
        tarea.setCreador(dto.getCreador());
    }

    public List<TareaResponseDTO> toDtoList(List<Tarea> tareas){
        return tareas.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }
    
}
