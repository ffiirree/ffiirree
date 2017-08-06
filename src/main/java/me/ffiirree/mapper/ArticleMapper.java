package me.ffiirree.mapper;

import me.ffiirree.model.Article;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface ArticleMapper {

    @Insert({"insert into articles(uid, cid, title, content) values(#{uid}, #{cid}, #{title}, #{content})"})
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Article article);

    @Select({"select users.avatar, users.username, articles.* from users, articles where articles.id=#{id} and users.id=articles.uid"})
    HashMap<String, Object> getArticle(@Param("id") Long id);

    @Select({ "select articles.*, categories.name as category from articles, categories" +
            " where articles.cid=categories.id" +
            " ORDER BY submitTime DESC limit #{start}, #{size}" })
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "topics", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.ATMapper.all"))
    })
    List<Article> all(@Param("start") int start, @Param("size")int size);


    @Select({ "select articles.*, categories.name as category from articles, categories" +
            " where articles.cid=categories.id and categories.name=#{scope}" +
            " ORDER BY submitTime DESC limit #{start}, #{size}" })
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "topics", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.ATMapper.all"))
    })
    List<Article> select(@Param("scope")String scope, @Param("start") int start, @Param("size")int size);

    @Select("select count(id) from articles")
    Long countAll();

    @Select({"select count(articles.id) from articles, categories where articles.cid=categories.id and categories.name=#{scope}"})
    Long count(String scope);
}
