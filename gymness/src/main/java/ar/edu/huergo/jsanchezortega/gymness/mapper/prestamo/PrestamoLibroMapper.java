package ar.edu.huergo.jsanchezortega.gymness.mapper.prestamo;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ar.edu.huergo.jsanchezortega.gymness.dto.libro.PrestamoLibroRequestDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.libro.PrestamoLibroResponsetDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.prestamo.PrestamoLibro;

@Component
public class PrestamoLibroMapper {
    
    public PrestamoLibro toEntity(PrestamoLibroRequestDTO libroRequestDTO){
        if (libroRequestDTO == null) {
            return null;
        }

        PrestamoLibro libro = new PrestamoLibro();
        libro.setTituloLibro(libroRequestDTO.getTituloLibro());
        libro.setNombreUsuario(libroRequestDTO.getNombreUsuario());
        libro.setDiasPrestamo(libroRequestDTO.getDiasPrestamos());
        return libro;
    }

    public PrestamoLibroResponsetDTO toDto(PrestamoLibro prestamoLibro){
        if (prestamoLibro == null) {
            return null;
        }

        PrestamoLibroResponsetDTO dto = new PrestamoLibroResponsetDTO(prestamoLibro.getId(), prestamoLibro.getTituloLibro(), prestamoLibro.getNombreUsuario(), prestamoLibro.getFechaPrestamo(), prestamoLibro.getFechaDevolucion(), prestamoLibro.getDevuelto());
        return dto;
    }

    public List<PrestamoLibroResponsetDTO> toDTOList(List<PrestamoLibro> entities) {
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
