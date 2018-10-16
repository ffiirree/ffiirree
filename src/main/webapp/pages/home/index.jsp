<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>ffiirree</title>
    <link rel="shortcut icon" href="<c:url value="/image/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/components/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/components/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/pages/home/index.css"/>">

    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/jquery-3.2.1.min.js"/> "></script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/router.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/pages/home/index.js"/> "></script>
</head>
<body>

<%@ include file="../../components/header/navbar.jsp"%>
<div class="page">

    <%-- 左侧页面 --%>
    <div class="left">

        <%-- 文章列表 --%>
        <div id="list">
            <%-- 文章 --%>
            <div class="article" v-for="article in articles">
                <%-- 文章的topic --%>
                <div class="topics">
                    <span class="topic" v-for="topic in article.topics">{{ topic.name }}</span>
                </div>

                <div class="title"><a class="a" :href="'/article/'+article.id">{{ article.title }}</a></div>
                <div class="content">{{ article.content.substr(0, 100) + '...' }}</div>

                <div class="details">
                    <div class="category">{{ article.category.name }}</div>
                    <ul class="ul-right">
                        <li class="submit-time"><i class="fa fa-clock-o"></i><span>{{ article.submitTime }}</span></li>
                        <li class="read-number"><i class="fa fa-eye"></i><span>{{ article.readNumber }}</span></li>
                        <li class="comment-number"><i class="fa fa-comment"></i><span>{{ article.reviewNumber }}</span></li>
                    </ul>
                </div>
            </div>
        </div>

        <%-- 分页 --%>
        <div class="pagination" id="pagination">
            <ul class="ul-left" v-if="LAST_PAGE">
                <li class="first-page" @click="first"><i class="fa fa-angle-double-left"></i></li>
                <li class="prev-page" @click="prev"><i class="fa fa-angle-left"></i></li>
                <li class="current-page">{{ page }}</li>
                <li class="next-page" @click="next"><i class="fa fa-angle-right"></i></li>
                <li class="last-page" @click="last"><i class="fa fa-angle-double-right"></i></li>
            </ul>
        </div>
    </div>

    <%-- 右侧页面，显示文章分类及其他信息 --%>
    <div class="right">
        <div id="categories">
            <div v-for="c in categories" class="top-categories">
                <div class="content" @click="category(c)">
                    <span>{{ c.name }}</span><span>({{ c.count }})</span>
                </div>
                <div v-for="subc in c.child" class="sub-categories" :id="'SUBC_'+c.id" style="display: none">
                    <div :class="subc.id" @click="category(subc)">
                        <span>{{ subc.name }}</span><span>({{ subc.count }})</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<%-- 页脚 --%>
<footer>
    <div class="info">辽ICP备17010175号-1 | Copyright © 2017 - ffiirree - All Rights Reserved</div>
</footer>
</body>
</html>
