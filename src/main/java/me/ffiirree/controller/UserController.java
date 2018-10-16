package me.ffiirree.controller;

import me.ffiirree.service.IUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
@RequestMapping(value = "/user")
public class UserController {


    @Resource private IUserService userService;

    /**
     * 登录界面
     */
    @RequestMapping(value = "/login", method = GET)
    public String login() {
        return "login/login";
    }

    /**
     * 注册界面
     */
    @RequestMapping(value = "/signup", method = GET)
    public String signup(){
        return "signup";
    }

    @RequestMapping(value = "/logout", method = GET)
    public String logout(HttpSession session){
        session.removeAttribute("current_user");
        return "redirect:/login/login";
    }

    /**
     * 登录
     */
    @RequestMapping(value = "/login", method = POST)
    @ResponseBody
    public HashMap<String, String> login(@RequestParam("username")String username,
                                         @RequestParam("password")String password,
                                         HttpSession session) {

        HashMap<String, String> res = new HashMap<String, String>();

        if(userService.login(username, password)){
            res.put("status", "success");
            session.setAttribute("current_user", userService.getUserByUsername(username));
            return  res;
        }

        res.put("status", "failed");
        return res;
    }


    /**
     * 注册
     */
    @RequestMapping(value = "/signup", method = POST)
    @ResponseBody
    public HashMap<String, String>  signup(@RequestParam("username")String username,
                                           @RequestParam("password")String password,
                                           @RequestParam("email")String email,
                                           HttpSession session) {

        userService.signup(username, password, email);
        session.setAttribute("current_user", userService.getUserByUsername(username));

        return new HashMap<String, String>(){{
            put("status", "success");
        }};
    }
}
