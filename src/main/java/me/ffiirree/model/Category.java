package me.ffiirree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    private Long id;
    private Long position;
    private Long parent_id;
    private String name;
    private Long count;

    private Category parent;
    private List<Category> child;

    public Category(Long parent_id, String name) {
        this.name = name;
        this.parent_id = parent_id;
    }
}
