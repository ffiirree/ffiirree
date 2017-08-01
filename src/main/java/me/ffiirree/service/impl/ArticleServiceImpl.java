package me.ffiirree.service.impl;

import me.ffiirree.mapper.ArticleMapper;
import me.ffiirree.model.Article;
import me.ffiirree.service.IArticleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class ArticleServiceImpl implements IArticleService {

    @Resource private ArticleMapper articleMapper;

    @Override
    public Long add(Long uid, String title, String content, Long cid) {
        Article article = new Article(uid, cid, title, content);
        articleMapper.insert(article);
        return article.getId();
    }

    @Override
    public HashMap<String, Object> getArticle(Long id) {
        return articleMapper.getArticle(id);
    }

    @Override
    public HashMap<String, Object> all(int page, int size) {

        final List<Article>  articles = articleMapper.all(page * size, size);
        Long count = articleMapper.countAll();

        boolean hasNext = false;
        if(count > (page + 1) * size){
            hasNext = true;
        }

        final boolean finalHasNext = hasNext;
        return new HashMap<String, Object>(){{
            put("articles", articles);
            put("hasNext", finalHasNext);
        }};
    }
}
