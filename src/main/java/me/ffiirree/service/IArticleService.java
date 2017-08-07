package me.ffiirree.service;

import java.util.HashMap;

public interface IArticleService {
    Long add(Long uid, String title, String content, Long cid);

    HashMap<String, Object> getArticle(Long id);

    HashMap<String, Object> all(int page, int size);
    HashMap<String, Object> select(Long cid, int page, int size);
}
