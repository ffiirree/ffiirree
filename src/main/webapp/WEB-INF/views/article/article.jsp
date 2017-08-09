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
    <link rel="shortcut icon" href="<c:url value="/static/img/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/editor/style/mark.css"/>">
    <link rel="stylesheet" href="<c:url value="/static/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/plugins/highlight/styles/agate.css"/>">
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
            阅读(${article.readNumber}) 最后更新于${article.editTime}
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
            <form action="/review/${article.id}" method="POST" id="add-review">
                <div class="review-input-box">
                    <textarea name="content" title="" class="review-content"></textarea>
                </div>
                <div class="review-button-box">
                    <button type="button" id="review-button">发表评论</button>
                </div>
            </form>
        </div>
    </div>

    <hr class="fs-hr">
    <div class="display-review">

        <div class="template" id="review-template">
            <div class="review" id="review_{{ id }}">
                <div class = "primary-review">
                    <div class="user-info">
                        <div class="user-avatar">
                            <a  href="/user/{{ mine_name }}/#!/index"><img src="/static/img/avatar/{{ mine_avatar }}"/></a>
                        </div>
                        <div class="details">
                            <div class="user-name"><a  href="/user/{{ mine_name }}/#!/index" class="fs-a">{{ mine_name }}</a></div>
                            <div class="review-info">{{ index }}楼 · {{ submit_time }}</div>
                        </div>
                    </div>
                    <div class="content">{{ content }}</div>
                    <div class="primary-operation">
                        <ul class="fs-ul">
                            <li class="reply">回复</li>
                            <%--<li class="delete">删除</li>--%>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="template" id="second-review-template">
            <div class="secondary-review" id="second-review-{{ id }}">
                <div class="reply">
                    <span class="mine-name"><a href="/user/{{ mine_name }}/#!/index">{{ mine_name }}</a></span>
                    <span class="his-name">: <a href="/user/{{ his_name }}/#!/index"> @{{ his_name }}</a></span>
                    <span class="reply-content"> : {{ content }}</span>
                    <div class="secondary-operation">
                        <ul class="fs-ul">
                            <li>{{ submit_time }}</li>
                            <%--<li class="delete">删除</li>--%>
                            <li class="reply">回复</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="review-list">
        </div>
    </div>
</div>
</body>
</html>
