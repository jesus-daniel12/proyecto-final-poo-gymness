package ar.edu.huergo.jsanchezortega.gymness.controller.tarea;

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

import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.ResumenCreadorDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.TareaRequestDTO;
import ar.edu.huergo.jsanchezortega.gymness.dto.tarea.TareaResponseDTO;
import ar.edu.huergo.jsanchezortega.gymness.entity.tarea.Tarea;
import ar.edu.huergo.jsanchezortega.gymness.mapper.tarea.TareaMapper;
import ar.edu.huergo.jsanchezortega.gymness.service.tarea.TareaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tareas")
public class TareaController {

    private final TareaService tareaService;
    private final TareaMapper tareaMapper;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TareaResponseDTO>> obtenerTodasLasTareas(){
        List<Tarea> tareas = tareaService.obtenerTodasLTareas();
        List<TareaResponseDTO> tareaResponseDTOs = tareaMapper.toDTOList(tareas);
        return ResponseEntity.ok(tareaResponseDTOs);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TareaResponseDTO> obtenerTareaPorId(@PathVariable ("id") Long id){
        Tarea tarea = tareaService.obtenerTareaPorId(id);
        TareaResponseDTO tareaResponseDTO = tareaMapper.toDto(tarea);
        return ResponseEntity.ok(tareaResponseDTO);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TareaResponseDTO> crearTarea(@Valid @RequestBody TareaRequestDTO tareaRequestDTO){
        Tarea tarea = tareaMapper.toEntity(tareaRequestDTO);
        Tarea nuevaTarea = tareaService.crearTarea(tarea);
        TareaResponseDTO tareaResponseDTO = tareaMapper.toDto(nuevaTarea);
        return ResponseEntity.ok(tareaResponseDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TareaResponseDTO> actualizarTarea(@PathVariable ("id") Long id, @Valid @RequestBody TareaRequestDTO tareaRequestDTO){
        Tarea tarea = tareaMapper.toEntity(tareaRequestDTO);
        Tarea tareaUpdate = tareaService.actualizTarea(tarea, id);
        TareaResponseDTO tareaResponseDTO = tareaMapper.toDto(tareaUpdate);
        return ResponseEntity.ok(tareaResponseDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarTarea(@PathVariable("id") Long id){
        tareaService.eliminarTarea(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TareaResponseDTO> marcarComoCompletada(@PathVariable("id") Long id){
        Tarea tarea = tareaService.marcarComoTareaCompletada(id);
        TareaResponseDTO tareaResponseDTO = tareaMapper.toDto(tarea);
        return ResponseEntity.ok(tareaResponseDTO);
    }

    // Resumen por creador (
    // GET /api/tareas/resumen/creador/{nombreCreador}
    @GetMapping("/resumen/creador/{nombreCreador}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResumenCreadorDTO> obtenerResumenPorCreador(@PathVariable String nombreCreador) {
        ResumenCreadorDTO resumen = tareaService.obtenerResumenPorCreador(nombreCreador);
        return ResponseEntity.ok(resumen);
    }
    
}
