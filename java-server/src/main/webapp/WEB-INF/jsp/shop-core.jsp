<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Arrays" %>
<%--
  Part 6. Programming Assignment
  Create an MVC application.
  You will be using a session object to store and retrieve selected items
  from a simple shopping cart application. Shopping cart applications
  typically allow users to select items from a catalog and place them
  in a virtual shopping cart. When the user selects some items and
  presses the Add to Cart" button, the servlet will add the selected
  items to the session object and then retrieve all of the items
  currently in the session object and then display them in the browser.
  Removing an item from the shopping cart will be from the same servlet.
  Use URL-rewriting or hidden fields as necessary to use the same
  servlet for adding and removing items.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Cart</title>
</head>
<body>
<a href="${pageContext.request.contextPath}/shop">Home</a>
<a href="${pageContext.request.contextPath}/shop/cart">Cart</a>
<br>
<b>${hint}</b>

</body>
</html>
