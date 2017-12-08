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
    public HashMap<String, Object> getByAid(Long aid, final int page, int size) {

        final List<ArticleReview> _reviews = articleReviewMapper.getByAid(aid, page * size, size);
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
    public Long insert2(Long uid, Long atuid, Long aid, Long rid, String content) {
        return articleReviewMapper.insert2(uid, atuid, aid, rid, content);
    }

    @Override
    public Long insert(ArticleReview review) {
        return articleReviewMapper.insert(review);
    }

    @Override
    public List<ArticleReview> getReplies(Long aid, Long rid) {
        return articleReviewMapper.getRepliesById(aid, rid);
    }

    @Override
    public ArticleReview getById(Long id) {
        return articleReviewMapper.getById(id);
    }
}
