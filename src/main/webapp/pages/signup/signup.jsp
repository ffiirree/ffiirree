<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Sign Up</title>
    <link rel="shortcut icon" href="<c:url value="/image/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/components/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/pages/signup/signup.css"/>">

    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/msgbox.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/pages/signup/signup.js"/> "></script>
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
