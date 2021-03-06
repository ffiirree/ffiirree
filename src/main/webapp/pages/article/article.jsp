<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>${article.title}</title>
    <link rel="shortcut icon" href="<c:url value="/image/icon/favicon.ico"/>" />

    <link type="text/css" rel="stylesheet" href="<c:url value="/components/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/pages/editor/mark.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/components/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/components/plugins/highlight/styles/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/pages/login/login.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/pages/article/article.css"/>">
    <%--<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Tangerine|Lato|Consolas">--%>

    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/jquery-3.2.1.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/autosize.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/marked.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/raphael.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/flowchart.min.js"/> "></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/highlight/highlight.pack.js"/> "></script>
    <script>hljs.initHighlightingOnLoad();</script>

    <!--MathJax-->
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
    <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/msgbox.js"/>"></script>
    <script>let aid = ${article.id};</script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/router.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/pages/article/article.js"/>"></script>
</head>
<%@include file="../../components/header/navbar.jsp"%>
<body>

<div class="page">
    <textarea title="" style="display:none;" id="article-content">${article.content}</textarea>
    <article class="article">
        <div class="title">
           ${article.title}
        </div>
        <div class="article-details">
            READ (${article.readNumber}) &nbsp; UPDATE ${article.editTime}
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

    <div id="reviews">
        <div class="review-number">共<span id="review-number">{{ count }}</span>条评论</div>
        <hr class="fs-hr">
        <div class="review-list">
            <div v-for="review in reviews">
                <%-- review start --%>
                <div class="review" :id="'review_' + review.id">
                    <div class="primary-review">
                        <div class="user-info">
                            <div class="user-avatar">
                                <img :src="review.user.avatar"/>
                            </div>
                            <div class="details">
                                <div class="user-name">{{ review.user.username }}</div>
                                <div class="review-info">{{ review.submitTime }}</div>
                            </div>
                        </div>
                        <div class="content">{{ review.content }}</div>
                        <div class="primary-operation">
                            <ul class="ul-left">
                                <li @click="reply(review)">回复</li>
                            </ul>
                        </div>
                    </div>

                    <div class = "replies">
                        <div v-for="_reply in review.replies">
                            <div class="secondary-review" :id="'reply_'+ _reply.id ">
                                <div class="reply-box">
                                    <span>{{ _reply.user.username }}</span>
                                    <span>: @{{ _reply.atu.username }}</span>
                                    <span class="reply-content"> : {{ _reply.content }}</span>
                                    <div class="secondary-operation">
                                        <ul class="ul-left">
                                            <li>{{ _reply.submitTime }}</li>
                                            <li v-on:click="reply(review, _reply)">回复</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <%-- review end --%>
            </div>
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


</body>
</html>
