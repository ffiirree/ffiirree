package me.ffiirree.config;


import org.apache.commons.dbcp.BasicDataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

/**
 * Created by ice_q on 2016/8/2.
 *
 */
@Configuration
@MapperScan("me.ffiirree.mapper")
public class DataConfig  extends CachingConfigurerSupport {

    @Bean
    public PropertyPlaceholderConfigurer propertyPlaceholderConfigurer(
            @Value("classpath:mysql.properties") Resource mysql) {
        PropertyPlaceholderConfigurer propertyPlaceholderConfigurer = new PropertyPlaceholderConfigurer();
        propertyPlaceholderConfigurer.setLocations(mysql);
        return propertyPlaceholderConfigurer;
    }

    @Bean
    public BasicDataSource dataSource(@Value("${mysql.username}") String username,
                                      @Value("${mysql.password}") String password,
                                      @Value("${mysql.driverClassName}") String driverClassName,
                                      @Value("${mysql.url}") String url) {
        BasicDataSource ds = new BasicDataSource();

        ds.setDriverClassName(driverClassName);
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);

        return ds;
    }

    @Bean
    public JdbcOperations jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);
        sessionFactory.setTypeAliasesPackage("me.ffiirree.model");
        return sessionFactory;
    }
}
