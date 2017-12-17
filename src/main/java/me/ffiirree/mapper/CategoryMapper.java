package me.ffiirree.mapper;

import me.ffiirree.model.Category;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface CategoryMapper {
    @Select({ "select * from categories" })
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "count", javaType = Long.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.ArticleMapper.count"))
    })
    List<Category> all();

    @Select("select * from categories where id = #{id}")
    Category getCategoryById(@Param("id") Long id);
}
