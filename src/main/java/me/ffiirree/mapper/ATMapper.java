package me.ffiirree.mapper;

import me.ffiirree.model.Topic;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ATMapper {
    @Insert({"insert into ats(aid, tid) values(#{aid}, #{tid})"})
    void insert(@Param("aid") Long aid, @Param("tid") Long tid);

    @Delete("delete from ats where aid=#{id}")
    void deleteByArticleId(@Param("id") Long id);

//    @Select({"select topics.* from topics, ats where ats.aid=${id} and topics.id=ats.tid"})
//    List<Topic> all(@Param("id") long id);

    @Select({"select topics.* from topics, ats where ats.aid=#{aid} and topics.id=ats.tid"})
    List<Topic> all(@Param("aid") Long aid);
}
