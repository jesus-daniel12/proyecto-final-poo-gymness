package ar.edu.huergo.jsanchezortega.gymness.entity.plan;

import java.util.ArrayList;
import java.util.List;

import ar.edu.huergo.jsanchezortega.gymness.entity.persona.Cliente;
import ar.edu.huergo.jsanchezortega.gymness.entity.persona.Profesional;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "planes")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre; // Ej: BRONCE, PLATINO, PREMIUM

    @NotBlank(message = "La descripcion es obligatorio")
    @Size(min = 3, max = 255, message = "La descripcion debe tener entre 3 y 255 caracteres")
    private String descripcion;

    @Positive(message = "El precio debe ser mayor a 0")
    private double precio;

    @OneToMany(mappedBy = "plan")
    private List<Cliente> clientes = new ArrayList<>();

    @ManyToMany(mappedBy = "planes")  
    private List<Profesional> profesionales;

    public Plan(String nombre){
        this.nombre = nombre;
    }

}