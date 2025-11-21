package ar.edu.huergo.jsanchezortega.gymness.dto.tarea;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumenCreadorDTO {

    private String nombreCreador;

    private Integer totalTareas;

    private Integer tareasCompletadas;

    private Integer tareasPendientes;
    
    private Double porcentajeCompletado;
    
}
