package me.ffiirree.mapper;

import me.ffiirree.model.Topic;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

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
}
