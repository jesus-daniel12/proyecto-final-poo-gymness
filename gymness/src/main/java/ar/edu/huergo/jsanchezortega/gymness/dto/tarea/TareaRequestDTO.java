package ar.edu.huergo.jsanchezortega.gymness.dto.tarea;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TareaRequestDTO {

    @NotBlank(message = "El nombre debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caractertes")
    private String titulo;

    @NotBlank(message = "El descripcion debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caractertes")
    private String descripcion;

    @NotBlank(message = "El creador debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caractertes")
    private String creador;
    
}
