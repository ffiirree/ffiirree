package me.ffiirree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleReadRecord {
    private Long aid;
    private String ip;
    private Integer times;
    private String timestamp;
}
