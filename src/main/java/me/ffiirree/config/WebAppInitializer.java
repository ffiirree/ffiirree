package me.ffiirree.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Created by ice on 2017/5/7.
 * 配置DispatcherServlet, DispatcherServlet负责将路由分发到其他的组中
 * 以及Spring应用上下文
 */
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer{

    /**
     *
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { RootConfig.class };
    }

    /**
     * 指定配置类
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { WebConfig.class };
    }

    /**
     * 将 DispatcherServlet映射到"/"
     */
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}
