package me.ffiirree.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReply {
    private Long id;            // id
    private Long uid;           // user id
    private Long rid;           // article review id

    private Long aid;           //

    private String content;
    private Timestamp submitTime;
}
