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

    @NotBlank(message = "El titulo debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El titulo debe tener entre 2 y 100 caractertes")
    private String Titulo;

    @NotBlank(message = "El descripcion debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El descripcion debe tener entre 2 y 100 caractertes")
    private String descripcion;

    @NotBlank(message = "El creador debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caractertes")
    private String creador;
    
}
