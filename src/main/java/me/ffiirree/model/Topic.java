package me.ffiirree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Topic {
    private Long id;
    private String name;

    public Topic(String name){
        this.name = name;
    }
}
