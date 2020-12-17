<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.wednesday.model.Movie" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Search Result</title>
</head>
<body>
<%! Movie movie = null;%>
<%
    movie = Movie.search(request.getParameter("keyword"), Integer.parseInt(request.getParameter("type-key")));
%>
Title: <%=movie != null ? movie.getTitle() : "null"%> (<%=movie != null ? movie.getYear() : "null"%>)<br>
Actor: <%=movie != null ? movie.getActor() : "null"%><br>
Actress: <%=movie != null ? movie.getActress() : "null"%><br>
Genre: <%=movie != null ? movie.getGenre() : "null"%><br>
<a href="${pageContext.request.contextPath}/movies">Go Back</a>
</body>
</html>
