package me.ffiirree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

/**
 * Created by ice on 2017/5/19.
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleReview {
    private Long id;
    private Long aid;
    private Long uid;

    private String content;
    private Timestamp submitTime;
}
