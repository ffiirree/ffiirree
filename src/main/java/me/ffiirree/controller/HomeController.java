package me.ffiirree.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@RequestMapping(value = {"/", "/home", "/index"})
public class HomeController {

    /**
     * 返回首页视图
     */
    @RequestMapping(method = {GET, POST})
    public String home() {
        return "index";
    }
}
