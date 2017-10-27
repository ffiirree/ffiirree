package me.ffiirree.service;

import java.text.ParseException;
import java.util.HashMap;

public interface IArticleService {
    Long add(Long uid, String title, String content, Long cid);

    HashMap<String, Object> getArticle(Long id);

    HashMap<String, Object> all(int page, int size);
    HashMap<String, Object> select(Long cid, int page, int size);

    HashMap<String, Object> search(String word, int page, int size);

    void read(Long id, String ip) throws ParseException;
}
