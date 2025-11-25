package ar.edu.huergo.jsanchezortega.gymness.controller.calculadora;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ar.edu.huergo.jsanchezortega.gymness.dto.calculadora.CalculadorRequestDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.calculadora.CalculadoraResponseDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.calculadora.Calculadora;
import ar.edu.huergo.jsanchezortega.gymness.mapper.calculadora.CalculadoraMapper;
import ar.edu.huergo.jsanchezortega.gymness.service.calculadora.CalculadoraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calculadora")
public class CalculadoraController {

    private final CalculadoraService calculadoraService;
    private final CalculadoraMapper calculadoraMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CalculadoraResponseDTO>> obtenerTodosLoscalculos(){
        List<Calculadora> calculadoras = calculadoraService.obtenerTodosLosCalculos();
        List<CalculadoraResponseDTO> calculadoraResponseDTOs = calculadoraMapper.toDtolist(calculadoras);
        return ResponseEntity.ok(calculadoraResponseDTOs);
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CalculadoraResponseDTO> crearCalculo(@Valid @RequestBody CalculadorRequestDTO calculadorRequestDTO){
        Calculadora calculadora = calculadoraMapper.toEntity(calculadorRequestDTO);
        Calculadora nuevacalculadora = calculadoraService.crearCalculadora(calculadora);
        CalculadoraResponseDTO calculadoraResponseDTO = calculadoraMapper.toDto(nuevacalculadora);
        return ResponseEntity.ok(calculadoraResponseDTO);
    }

    @GetMapping("/ultimos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CalculadoraResponseDTO>> obtenerUltimas(){
        List<Calculadora> calculadoras = calculadoraService.obtenerLos5Ultimos();
        List<CalculadoraResponseDTO> calculadoraResponseDTOs = calculadoraMapper.toDtolist(calculadoras);
        return ResponseEntity.ok(calculadoraResponseDTOs);
    }







    





    
}
