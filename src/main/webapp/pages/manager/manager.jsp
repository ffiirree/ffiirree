<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
    <title>管理</title>
    <link rel="shortcut icon" href="<c:url value="/image/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/components/default/default.css"/>">
    <link rel="stylesheet" href="<c:url value="/pages/manager/manager.css"/>">

    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/jquery-3.2.1.min.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/router.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/pages/manager/manager.js"/>"></script>
</head>
<body>
<div>
    <%@ include file="../../components/header/navbar.jsp"%>

    <div class="page">

        <ul class="header ul-left">
            <li id="article">文章</li>
            <li id="categories">分类</li>
        </ul>

        <%-- 文章列表 --%>
        <div id="article-list" class="section">
            <div v-for="article in articles" class="article">
                <div class="article-info">
                    <a class="title a" :href="'/article/' + article.id">{{ article.title }}</a><span class="attach"> ({{ article.category.name }})</span>
                </div>
                <ul class="operation ul-left">
                    <li class="modify"><a :href="'/article/edit#!/type=modify&id='+article.id">修改</a></li>
                    <li class="delete" @click="del(article)">删除</li>
                </ul>
            </div>
        </div>

        <%--分类列表--%>
        <div id="categories-list" style="display: none;" class="section">
            <div v-for="c in categories" class="category">
                <div :class="c.id" class="category-info">
                    <div class="name">
                        <span class="title">{{ c.name }}</span><span class="attach"> ({{ c.count }})</span>
                    </div>
                    <div class="parent">
                        <div>{{ c.parent ? c.parent.name :'-' }}</div>
                    </div>
                </div>
                <ul class="operation ul-left">
                    <li class="modify" @click="modify(c)">修改</li>
                    <li class="delete" @click="del(c)">删除</li>
                </ul>
            </div>
            <div class="category">
                <div class="category-info">
                </div>
                <ul class="operation ul-left">
                    <li id="insert-category">添加</li>
                </ul>
            </div>
        </div>

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

</div>

<div id="delete-window" class="delete-window-background" style="display: none">
    <div class="window">
        <div class="title">删除<span id="delete-type"></span></div>
        <div class="content">确认删除 <span id="delete-name"></span>?</div>
        <div class="operation">
            <div class="delete" id="delete-do">删除</div>
            <div class="cancel" id="delete-cancel">取消</div>
        </div>
    </div>
</div>


<div id="insert-category-window" class="insert-category-background" style="display: none">
    <div class="window">
        <div class="title">添加分类</div>
        <div  class="input-name">
            <div>NAME</div><input type="text" id="input-category-name">
        </div>
        <div  class="input-parent">
            <div>PARENT</div>
            <select id="categories-select">
                <option  value="0">NONE</option>
                <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
            </select>
        </div>
        <div class="operation">
            <div class="insert" id="insert-category-do">添加</div>
            <div class="cancel" id="insert-category-cancel">取消</div>
        </div>
    </div>
</div>

<div id="update-category-window" class="insert-category-background" style="display: none">
    <div class="window">
        <div class="title">修改分类</div>
        <div  class="input-name">
            <div>NAME</div><input type="text" id="update-category-name">
        </div>
        <div  class="input-parent">
            <div>PARENT</div>
            <select id="update-categories-select">
                <option  value="0">NONE</option>
                <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
            </select>
        </div>
        <div class="operation">
            <div class="update" id="update-category-do">修改</div>
            <div class="cancel" id="update-category-cancel">取消</div>
        </div>
    </div>
</div>
</body>
</html>
