<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: ice
  Date: 2017/6/3
  Time: 16:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>消息</title>
    <title>home</title>
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/component/navbar.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/user/notices.css"/>">
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/component/navbar.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/user/notices.js"/> "></script>
</head>
<body>
<%@include file="component/navbar.jsp"%>

<div class="page">
    <div class="notices">
        <div class="title">
            全部消息
        </div>

        <div class="template" id="notice-template">
            <div class="notice">
                <div class="content">{{ content }}</div>
            </div>
        </div>

        <div class="notices-list">

        </div>

        <button class="load-more">加载更多</button>
    </div>
    <div class="side">

    </div>
</div>

</body>
</html>
