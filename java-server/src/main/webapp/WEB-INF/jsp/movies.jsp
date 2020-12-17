<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: lihangzhou
  Date: 10/14/20
  Time: 23:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Part 4 Movies</title>
</head>
<body>
<form action="${pageContext.request.contextPath}/movies/add" method="post">
    <label>Add a movie</label><br>
    <input name="title" type="text" placeholder="Title" required>
    <input name="actor" type="text" placeholder="Actor" required>
    <input name="actress" type="text" placeholder="Actress" required>
    <input name="genre" type="text" placeholder="Genre" required>
    <input name="year" type="number" placeholder="Release Year" required>
    <input type="submit" value="Add">
</form>
<form action="${pageContext.request.contextPath}/movies/search" method="post">
    <label>Search a movie</label><br>
    <input name="keyword" type="text" placeholder="Keyword" required><input type="submit" value="Search"><br><br>
    <input type="radio" name="type-key" value=0 checked><label>Title</label><br>
    <input type="radio" name="type-key" value=1><label>Actor</label><br>
    <input type="radio" name="type-key" value=2><label>Actress</label>
</form>

</body>
</html>
