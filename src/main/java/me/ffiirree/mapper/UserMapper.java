package me.ffiirree.mapper;

import me.ffiirree.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserMapper {

    @Select("select * from users where username=#{username} limit 1")
    User getUserByUsername(@Param("username") String username);

    @Insert({"insert into users(username, password, email) values(#{username}, #{password}, #{email})"})
    void insert(@Param("username")String username, @Param("password") String password, @Param("email")String email);

    @Select("select * from users where id=#{id}")
    User getUserById(@Param("id") Long id);
}
