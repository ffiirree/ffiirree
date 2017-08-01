<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: ice
  Date: 2017/6/4
  Time: 21:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link type="text/css" rel="stylesheet" href="<c:url value="/static/ee/ee.css"/>">
<link type="text/css" rel="stylesheet" href="<c:url value="/static/editor/mark.css"/>">
<link rel="stylesheet" href="<c:url value="/static/plugins/font-awesome/css/font-awesome.min.css"/>">
<link type="text/css" rel="stylesheet" href="<c:url value="/static/plugins/highlight/styles/default.css"/>">
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
<script type="text/javascript" rel="script" src="<c:url value="/static/ee/ee.js"/>"></script>
<script type="text/javascript" rel="script" src="<c:url value="/static/editor/zmdMenu.js"/>"></script>
<script type="text/javascript" rel="script" src="<c:url value="/static/editor/mark.js"/>"></script>
<script type="text/javascript" rel="script" src="<c:url value="/static/plugins/msgbox.js"/>"></script>
