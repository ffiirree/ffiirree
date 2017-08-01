package me.ffiirree.mapper;

import me.ffiirree.model.Topic;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ATMapper {
    @Insert({"insert into ats(aid, tid) values(#{aid}, #{tid})"})
    void insert(@Param("aid") Long aid, @Param("tid") Long tid);

//    @Select({"select topics.* from topics, ats where ats.aid=${id} and topics.id=ats.tid"})
//    List<Topic> all(@Param("id") long id);

    @Select({"select topics.* from topics, ats where ats.aid=#{aid} and topics.id=ats.tid"})
    List<Topic> all(@Param("aid") Long aid);
}
