<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: lihangzhou
  Date: 10/15/20
  Time: 01:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Add Book</title>
</head>
<body>
<%!
    String line = "<tr><td><input type=\"text\" name=\"isbn\" placeholder=\"ISBN\" required></td><td><input type=\"text\" " +
            "name=\"title\" placeholder=\"Title\"></td><td><input type=\"text\" name=\"authors\" placeholder=\"Author(s)\">" +
            "</td><td><label>Price</label><input name=\"price\" " +
            "type=\"number\" step=\"0.01\" value=\"0.01\" min=\"0.01\" placeholder=\"\"></td></tr>\n";
    int n = 1;
%>
<c:out value="Trying to Add ${param.n} Book(s)"/>
<form action="/addbook" method="post">
    <table>
        <%
            if(request.getParameter("n")!=null) n = Integer.parseInt(request.getParameter("n"));
            for (int i = 0; i < n; i++) {
                out.print(line);
            }
        %>
    </table>
    <input type="submit" value="Add">
</form>

</body>
</html>
