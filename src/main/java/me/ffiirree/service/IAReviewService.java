package me.ffiirree.service;

import me.ffiirree.model.ArticleReview;

import java.util.HashMap;
import java.util.List;

public interface IAReviewService {
    List<ArticleReview> all();
    HashMap<String, Object> getById(Long aid, int page, int size);

    void insert(Long uid, Long atuid, Long aid, Long rid, String content);
}
