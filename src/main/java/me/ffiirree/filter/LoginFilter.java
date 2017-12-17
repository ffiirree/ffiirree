package me.ffiirree.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(urlPatterns={"/article/edit", "/article/submit", "/article/manager"})
public class LoginFilter extends HttpServlet implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse)servletResponse;
        HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
        HttpSession session = httpServletRequest.getSession();
        String url= httpServletRequest.getRequestURI();

        if(session.getAttribute("current_user") != null || url.equals("/user/login")){
            filterChain.doFilter(servletRequest, servletResponse);
        }
        else {
            httpServletResponse.sendRedirect("/user/login#!/url=" + url);
        }
    }
}
