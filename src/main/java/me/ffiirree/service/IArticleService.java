package me.ffiirree.service;

import me.ffiirree.model.Article;

import java.text.ParseException;
import java.util.HashMap;

public interface IArticleService {

    /**
     * 添加一篇文章
     */
    Long add(Long uid, String title, String content, Long cid);

    /**
     * 更新文章
     * @param article
     */
    void updated(Article article);


    // 删除文章
    void delete(Long id);

    HashMap<String, Object> getArticle(Long id);

    /**
     * 通过文章ID获取文章
     */
    Article getArticleById(Long id);

    /**
     * 获取所有文章
     */
    HashMap<String, Object> all(int page, int size);

    /**
     * 获取 分类 的所有文章
     * @param cid 文章分类的ID
     */
    HashMap<String, Object> select(Long cid, int page, int size);

    /**
     * 查找文章
     * @param word 关键字
     */
    HashMap<String, Object> search(String word, int page, int size);

    /**
     * 阅读记录
     * @param id 文章的id
     * @param ip 用户ip地址
     */
    void read(Long id, String ip) throws ParseException;
}
