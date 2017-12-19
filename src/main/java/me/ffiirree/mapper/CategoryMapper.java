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
            @Result(property = "parent_id", column = "parent_id"),
            @Result(property = "count", javaType = Long.class, column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleMapper.count")),
            @Result(property = "parent", javaType = Category.class, column = "parent_id",
                    one = @One(select = "me.ffiirree.mapper.CategoryMapper.select"))
    })
    List<Category> all();

    @Select({ "select * from categories where parent_id=0" })
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "count", javaType = Long.class, column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleMapper.count")),
            @Result(property = "child", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.CategoryMapper.selectByParentId"))
    })
    List<Category> top_all();

    @Select("select * from categories where parent_id=#{parent_id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "count", javaType = Long.class, column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleMapper.count")),
            @Result(property = "child", javaType = List.class, column = "id",
                    many = @Many(select = "me.ffiirree.mapper.CategoryMapper.selectByParentId"))
    })
    List<Category> selectByParentId(@Param("parent_id")Long parent_id);

    @Select("select * from categories where id = #{id}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "parent_id", column = "parent_id"),
            @Result(property = "count", javaType = Long.class, column = "id",
                    one = @One(select = "me.ffiirree.mapper.ArticleMapper.count")),
            @Result(property = "child", javaType = List.class, column = "parent_id",
                    many = @Many(select = "me.ffiirree.mapper.CategoryMapper.selectByParentId"))
    })
    Category select(@Param("id") Long id);

    @Select("select * from categories where position = #{position}")
    Category getByPosition(@Param("position") Long position);

    @Delete("delete from categories where id=#{id}")
    void delete(@Param("id") Long id);

    @Select("select max(position) from categories")
    Long last_postion();

    @Insert("insert into categories set name=#{name}, parent_id=#{parent_id}, position=#{position};")
    @SelectKey(statement = "select last_insert_id()", keyProperty = "id", before = false, resultType = Long.class)
    void insert(Category category);

    @Update("update categories set name=#{name} where id=#{id}")
    void update_name(@Param("id") Long id, @Param("name")String name);

    @Update("update categories set parent_id=#{parent_id} where id=#{id}")
    void update_parent_id(@Param("id") Long id, @Param("parent_id")Long parent_id);

    @Update("update categories set position=#{position} where id=#{id}")
    void update_position(@Param("id")Long id, @Param("position")Long position);
}
