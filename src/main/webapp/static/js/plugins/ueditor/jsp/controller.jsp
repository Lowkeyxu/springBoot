<%@ page language="java" contentType="text/html; charset=UTF-8"
         import="com.jktech.jk1688.common.utils.ComConstants, com.jktech.jk1688.logic.vo.login.UserVo,com.jktech.jk1688.common.config.Global"
         pageEncoding="UTF-8" %>
<%@ page import="com.baidu.ueditor.ActionEnter" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%
    request.setCharacterEncoding("utf-8");
    response.setHeader("Content-Type", "text/html");

    if (session.getAttribute(ComConstants.SESSION_USERINFO) == null) {
        out.write("{\"state\": \"匿名用户不能使用\"}");
    } else {
        String baseDir = Global.getConfig("userfiles.basedir");
        String rootPath = application.getRealPath("/");
        UserVo loginVo = (UserVo) session.getAttribute(ComConstants.SESSION_USERINFO);
        out.write(new ActionEnter(request, rootPath, baseDir, loginVo.getId()).exec());
    }
%>
