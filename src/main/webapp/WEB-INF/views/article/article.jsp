<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: ice
  Date: 2017/5/17
  Time: 19:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>${article.title}</title>
    <link rel="shortcut icon" href="<c:url value="/static/image/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/editor/style/mark.css"/>">
    <link rel="stylesheet" href="<c:url value="/static/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/plugins/highlight/styles/agate.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/user/login.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/article/article.css"/>">
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/autosize.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/marked.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/raphael.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/flowchart.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/webfont.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/snap.svg-min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/underscore-min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/sequence-diagram-min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/highlight/highlight.pack.js"/> "></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            extensions: ["tex2jax.js"],
            jax: ["input/TeX", "output/HTML-CSS"],
            tex2jax: {
                inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
                processEscapes: true
            },
            "HTML-CSS": { availableFonts: ["TeX"] }
        });
    </script>
    <script type="text/javascript" src="/static/plugins/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/msgbox.js"/>"></script>
    <script>let aid = ${article.id};</script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/template.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/article/article.js"/>"></script>
</head>
<%@include file="../component/navbar.jsp"%>
<body>

<div class="page">
    <textarea title="" style="display:none;" id="article-content">${article.content}</textarea>
    <article class="article">
        <div class="title">
           ${article.title}
        </div>
        <div class="article-details">
            阅读(${article.readNumber}) UPDATE ${article.editTime}
        </div>
        <div id="article-preview" class="content mark">

        </div>
    </article>

    <div class="article-copyright">
        <div class="article-copyright-content">
            © 著作权归作者所有
        </div>
    </div>

    <!--== 文章的评论 ==-->
    <div class="article-review">
        <div class="article-review-box">
            <textarea name="content" title="" class="review-content" id="review-textarea"></textarea>
            <div class="submit-box">
                <button type="button" id="review-button">发表评论</button>
            </div>
        </div>
    </div>

    <div class="review-number">共<span id="review-number"></span>条评论</div>
    <hr class="fs-hr">
    <div class="display-review">
        <div class="review-list" id="review-list">
        </div>
    </div>
</div>


<div class="login-background login" style="display: none;">
    <section class="login-form">
        <div class="title">Log In</div>
        <input name="username" title="" placeholder="Username" id="username" class="input">
        <input name="password" type="password" title="" placeholder="Password" id="password" class="input">
        <button id="submit" class="button">LOGIN</button>
        <div class="notices">Not register? <a class="a" href="<c:url value="/user/signup"/>">Create an account.</a></div>
    </section>
</div>


<!--== 文章的评论 ==-->
<div class="reply-background" style="display: none;">

    <div class="article-review">
        <div class="at">@<span id="at_name"></span>:<span id="at_content"></span></div>
        <div class="article-review-box">
            <textarea name="content" title="" class="review-content" id="reply-textarea"></textarea>
            <div class="submit-box">
                <button type="button" id="reply">发表评论</button>
            </div>
        </div>
    </div>
</div>



<div class="template" id="review-template">
    <div class="review" id="review_{{ id }}">
        <div class = "primary-review">
            <div class="user-info">
                <div class="user-avatar">
                    <a><img src="{{ avatar }}"/></a>
                </div>
                <div class="details">
                    <div class="user-name"><a class="a">{{ username }} </a></div>
                    <div class="review-info">{{ index }}楼 · {{ submitTime }}</div>
                </div>
            </div>
            <div class="content">{{ content }}</div>
            <div class="primary-operation">
                <ul class="ul-left">
                    <li class="reply">回复</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="template" id="reply-template">
    <div class="secondary-review" id="reply_{{ id }}">
        <div class="reply-box">
            <span class="mine-name"><a >{{ username }}</a></span>
            <span class="his-name">: <a > @{{ at_name }}</a></span>
            <span class="reply-content"> : {{ content }}</span>
            <div class="secondary-operation">
                <ul class="ul-left">
                    <li>{{ submitTime }}</li>
                    <li class="reply">回复</li>
                </ul>
            </div>
        </div>
    </div>
</div>


</body>
</html>
