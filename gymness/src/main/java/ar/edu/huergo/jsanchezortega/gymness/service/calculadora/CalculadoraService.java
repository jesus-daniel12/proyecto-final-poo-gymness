package ar.edu.huergo.jsanchezortega.gymness.service.calculadora;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.huergo.jsanchezortega.gymness.entity.calculadora.Calculadora;
import ar.edu.huergo.jsanchezortega.gymness.repository.calculadora.CalculadoraRepository;

@Service
public class CalculadoraService {

    @Autowired
    private CalculadoraRepository calculadoraRepository;

    public Calculadora crearCalculadora(Calculadora calculadora){

        double resultado = 0.0;
        if (calculadora.getOperacion().equals("+")) {
            resultado = calculadora.getParametro1() + calculadora.getParametro2();
        }else if (calculadora.getOperacion().equals("-")) {
            resultado = calculadora.getParametro1() - calculadora.getParametro2();
        }else if (calculadora.getOperacion().equals("*")) {
            resultado = calculadora.getParametro1() * calculadora.getParametro2();
        }else if (calculadora.getOperacion().equals("/")) {
            if (calculadora.getParametro2() != 0) {
                resultado = calculadora.getParametro1() / calculadora.getParametro2();
            }else{
                throw new RuntimeException("No se puede dividir por cero");
            }
        }

        calculadora.setResultado(resultado);

        return calculadoraRepository.save(calculadora);

    }

    public List<Calculadora> obtenerLos5Ultimos(Calculadora ultimos){
        
        
    }


    
}
