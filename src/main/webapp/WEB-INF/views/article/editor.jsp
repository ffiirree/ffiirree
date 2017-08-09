<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: ice
  Date: 2017/5/16
  Time: 19:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>写文章</title>
    <link rel="shortcut icon" href="<c:url value="/static/img/icon/favicon.ico"/>" />
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/default/default.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/editor/style/zmdUI.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/editor/editor.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/editor/style/mark.css"/>">
    <link rel="stylesheet" href="<c:url value="/static/plugins/font-awesome/css/font-awesome.min.css"/>">
    <link type="text/css" rel="stylesheet" href="<c:url value="/static/plugins/highlight/styles/agate.css"/>">
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
    <script type="text/javascript" rel="script" src="<c:url value="/static/editor/script/zmdUI.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/editor/script/zmdMenu.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/editor/script/mark.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/plugins/msgbox.js"/>"></script>
    <script type="text/javascript" rel="script" src="<c:url value="/static/editor/editor.js"/>"></script>
</head>
<body>
<div class="zmd" id="zmd">

    <div class="zmd-title-input-margin">
        <input id="zmd-title-input" title="" placeholder="输入标题..">
    </div>
    <nav class="zmd-menu">
        <ul id="menu-opera">
            <li id="zmd-bold" title="加粗"><i class="fa fa-bold"></i></li>
            <li id="zmd-italic" title="倾斜"><i class="fa fa-italic"></i></li>
            <li id="zmd-chain" title="链接"><i class="fa fa-chain"></i></li>
            <li id="zmd-quote" title="引用"><i class="fa fa-indent"></i></li>
            <li id="zmd-code" title="插入代码"><i class="fa fa-code"></i></li>
            <li id="zmd-math" title="插入公式"><i class="fa fa-maxcdn"></i></li>
            <li id="zmd-picture" title="插入图片"><i class="fa fa-image"></i></li>
            <li id="zmd-list-ul" title="插入无序列表"><i class="fa fa-list-ul"></i></li>
            <li id="zmd-list-ol" title="插入有序列表"><i class="fa fa-list-ol"></i></li>
            <li id="zmd-table" title="插入表单"><i class="fa fa-table"></i></li>
            <li id="zmd-header" title="插入标题"><i class="fa fa-header"></i></li>
            <li id="zmd-line" title="插入横线"><i>--</i></li>
            <li id="zmd-undo" title="撤销"><i class="fa fa-mail-reply"></i></li>
            <li id="zmd-redo" title="重做"><i class="fa fa-mail-forward"></i></li>
            <li id="zmd-save" title="保存到草稿"><i class="fa fa-save"></i></li>
            <li id="zmd-open" title="打开并编辑本地的Markdown文件"><i class="fa fa-upload"></i><input id="input-file" type="file" style="display: none"></li>
            <li id="zmd-download" title="以文本形式保存到本地"><i class="fa fa-download"></i></li>
            <li id="zmd-question" title="疑问"><i class="fa fa-question-circle-o"></i></li>
        </ul>

        <ul id="zmd-window">
            <li id="zmd-columns-2" title="分屏显示"  style="display: none"><i class="fa fa-columns"></i></li>
            <li id="zmd-columns-1" title="单屏显示"><i class="fa fa-television"></i></li>
            <li id="zmd-preview-button" title="预览" style="display: none"><i class="fa fa-eye"></i></li>
            <li id="zmd-nonpreview-button" title="关闭预览" style="display: none"><i class="fa fa-eye-slash"></i></li>
        </ul>

        <div id="zmd-submit-box">
            <button id="zmd-submit">发表</button>
        </div>
    </nav>

    <section id="zmd-editor">

        <!-- === 编辑区 === -->
        <div id="zmd-textarea-scroll"><!-- 滚动条 -->
            <div id="zmd-textarea-box"><!-- 帮助实现单屏和分屏 -->
                <div id="zmd-textarea-margin"><!-- 编辑器外边界 -->
                    <textarea id="zmd-textarea" title="" placeholder="输入正文..."></textarea>
                </div>
            </div>
        </div>

        <!-- === 预览区 === -->
        <div id="zmd-preview-scroll">
            <div id="zmd-preview-margin">
                <article id="zmd-preview" class="mark"></article>
            </div>
        </div>

    </section>
</div>

<!-- === 链接输入框 === -->
<div class="link-window-background dialog-box-background" style="display: none;">
    <div class="link-window dialog-box">
        <div class="link-window-title dialog-box-title">
            链接
        </div>
        <div class="link-title">
            链接描述
            <input title="" placeholder="输入链接描述，例如：谷歌">
        </div>
        <div class="link-url">
            链接网址
            <input title="" placeholder="输入网址，例如：https://www.google.com.hk/">
        </div>
        <div class="link-window-operation">
            <button class="link-cancel">取消</button>
            <button class="link-ok">确认</button>
        </div>
    </div>
</div>


<!-- === 链接输入框 === -->
<div class="picture-window-background dialog-box-background" style="display: none">
    <div class="picture-window dialog-box">
        <div class="picture-window-title dialog-box-title">
            图片
        </div>
        <div class="picture-title">
            图片描述
            <input title="" placeholder="可选">
        </div>
        <div class="picture-upload">
            <div class="picture-upload-process"></div>
            <div class="picture-upload-title">上传图片</div>
            <input title="" placeholder="输入网址，例如：https://www.google.com.hk/" type="file">
        </div>
        <div class="picture-window-operation">
            <button class="picture-cancel">取消</button>
            <button class="picture-ok">确认</button>
        </div>
    </div>
</div>

<div class="article-details-background" style="display: none">
    <div class="article-details">
        <div class="title">文章设置</div>

        <div class="input-bar">
            <div>个人集合</div>
            <select title="" id="categories"></select>
        </div>

        <div class="input-bar">
            <div>文章标签</div>
            <div class="topics-bar">
                <div class="add-topics"></div>
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
