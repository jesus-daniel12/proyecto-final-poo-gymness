package ar.edu.huergo.jsanchezortega.gymness.dto.libro;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrestamoLibroResponsetDTO {

    private long id;

    private String tituloLibro;

    private String nombreUsuario;

    private LocalDate fechaPrestamo;

    private LocalDate fechaDevolucion;

    private Boolean devuelto;
    
}
