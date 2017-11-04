package me.ffiirree.controller;

import me.ffiirree.mapper.ATMapper;
import me.ffiirree.mapper.CategoryMapper;
import me.ffiirree.mapper.TopicMapper;
import me.ffiirree.model.Topic;
import me.ffiirree.model.User;
import me.ffiirree.service.IAReviewService;
import me.ffiirree.service.IArticleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@RequestMapping(value = "/article")
public class ArticleController {


    @Resource private IArticleService articleService;
    @Resource private CategoryMapper categoryService;
    @Resource private TopicMapper topicService;
    @Resource private ATMapper atsService;
    @Resource private IAReviewService articleReviewService;


    /**
     * 获取文章
     */
    @RequestMapping(method = POST)
    @ResponseBody
    public HashMap<String, Object> all(@RequestParam(value = "scope", defaultValue = "0")Long cid,
                                       @RequestParam(value = "page", defaultValue = "0")int page,
                                       @RequestParam(value = "size", defaultValue = "20")int size) {
        HashMap<String, Object> res;
        if(cid == 0)
            res = articleService.all(page, size);
        else
            res = articleService.select(cid, page, size);

        res.put("status", "success");
        return res;
    }

    /**
     * 文章的编辑界面
     */
    @RequestMapping(value = "/edit", method = GET)
    public String edit() {
        return "article/editor";
    }


    /**
     * 文章显示界面
     */
    @RequestMapping(value = "/{id}", method = GET)
    public String article(@PathVariable("id") Long id, Model model, HttpServletRequest request) throws ParseException {

        HashMap<String, Object> article = articleService.getArticle(id);
        model.addAttribute("article", article);

        String ip="";

        if (request != null) {
            ip = request.getHeader("X-FORWARDED-FOR");
            if (ip == null || "".equals(ip)) {
                ip = request.getRemoteAddr();
            }
        }


        articleService.read(id, ip);

        return "article/article";
    }

    /**
     * 提交文章
     */
    @RequestMapping(value = "/submit", method = POST)
    @ResponseBody
    public HashMap<String, Object> submit(@RequestParam("title")String title,
                                          @RequestParam("content")String content,
                                          @RequestParam("cid")Long cid,
                                          @RequestParam("topics[]")List<String> topics,
                                          @SessionAttribute("current_user")User user) {

        final Long aid = articleService.add(user.getId(), title, content, cid);

        for(String topicName : topics) {
            Topic topic = topicService.selectByName(topicName);

            if(topic == null){
                topic = new Topic(topicName);
                topicService.insert(topic);
            }
            atsService.insert(aid, topic.getId());
        }

        return new HashMap<String, Object>(){{
            put("status", "success");
            put("articleId", aid);
        }};
    }

    /**
     * 提交评论
     * @param aid
     * @param rid
     * @param content
     * @param session
     * @return
     */
    @RequestMapping(value = "/review", method = POST)
    @ResponseBody
    public HashMap<String, Object> review(@RequestParam("aid") Long aid,
                                          @RequestParam("atuid") Long atuid,
                                          @RequestParam("rid") Long rid,
                                          @RequestParam("content") String content,
                                          HttpSession session){

        User user = (User) session.getAttribute("current_user");
        if(user != null) {
            System.out.print("评论"+content);

            articleReviewService.insert(user.getId(), atuid, aid, rid, content);

            return new HashMap<String, Object>(){{
                put("status", "success");
            }};
        }
        // Login
        else {
            return new HashMap<String, Object>(){{
                put("status", "login");
            }};
        }
    }

    @RequestMapping(value = "/reviews", method = POST)
    @ResponseBody
    public HashMap<String, Object> reviews(@RequestParam("aid") Long aid,
                                           @RequestParam("page") int page,
                                           @RequestParam("size") int size){


        HashMap<String, Object> res = articleReviewService.getById(aid, page, size);

        res.put("status", "success");
        return res;
    }

    @RequestMapping(value = "/image", method = POST)
    @ResponseBody
    public HashMap<String, Object> image(@RequestParam("file") final MultipartFile file,
                                         HttpServletRequest request) throws IOException {

        // 上传文件的根路径
        String root = "/static/upload/article/";

        // 每天一个文件夹
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        root += formatter.format(new Date()) + "/";

        String path = request.getSession().getServletContext().getRealPath(root);
        // 如果文件夹不存在，则创建
        File dir = new File(path);
        if(!dir.exists() || !dir.isDirectory())
            dir.mkdirs();

        // 唯一的文件名
        String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        file.transferTo(new File(path + filename));

        final String url = root + filename;
        return new HashMap<String, Object>(){{
            put("status", "success");
            put("url", url);
        }};
    }


    @RequestMapping(value = "/categories", method = POST)
    @ResponseBody
    public HashMap<String, Object> categories() {
        return new HashMap<String, Object>(){{
            put("status", "success");
            put("categories", categoryService.all());
        }};
    }
}
