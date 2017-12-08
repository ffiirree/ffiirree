package me.ffiirree.service;

import me.ffiirree.model.ArticleReview;

import java.util.HashMap;
import java.util.List;

public interface IAReviewService {
    List<ArticleReview> all();
    HashMap<String, Object> getByAid(Long aid, int page, int size);

    Long insert2(Long uid, Long atuid, Long aid, Long rid, String content);

    Long insert(ArticleReview review);

    List<ArticleReview> getReplies(Long aid, Long rid);

    ArticleReview getById(Long id);
}
