package me.ffiirree.service.impl;

import me.ffiirree.mapper.ArticleReviewMapper;
import me.ffiirree.model.ArticleReview;
import me.ffiirree.service.IAReviewService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class AReviewServiceImpl implements IAReviewService {

    @Resource private ArticleReviewMapper articleReviewMapper;

    @Override
    public List<ArticleReview> all() {
        return articleReviewMapper.all();
    }

    @Override
    public HashMap<String, Object> getById(Long aid, final int page, int size) {

        final List<ArticleReview> _reviews = articleReviewMapper.getById(aid, page * size, size);
        final Long count = articleReviewMapper.count(aid);

        boolean hasNext = false;
        if(count > (page + 1) * size) {
            hasNext = true;
        }

        final boolean finalHasNext = hasNext;
        final long pageNumber = count / size;
        return new HashMap<String, Object>() {{
            put("reviews", _reviews);
            put("page", pageNumber);
            put("hasNext", finalHasNext);
            put("count", count);
        }};
    }

    @Override
    public void insert(Long uid, Long atuid, Long aid, Long rid, String content) {
        articleReviewMapper.insert(uid, atuid, aid, rid, content);
    }
}
