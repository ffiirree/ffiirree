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
    List<ArticleReview> getById(@Param("aid") Long aid, @Param("start") int start, @Param("size")int size);

    @Insert("insert into article_reviews(uid, atuid, aid, rid, content) values(#{uid}, #{atuid}, #{aid}, #{rid}, #{content})")
    void insert(@Param("uid") Long uid, @Param("atuid") Long atuid, @Param("aid") Long aid, @Param("rid") Long rid, @Param("content") String content);


    @Select("select count(id) from article_reviews where aid=#{aid}")
    Long count(@Param("aid") Long aid);
}
