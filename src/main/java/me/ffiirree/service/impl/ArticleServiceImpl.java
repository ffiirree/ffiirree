package me.ffiirree.service.impl;

import me.ffiirree.mapper.ArticleMapper;
import me.ffiirree.model.Article;
import me.ffiirree.model.ArticleReadRecord;
import me.ffiirree.service.IArticleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
    public void updated(Article article) {
        articleMapper.update(article);
    }

    @Override
    public void delete(Long id) {
        articleMapper.delete(id);
    }

    @Override
    public HashMap<String, Object> getArticle(Long id) {
        return articleMapper.getArticle(id);
    }

    @Override
    public Article getArticleById(Long id) {
        return articleMapper.getArticleById(id);
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
        final long pageNumber = count / size;
        return new HashMap<String, Object>(){{
            put("articles", articles);
            put("page", pageNumber);
            put("hasNext", finalHasNext);
        }};
    }

    @Override
    public HashMap<String, Object> select(Long cid, int page, int size) {

        final List<Article>  articles = articleMapper.select(cid, page * size, size);
        Long count = articleMapper.count(cid);

        boolean hasNext = false;
        if(count > (page + 1) * size){
            hasNext = true;
        }

        final boolean finalHasNext = hasNext;
        final long pageNumber = count / size;
        return new HashMap<String, Object>(){{
            put("articles", articles);
            put("page", pageNumber);
            put("hasNext", finalHasNext);
        }};
    }

    @Override
    public HashMap<String, Object> search(String word, int page, int size) {
        final List<Article>  articles = articleMapper.search(word, page * size, size);
        Long count = articleMapper.countAll();

        boolean hasNext = false;
        if(count > (page + 1) * size){
            hasNext = true;
        }

        final boolean finalHasNext = hasNext;
        final long pageNumber = count / size;
        return new HashMap<String, Object>(){{
            put("articles", articles);
            put("page", pageNumber);
            put("hasNext", finalHasNext);
        }};
    }

    @Override
    public void read(Long id, String ip) throws ParseException {
        ArticleReadRecord record = articleMapper.select_reader(id, ip);
        if(record == null){
            articleMapper.insert_reader(id, ip);
            articleMapper.update_read_number(id);
        }
        else {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Date current_time = new Date();
            String ctime = format.format(current_time);

            long ctime_ = format.parse(ctime).getTime();
            long rtime_ = format.parse(record.getTimestamp()).getTime();

            int hours = (int) ((ctime_ - rtime_)/(1000 * 60 * 60));

            if(hours > 0) {
                articleMapper.insert_reader(id, ip);
                articleMapper.update_read_number(id);
            }
            else {
                articleMapper.update_reader(id, ip, record.getTimestamp());
            }
        }
    }
}
