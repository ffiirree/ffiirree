package me.ffiirree.mapper;

import me.ffiirree.model.Topic;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface TopicMapper {

    @Insert({"insert into topics(name) values(#{name})"})
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Topic topic);

    @Select("select * from topics where id=#{id}")
    Topic selectById(@Param("id") Long id);

    @Select("select * from topics where name=#{name}")
    Topic selectByName(@Param("name") String name);

    @Select({"select * from topics where name LIKE concat(concat('%', #{word}),'%') limit #{start}, #{size}" })
    List<Topic> search(@Param("word") String word, @Param("start") int start, @Param("size") int size);
}
