package ar.edu.huergo.jsanchezortega.gymness.repository.calculadora;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ar.edu.huergo.jsanchezortega.gymness.entity.calculadora.Calculadora;

@Repository
public interface CalculadoraRepository extends JpaRepository<Calculadora,Long>{
    List<Calculadora> findByOperacion(String operacion);
} 