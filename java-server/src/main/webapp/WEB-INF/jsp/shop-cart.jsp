<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: lihangzhou
  Date: 10/15/20
  Time: 13:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<a href="${pageContext.request.contextPath}/shop">Home</a>
<a href="${pageContext.request.contextPath}/shop/cart">Cart</a>
<br><c:set var="str" value="cart"/>
<c:set var="cartArray" value="${pageContext.session.getAttribute(str)}"/>
<form action="${pageContext.request.contextPath}/shop/shopping" method="post">
    <input type="hidden" name="mode" value="del">
    <label>Cart</label><input type="submit" value="Delete Items"><br>
    <c:forEach var="item" items="${cartArray}">
        <label>
            <input type="checkbox" name="del-list" value="${item}">
            <c:out value="${item}" default="None"/>
        </label><br>
    </c:forEach>
</form>


</body>
</html>
