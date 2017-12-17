<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>ffiirree</title>
    <link rel="shortcut icon" href="<c:url value="/static/image/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/index/index.css"/>">
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Tangerine|Lato|Consolas">

    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/template.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/minx/watcher.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/minx/observer.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/minx/compile.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/minx/router.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/minx/minx.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/index/index.js"/> "></script>
</head>
<body>

<div class="spinner" id="index-loading">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
</div>

<%@ include file="component/navbar.jsp"%>
<div class="page">

    <%-- 左侧页面 --%>
    <div class="left">

        <%-- 文章列表 --%>
        <div id="list">
            <div class="article" x-for="article:articles">
                <div class="topics">
                    <span class="topic" x-for="topic:article.topics">{{ topic.name }}</span>
                </div>
                <div class="title"><a class="a" x-attr:href="'/article/'+article.id">{{ article.title }}</a></div>
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
            <ul class="ul-left" x-if="page">
                <li class="first-page" x-on:click="first"><i class="fa fa-angle-double-left"></i></li>
                <li class="prev-page" x-on:click="prev"><i class="fa fa-angle-left"></i></li>
                <li class="current-page">{{ current }}</li>
                <li class="next-page" x-on:click="next"><i class="fa fa-angle-right"></i></li>
                <li class="last-page" x-on:click="last"><i class="fa fa-angle-double-right"></i></li>
            </ul>
        </div>
    </div>

    <%-- 右侧页面，显示文章分类及其他信息 --%>
    <div class="right">
        <div id="categories">
            <div x-for="c:categories">
                <div x-attr:class="c.id" x-on:click="category(c.id)">
                    <span>{{ c.name }}</span><span>({{ c.count }})</span>
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
