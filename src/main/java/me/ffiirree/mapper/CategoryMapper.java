package me.ffiirree.mapper;

import me.ffiirree.model.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface CategoryMapper {
    @Select("select * from categories")
    List<Category> all();
}
