<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: lihangzhou
  Date: 10/15/20
  Time: 12:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Part 6 Shop</title>
</head>
<body>
<a href="${pageContext.request.contextPath}/shop">Home</a>
<a href="${pageContext.request.contextPath}/shop/cart">Cart</a><br>

<form method="post" action="${pageContext.request.contextPath}/shop/shopping">
    <input type="hidden" name="mode" value="add">
    <input type="submit" value="Add to Cart"><br>
<%--    <jsp:useBean id="cart" class="Cart"/>--%>
    <c:forEach var="item" items="${itemList}">
        <input type="checkbox" name="cart" value="${item}">
        <label><c:out value="${item}"/></label><br>
    </c:forEach>

<%--    <input type="checkbox" name="cart" value="Apple MacBook Pro 16-inch">--%>
<%--    <label>Apple MacBook Pro 16-inch</label><br>--%>
<%--    <input type="checkbox" name="cart" value="Samsung Galaxy Note20 Ultra">--%>
<%--    <label>Samsung Galaxy Note20 Ultra</label><br>--%>
<%--    <input type="checkbox" name="cart" value="Apple iPhone 12 Pro">--%>
<%--    <label>Apple iPhone 12 Pro</label><br>--%>
<%--    <input type="checkbox" name="cart" value="Samsung Galaxy Tab S7+">--%>
<%--    <label>Samsung Galaxy Tab S7+</label><br>--%>

</form>

</body>
</html>
