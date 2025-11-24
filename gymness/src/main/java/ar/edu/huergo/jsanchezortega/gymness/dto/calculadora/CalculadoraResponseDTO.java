package ar.edu.huergo.jsanchezortega.gymness.dto.calculadora;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculadoraResponseDTO {

    private Long id;

    @NotBlank(message = "El Operacion debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El titulo debe tener entre 2 y 100 caractertes")
    private String operacion;

    private double parametro1;

    private double parametro2;

    private double resultado;
    
}
