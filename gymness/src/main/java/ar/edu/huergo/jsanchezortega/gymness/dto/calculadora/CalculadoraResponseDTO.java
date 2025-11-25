package ar.edu.huergo.jsanchezortega.gymness.dto.calculadora;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculadoraResponseDTO {

    private Long id;

    
    private String operacion;

    private double parametro1;

    private double parametro2;

    private double resultado;
    
}
