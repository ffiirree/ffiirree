package me.ffiirree.controller;

import me.ffiirree.mapper.TopicMapper;
import me.ffiirree.model.Topic;
import me.ffiirree.service.IArticleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@RequestMapping(value = "/search")
public class SearchController {

    @Resource IArticleService articleService;
    @Resource TopicMapper topicService;

    @RequestMapping(method = {GET, POST})
    public String page(){
        return "search/search";
    }

    @RequestMapping(value = "/article", method = POST)
    @ResponseBody
    public HashMap<String, Object> article(@RequestParam(value = "word") String word,
                                           @RequestParam(value = "page", defaultValue = "0")int page,
                                           @RequestParam(value = "size", defaultValue = "20")int size){
        HashMap<String, Object> res;

        res = articleService.search(word, page, size);

        res.put("status", "success");
        return res;
    }


    @RequestMapping(value = "/topic", method = POST)
    @ResponseBody
    public List<Topic> topic(@RequestParam(value = "word") String word,
                                           @RequestParam(value = "page", defaultValue = "0")int page,
                                           @RequestParam(value = "size", defaultValue = "20")int size){

        return topicService.search(word, page, size);
    }
}
