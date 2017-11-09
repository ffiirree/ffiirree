package me.ffiirree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

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
    private Long rid;

    private User user;
    private User atu;

    private List<ArticleReview> replies;

    private String content;
    private String submitTime;
}
