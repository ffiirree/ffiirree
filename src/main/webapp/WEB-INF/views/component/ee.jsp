<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: ice
  Date: 2017/5/16
  Time: 19:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="zmd" id="zmd">

    <%-- 菜单部分 --%>
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
        </ul>

        <ul id="zmd-window">
            <li id="zmd-preview-button" title="预览"><i class="fa fa-eye"></i></li>
            <li id="zmd-nonpreview-button" title="关闭预览" style="display: none"><i class="fa fa-eye-slash"></i></li>
        </ul>
    </nav>

    <%-- 编辑预览区 --%>
    <section id="zmd-editor">

        <!-- === 编辑区 === -->
        <div id="zmd-edit-area"><!-- 滚动条 -->
            <div id="zmd-textarea-margin"><!-- 编辑器外边界 -->
                <textarea id="zmd-textarea" title="" placeholder="输入正文..."></textarea>
            </div>
        </div>

        <!-- === 预览区 === -->
        <div id="zmd-preview-area" style="display: none;">
            <div id="zmd-preview-margin">
                <article id="zmd-preview" class="mark"></article>
            </div>
        </div>

    </section>
</div>
<!-- === 链接输入框 === -->
<div class="link-window-background" style="display: none;">
    <div class="link-window">
        <div class="link-window-title">
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
<div class="picture-window-background" style="display: none">
    <div class="picture-window">
        <div class="picture-window-title">
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

