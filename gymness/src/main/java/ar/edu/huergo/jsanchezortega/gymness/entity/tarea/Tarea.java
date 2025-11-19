package ar.edu.huergo.jsanchezortega.gymness.entity.tarea;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tareas")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "El nombre debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caractertes")
    private String titulo;

    @NotBlank(message = "El descripcion debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caractertes")
    private String descripcion;

    @NotBlank(message = "El creador debe ser obligatorio")
    @Size (min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caractertes")
    private String creador;

    private boolean completada = false;
    
}
