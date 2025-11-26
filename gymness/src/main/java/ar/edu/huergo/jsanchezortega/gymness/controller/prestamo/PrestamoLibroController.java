package ar.edu.huergo.jsanchezortega.gymness.controller.prestamo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ar.edu.huergo.jsanchezortega.gymness.dto.libro.PrestamoLibroRequestDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.libro.PrestamoLibroResponsetDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.prestamo.PrestamoLibro;
import ar.edu.huergo.jsanchezortega.gymness.mapper.prestamo.PrestamoLibroMapper;
import ar.edu.huergo.jsanchezortega.gymness.service.prestamo.PrestamoLibroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/prestamo")
public class PrestamoLibroController {
    
    private final PrestamoLibroService prestamoLibroService;
    private final PrestamoLibroMapper prestamoLibroMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PrestamoLibroResponsetDTO>> obtenerTodosLosPrestamos() {
        List<PrestamoLibro> prestamoLibros = prestamoLibroService.obtenerTodasLosLibros();
        List<PrestamoLibroResponsetDTO> prestamoLibroResponsetDTOs = prestamoLibroMapper.toDTOList(prestamoLibros);
        return ResponseEntity.ok(prestamoLibroResponsetDTOs);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PrestamoLibroResponsetDTO> obtenerPrestamosPorId(@PathVariable("id") Long id) {
        PrestamoLibro prestamoLibro = prestamoLibroService.obtenerPrestamoLibroPorId(id);
        PrestamoLibroResponsetDTO prestamoLibroResponsetDTO = prestamoLibroMapper.toDto(prestamoLibro);
        return ResponseEntity.ok(prestamoLibroResponsetDTO);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PrestamoLibroResponsetDTO> crearPrestamo(@Valid @RequestBody PrestamoLibroRequestDTO prestamoLibroRequestDTO){
        PrestamoLibro prestamoLibro = prestamoLibroMapper.toEntity(prestamoLibroRequestDTO);
        PrestamoLibro nuevPrestamoLibro = prestamoLibroService.crearPrestamo(prestamoLibro);
        PrestamoLibroResponsetDTO prestamoLibroResponsetDTO = prestamoLibroMapper.toDto(nuevPrestamoLibro);
        return ResponseEntity.ok(prestamoLibroResponsetDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PrestamoLibroResponsetDTO> actualizarPrestamo(@PathVariable("id") Long id, @Valid @RequestBody PrestamoLibroRequestDTO prestamoLibroRequestDTO){
        PrestamoLibro prestamoLibro = prestamoLibroMapper.toEntity(prestamoLibroRequestDTO);
        PrestamoLibro prestamoLibroActualizado = prestamoLibroService.actualizPrestamoLibro(id, prestamoLibro);
        PrestamoLibroResponsetDTO prestamoLibroResponsetDTO = prestamoLibroMapper.toDto(prestamoLibroActualizado);
        return ResponseEntity.ok(prestamoLibroResponsetDTO);
    }

    @PatchMapping("{id}/complete")
    @PreAuthorize("hasRole('ADMIN')")
     public ResponseEntity<PrestamoLibroResponsetDTO> completeDevuelto(@PathVariable("id") Long id){
        PrestamoLibro devuelto = prestamoLibroService.completeTodo(id);
        PrestamoLibroResponsetDTO prestamoLibroResponsetDTO = prestamoLibroMapper.toDto(devuelto);
        return ResponseEntity.ok(prestamoLibroResponsetDTO);
    }



    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarPrestamo(@PathVariable("id") Long id) {
        prestamoLibroService.eliminarPrestamo(id);
        return ResponseEntity.noContent().build();
    }

}
