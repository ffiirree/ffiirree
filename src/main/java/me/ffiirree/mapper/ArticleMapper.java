package me.ffiirree.mapper;

import me.ffiirree.model.Article;
import me.ffiirree.model.ArticleReadRecord;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface ArticleMapper {

    // 插入文章
    @Insert({"insert into articles(uid, cid, title, content) values(#{uid}, #{cid}, #{title}, #{content})"})
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Article article);

    @Update("update articles set cid = #{cid}, title=#{title}, content=#{content}" +
            " where id=#{id}")
    void update(Article article);

    @Delete("delete from articles where id=#{id}")
    void delete(@Param("id")Long id);

    // 通过ID获取文章
    @Select({"select users.avatar, users.username, articles.* from users, articles where articles.id=#{id} and users.id=articles.uid"})
    HashMap<String, Object> getArticle(@Param("id") Long id);

    @Select("select * from articles where id=#{id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "uid", column = "uid"),
            @Result(property = "cid", column = "cid"),
            @Result(property = "reviewNumber", column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleReviewMapper.count")),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "category", column = "cid",
                    one = @One(select = "me.ffiirree.mapper.CategoryMapper.select")),
            @Result(property = "topics", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.ATMapper.all"))
    })
    Article getArticleById(@Param("id") Long id);

    @Select({ "select * from articles ORDER BY submitTime DESC limit #{start}, #{size}" })
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "uid", column = "uid"),
            @Result(property = "cid", column = "cid"),
            @Result(property = "reviewNumber", column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleReviewMapper.count")),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "category", column = "cid",
                    one = @One(select = "me.ffiirree.mapper.CategoryMapper.select")),
            @Result(property = "topics", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.ATMapper.all"))
    })
    List<Article> all(@Param("start") int start, @Param("size")int size);


    @Select({ "select * from articles where cid=#{cid} ORDER BY submitTime DESC limit #{start}, #{size}" })
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "uid", column = "uid"),
            @Result(property = "cid", column = "cid"),
            @Result(property = "reviewNumber", column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleReviewMapper.count")),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "category", column = "cid",
                    one = @One(select = "me.ffiirree.mapper.CategoryMapper.select")),
            @Result(property = "topics", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.ATMapper.all"))
    })
    List<Article> select(@Param("cid")Long cid, @Param("start") int start, @Param("size")int size);

    @Select("select count(id) from articles")
    Long countAll();

    @Select({"select count(articles.id) from articles, categories where articles.cid=categories.id and categories.id=#{cid}"})
    Long count(@Param("cid") Long cid);

    @Select({ "select articles.*, categories.name as category from articles, categories" +
            " where articles.cid=categories.id and title LIKE concat(concat('%', #{word}),'%')" +
            " ORDER BY submitTime DESC limit #{start}, #{size}" })
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "reviewNumber", column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleReviewMapper.count")),
            @Result(property = "user", column = "uid",
                    one = @One(select = "me.ffiirree.mapper.UserMapper.getUserById")),
            @Result(property = "category", column = "cid",
                    one = @One(select = "me.ffiirree.mapper.CategoryMapper.select")),
            @Result(property = "topics", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.ATMapper.all"))
    })
    List<Article> search(@Param("word")String word, @Param("start") int start, @Param("size") int size);


    @Insert("insert into article_read_number(aid, ip) values(#{id}, #{ip});")
    void insert_reader(@Param("id") Long id, @Param("ip") String ip);

    @Update("update articles set readNumber=readNumber+1 where id=#{id}")
    void update_read_number(@Param("id") Long id);

    @Update("update article_read_number set times=times+1 where aid=#{id} and ip=#{ip} and timestamp=#{timestamp}")
    void update_reader(@Param("id") Long id, @Param("ip") String ip, @Param("timestamp") String timestamp);

    @Select("select * from article_read_number where aid=#{id} and ip=#{ip} order by timestamp desc limit 1")
    ArticleReadRecord select_reader(@Param("id") Long id, @Param("ip") String ip);
}
