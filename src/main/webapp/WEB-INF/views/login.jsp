<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: ice
  Date: 2017/5/16
  Time: 17:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>login</title>
    <link rel="shortcut icon" href="<c:url value="/static/img/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/user/login.css"/>">
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/msgbox.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/user/login.js"/> "></script>
</head>
<body>

<div class="page">
    <section class="login-form">
        <div class="title">Log In</div>
        <input name="username" title="" placeholder="Username" id="username" class="input">
        <input name="password" type="password" title="" placeholder="Password" id="password" class="input">
        <button id="submit" class="button">LOGIN</button>
        <div class="notices">Not register? <a class="a" href="<c:url value="/user/signup"/>">Create an account.</a></div>
    </section>
</div>

</body>
</html>
