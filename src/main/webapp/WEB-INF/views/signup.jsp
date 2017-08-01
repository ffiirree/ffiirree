<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: ice
  Date: 2017/5/16
  Time: 19:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Sign Up</title>
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/user/signup.css"/>">
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/msgbox.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/user/signup.js"/> "></script>
</head>
<body>

<div class="page">
    <section class="signup">
        <div class="title">Sign Up</div>
        <input name="username" title="" placeholder="Username" id="username" class="input">
        <input name="password" type="password" title="" placeholder="Password" id="password" class="input">
        <input name="email" type="email" title="Enter your email." placeholder="email" id="email" class="input">
        <button id="submit" class="button">SIGN UP</button>
        <div class="notices">Already have an account? <a class="a" href="<c:url value="/user/login"/>">Log In.</a></div>
    </section>
</div>

</body>
</html>
