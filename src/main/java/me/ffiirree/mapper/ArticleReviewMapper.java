package me.ffiirree.mapper;

import me.ffiirree.model.ArticleReview;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ArticleReviewMapper {
    @Select("select * from article_reviews")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "atu", column = "atuid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById"))
    })
    List<ArticleReview> all();

    @Select("select * from article_reviews where aid=#{aid} and rid=#{rid}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "atu", column = "atuid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById"))
    })
    List<ArticleReview> getRepliesById(@Param("aid") Long aid, @Param("rid") Long rid);

    @Select("select * from article_reviews where aid=#{aid} and rid=0 limit #{start}, #{size}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "atu", column = "atuid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "replies", column = "{aid=aid, rid=id}",
                    one = @One(select = "me.ffiirree.mapper.ArticleReviewMapper.getRepliesById"))
    })
    List<ArticleReview> getByAid(@Param("aid") Long aid, @Param("start") int start, @Param("size")int size);

    @Select("select * from article_reviews where id=#{id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "atu", column = "atuid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "replies", column = "{aid=aid, rid=id}",
                    one = @One(select = "me.ffiirree.mapper.ArticleReviewMapper.getRepliesById"))
    })
    ArticleReview getById(@Param("id") Long id);

    @Insert("insert into article_reviews(uid, atuid, aid, rid, content) values(#{uid}, #{atuid}, #{aid}, #{rid}, #{content})")
    Long insert2(@Param("uid") Long uid, @Param("atuid") Long atuid, @Param("aid") Long aid, @Param("rid") Long rid, @Param("content") String content);

    @Insert("insert into article_reviews(uid, atuid, aid, rid, content) values(#{review.uid}, #{review.atuid}, #{review.aid}, #{review.rid}, #{review.content})")
    @SelectKey(statement = "select last_insert_id()", keyProperty = "review.id", before = false, resultType = Long.class)
    Long insert(@Param("review") ArticleReview review);

    @Select("select count(id) from article_reviews where aid=#{aid}")
    Long count(@Param("aid") Long aid);
}
