package ar.edu.huergo.jsanchezortega.gymness.service.prestamo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.huergo.jsanchezortega.gymness.entity.prestamo.PrestamoLibro;
import ar.edu.huergo.jsanchezortega.gymness.repository.prestamo.PrestamoLibroRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PrestamoLibroService {

    @Autowired
    private PrestamoLibroRepository prestamoLibroRepository;

    public List<PrestamoLibro> obtenerTodasLosLibros(){
        return prestamoLibroRepository.findAll();
    }

    public PrestamoLibro obtenerPrestamoLibroPorId(Long id) throws EntityNotFoundException{
        return prestamoLibroRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("No se encontro un prestamo"));

    }

    public PrestamoLibro crearPrestamo(PrestamoLibro prestamoLibro){ 
        return prestamoLibroRepository.save(prestamoLibro);
    }

    public PrestamoLibro actualizPrestamoLibro(Long id, PrestamoLibro prestamoLibro){
        PrestamoLibro prestamoLibroExistente = obtenerPrestamoLibroPorId(id);
        prestamoLibroExistente.setNombreUsuario(prestamoLibro.getNombreUsuario());
        prestamoLibroExistente.setTituloLibro(prestamoLibro.getTituloLibro());
        prestamoLibroExistente.setFechaPrestamo(prestamoLibro.getFechaPrestamo());
        prestamoLibroExistente.setFechaDevolucion(prestamoLibro.getFechaDevolucion());
        return prestamoLibroRepository.save(prestamoLibroExistente);
    }

    public void eliminarPrestamo(Long id) throws EntityNotFoundException {
        PrestamoLibro prestamoLibro = obtenerPrestamoLibroPorId(id);
        prestamoLibroRepository.delete(prestamoLibro);
    }

    public PrestamoLibro completeTodo(Long id) {
        PrestamoLibro prestamoLibro = obtenerPrestamoLibroPorId(id);
        
        prestamoLibro.setDevuelto(true);
        
        return prestamoLibroRepository.save(prestamoLibro);
    }

}
