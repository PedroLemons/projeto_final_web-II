package com.example.web_II.domain.categoria;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "CategoriaEquipamento")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true)
    private String descricao;

    private boolean ativa = true;

    public Categoria(String descricao) {
        this.descricao = descricao;
    }
}