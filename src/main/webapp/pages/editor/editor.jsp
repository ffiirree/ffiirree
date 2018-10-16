<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>写文章</title>
    <link rel="shortcut icon" href="<c:url value="/image/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/components/default/default.css"/>">
    <link rel="stylesheet" href="<c:url value="/components/plugins/highlight/styles/default.css"/>">
    <link rel="stylesheet" href="<c:url value="/components/plugins/codemirror/lib/codemirror.css"/>">
    <link rel="stylesheet" href="<c:url value="/components/plugins/font-awesome/css/font-awesome.min.css"/>">

    <script type="text/javascript" src="<c:url value="/components/plugins/jquery-3.2.1.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/components/plugins/raphael.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/components/plugins/flowchart.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/components/plugins/marked.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/components/plugins/codemirror/lib/codemirror.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/components/plugins/codemirror/mode/markdown/markdown.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/components/plugins/codemirror/mode/gfm/gfm.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/components/plugins/highlight/highlight.pack.js"/>"></script>
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

    <script type="text/javascript" src="<c:url value="/pages/editor/webmd.js"/>"></script>
    <link rel="stylesheet" href="<c:url value="/pages/editor/webmd.css"/>">

    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/msgbox.js"/>"></script>
    <link rel="stylesheet" href="<c:url value="/pages/editor/editor.css"/>">

    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/components/plugins/router.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/pages/editor/editor.js"/>"></script>
</head>
<body>
<div>

    <div class="title-box">
        <input id="title-input" title="" placeholder="输入标题..">
        <div >
            <button class="button" id="article-submit">提交</button>
        </div>
    </div>

    <section id="editor"></section>
</div>

<div class="article-details-background" style="display: none">
    <div class="article-details">
        <div class="title">文章设置</div>

        <div class="input-bar">
            <div>个人集合</div>
            <select title="" id="categories">
                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </select>
        </div>

        <div class="input-bar">
            <div>文章标签</div>
            <div class="topics-bar">
                <%--标签显示--%>
                <div class="add-topics" id="topic-list">
                    <span v-for="(topic, index) in topics" class="topic-cell">
                        <span>{{ topic }}</span><span class="fa fa-close" v-on:click="remove(index)"></span>
                    </span>
                </div>
                <%--标签输入--%>
                <input id="topics" name="topics" title="" placeholder="添加标签">
            </div>
        </div>

        <div>
            <button class="submit fs-button" id="submit-article">SUBMIT</button>
        </div>
    </div>
</div>

</body>
</html>
