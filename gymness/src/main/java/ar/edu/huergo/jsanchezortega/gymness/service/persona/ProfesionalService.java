package ar.edu.huergo.jsanchezortega.gymness.service.persona;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.huergo.jsanchezortega.gymness.entity.persona.Especialidad;
import ar.edu.huergo.jsanchezortega.gymness.entity.persona.Profesional;
import ar.edu.huergo.jsanchezortega.gymness.entity.plan.Plan;
import ar.edu.huergo.jsanchezortega.gymness.repository.persona.ProfesionalRepository;
import ar.edu.huergo.jsanchezortega.gymness.service.plan.PlanService;
import ar.edu.huergo.jsanchezortega.gymness.repository.persona.EspecialidadRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProfesionalService {
    
    @Autowired
    private PlanService planService;
    @Autowired
    private ProfesionalRepository profesionalRepository;

    @Autowired
    private EspecialidadRepository especialidadRepository;
    
    public List<Profesional> obtenerTodosLosProfesionales() {
        return profesionalRepository.findAll();
    }

    public Profesional obtenerProfesionalPorId(Long id) throws EntityNotFoundException {
        return profesionalRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Profesional no encontrado"));
    }

    public Profesional crearProfesional(Profesional profesional, Long especialidadId, List<Long> planId) {
        Especialidad especialidad = especialidadRepository.findById(especialidadId)
            .orElseThrow(() -> new EntityNotFoundException("Especialidad no encontrada"));
        profesional.setEspecialidad(especialidad);

        List<Plan> plans = planService.resolverPlanes(planId);

        if (!plans.isEmpty()) {
            profesional.setPlanes(plans);
        }

        return profesionalRepository.save(profesional);
    }

    public Profesional actualizarProfesional(Long id, Profesional profesional, Long especialidadId, List<Long> planIds) throws EntityNotFoundException {
        Profesional profesionalExistente = obtenerProfesionalPorId(id);
        profesionalExistente.setNombre(profesional.getNombre());
        profesionalExistente.setApellido(profesional.getApellido());
        profesionalExistente.setDocumento(profesional.getDocumento());
        profesionalExistente.setEmail(profesional.getEmail());
        profesionalExistente.setTelefono(profesional.getTelefono());
        profesionalExistente.setMatriculaProfesional(profesional.getMatriculaProfesional());
        profesionalExistente.setActivo(profesional.isActivo());
        
        if (especialidadId != null) {
            Especialidad especialidad = especialidadRepository.findById(especialidadId)
                .orElseThrow(() -> new EntityNotFoundException("Especialidad no encontrada"));
            profesionalExistente.setEspecialidad(especialidad);
        }
        
        if (planIds != null && !planIds.isEmpty()) {
            List<Plan> plans = planService.resolverPlanes(planIds);
            profesionalExistente.setPlanes(plans);
        }
        
        return profesionalRepository.save(profesionalExistente);
    }
    
    public void eliminarProfesional(Long id) throws EntityNotFoundException {
        Profesional profesional = obtenerProfesionalPorId(id);
        profesionalRepository.delete(profesional);
    }

}
