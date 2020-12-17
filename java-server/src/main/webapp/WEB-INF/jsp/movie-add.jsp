<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.wednesday.model.Movie" %><%--
  Created by IntelliJ IDEA.
  User: lihangzhou
  Date: 10/15/20
  Time: 00:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Add Movie</title>
</head>
<body>
<jsp:useBean id="movie" class="com.wednesday.model.Movie" scope="page">
    <jsp:setProperty name="movie" property="*"/>
</jsp:useBean>
<c:set var="added" scope="page" value="${Movie.addMovie(movie)}"/>
<c:choose>
    <c:when test="${added = true}">
        <c:out value="Added Successfully"/>
    </c:when>
    <c:otherwise>
        <c:out value="Failed to add!"/>
    </c:otherwise>
</c:choose>
<a href="${pageContext.request.contextPath}/movies">Go Back</a>
</body>
</html>
