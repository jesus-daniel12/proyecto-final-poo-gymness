package ar.edu.huergo.jsanchezortega.gymness.dto.libro;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrestamoLibroRequestDTO  {

    private String tituloLibro;

    private String nombreUsuario;

    private Integer diasPrestamos;
    
}
