<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- 主导航栏 --%>
<head>
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/component/navbar.css"/>">
    <script type="text/javascript" rel="script" src="<c:url value="/static/component/navbar.js"/> "></script>
</head>
<header class="primary-nav">


    <div class="primary-nav-box">
        <div class="logo">
            <a href="<c:url value="/home"/>">ffiirree </a>
        </div>

        <div class="search">
            <div class="search-bar">
                <input id="search-input" placeholder="搜索文章">
                <div class="fa fa-search"></div>
            </div>
        </div>

    </div>
</header>

