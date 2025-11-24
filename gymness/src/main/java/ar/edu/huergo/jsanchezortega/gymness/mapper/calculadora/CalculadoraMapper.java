package ar.edu.huergo.jsanchezortega.gymness.mapper.calculadora;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ar.edu.huergo.jsanchezortega.gymness.dto.calculadora.CalculadorRequestDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.calculadora.CalculadoraResponseDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.calculadora.Calculadora;

@Component
public class CalculadoraMapper {

    public Calculadora toEntity(CalculadorRequestDTO calculadorRequestDTO){
        if (calculadorRequestDTO == null) {
            return null;
        }

        Calculadora calculadora = new Calculadora();
        calculadora.setOperacion(calculadorRequestDTO.getOperacion());
        calculadora.setParametro1(calculadorRequestDTO.getParametro1());
        calculadora.setParametro2(calculadorRequestDTO.getParametro2());
        calculadora.setResultado(0);
        return calculadora;
    }

    public CalculadoraResponseDTO toDto(Calculadora calculadora){
        if (calculadora == null) {
            return null;
        }

        return new CalculadoraResponseDTO(calculadora.getId(), calculadora.getOperacion(), calculadora.getParametro1(), calculadora.getParametro2(), calculadora.getResultado());

    }

    public List<CalculadoraResponseDTO> toDtolist(List<Calculadora> calculadoras){
        return calculadoras.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
}
