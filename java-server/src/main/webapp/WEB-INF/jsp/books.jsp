<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: lihangzhou
  Date: 10/14/20
  Time: 17:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Part 5 Books</title>
</head>
<body>
<form action="${pageContext.request.contextPath}/books/add-books" method="get">
    Add <input name="n" type="number" min="1" value="1"> Books <input type="submit" value="Go">
</form>

</body>
</html>
