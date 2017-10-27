<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>搜索</title>
    <link rel="shortcut icon" href="<c:url value="/static/img/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/search/search.css"/>">
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/template.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/search/search.js"/> "></script>
</head>

<body>
<%@ include file="component/navbar.jsp"%>

<div class="page" style="display: none">

    <%-- 左侧页面 --%>
    <div class="left">

        <ul class="title ul-left">
            <li id="article">文章</li>
            <li id="topic">话题</li>
        </ul>

        <%-- 文章列表 --%>
        <div id="list"></div>

        <%-- 分页 --%>
        <div class="pagination" style="display: none;">
            <ul class="ul-left">
                <li class="first-page"><i class="fa fa-angle-double-left"></i></li>
                <li class="prev-page"><i class="fa fa-angle-left"></i></li>
                <li class="current-page"></li>
                <li class="next-page"><i class="fa fa-angle-right"></i></li>
                <li class="last-page"><i class="fa fa-angle-double-right"></i></li>
            </ul>
        </div>
    </div>

    <%-- 右侧页面，显示文章分类及其他信息 --%>
    <div class="right">

    </div>

</div>

<%-- 文章列表中的文章的模板 --%>
<div id="article-template" style="display: none;">
    <div class="article">
        <div class="topics"></div>
        <div class="title"><a class="a" href="<c:url value="/article/{{id}}"/>">{{title}}</a></div>
        <div class="content">{{content}}</div>
        <div class="details">
            <div class="category">{{category}}</div>
            <ul class="ul-right">
                <li class="submit-time"><i class="fa fa-clock-o"></i><span>{{submitTime}}</span></li>
                <li class="read-number"><i class="fa fa-eye"></i><span>{{readNumber}}</span></li>
                <li class="comment-number"><i class="fa fa-comment"></i><span>{{commentNumber}}</span></li>
            </ul>
        </div>
    </div>
</div>

</body>
</html>
