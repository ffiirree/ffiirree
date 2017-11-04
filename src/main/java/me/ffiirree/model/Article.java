package me.ffiirree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by ice on 2017/5/16.
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    private Long id;
    private Long uid;
    private Long cid;

    private String title;
    private String content;
    private Long readNumber;
    private Long reviewNumber;

    private List<Topic> topics;
    private String category;

    private String submitTime;
    private String editTime;

    public Article(Long uid, Long cid, String title, String content){
        this.uid = uid;
        this.cid = cid;
        this.title = title;
        this.content = content;
    }
}
