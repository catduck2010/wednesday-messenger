<%@ page import="java.util.Arrays" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Part 8 Form Details</title>
</head>
<body>
<%
    out.println("Reason to fill form: " + request.getParameter("reason") + "<br>");
    out.println("Effective Date: " + request.getParameter("eff-date"));
    out.println("<br><br><b>Employee Info</b><br>Name:" + request.getParameter("full-name"));
    out.println("<br>Social Security #:" + request.getParameter("ssn"));
    out.println("<br>Marital Status:" + request.getParameter("marital"));
    out.println("<br>Date of Birth:" + request.getParameter("date-of-birth"));
    out.println("<br>Date of Hire:" + request.getParameter("date-of-hire"));

    out.println("<br><br><b>Health Insurance</b>");
    out.println("<br>Medical: " + request.getParameter("hi-medical"));
    out.println("<br>Dental: " + request.getParameter("hi-dental"));
    out.println("<br>Vision Plan: " + request.getParameter("hi-vp"));

    //table 1
    out.println("<br><b>HEALTH INSURANCE DEPENDENT AND PRIMARY CARE PHYSICIAN INFORMATION</b>");
    out.println("<br><table border=\"1\"><thead><tr><td>Medical</td>" +
            "<td>Dental</td><td>Vision</td><td>Name(Last, First, MI)</td>" +
            "<td>Social Security #</td><td>D.O.B.</td>" +
            "<td>Gender</td><td>Student?</td><td>Relationship</td>" +
            "<td>PCP#</td></tr></thead><tbody>");
    //firstTableTBody(out, valMap);
    String[] hidMedical = request.getParameterValues("hid-medical"),
            hidDental = request.getParameterValues("hid-dental"),
            hidVision = request.getParameterValues("hid-vision"),
            hidName = request.getParameterValues("hid-name"),
            hidSSN = request.getParameterValues("hid-ssn"),
            hidDOB = request.getParameterValues("hid-dob"),
            hidGender = request.getParameterValues("hid-gender"),
            hidStudent = request.getParameterValues("hid-student"),
            hidRel = request.getParameterValues("hid-relationship"),
            hidPCP = request.getParameterValues("hid-pcp");

    for (int i = 0; i < hidName.length; i++) {
        out.println("<tr>");
        out.println("<td>" + hidMedical[i] +
                "</td><td>" + hidDental[i] +
                "</td><td>" + hidVision[i] +
                "</td><td>" + hidName[i] +
                "</td><td>" + hidSSN[i] +
                "</td><td>" + hidDOB[i] +
                "</td><td>" + hidGender[i] +
                "</td><td>" + hidStudent[i] +
                "</td><td>" + hidRel[i] +
                "</td><td>" + hidPCP[i] + "</td>");
        out.println("</tr>");
    }
    out.println("</tbody></table>");

    out.println("<br><b>Reimbursement Accounts</b>");
    out.println("<br>for Health care: Waive " + request.getParameter("healthcare") +
            " Amount: $" + request.getParameter("healthcare-num"));
    out.println("<br>for Dependent care: Waive " + request.getParameter("dependentcare") +
            " Amount: $" + request.getParameter("dependentcare-num"));

    out.println("<br><b>Health Savings Account(HSA)</b>");
    out.println("<br>Enable" + request.getParameter("hsa") + " Amount: $" + request.getParameter("hsa-num"));
    out.println("<br><b>Life insurance</b>");
    out.println("<br>Supplemental Life Insurance: " + request.getParameter("li-sli"));
    out.println("<br>Spouse/Domestic Partner: " + request.getParameter("li-sdp") + ", Date of Birth:" + request.getParameter("sdp-dob"));
    out.println("<br>Dependent Child(ren): " + request.getParameter("li-dc"));
    out.println("<br><b>Voluntary Benefit</b><br>Legal Plan:" + request.getParameter("legal-plan"));
    //table 2
    out.println("<br><b>BENEFICIARY INFORMATION</b>");
    out.println("<br><table border=\"1\"><thead><tr><td><b>Name</b>(Last, First, Middle Initial)</td>" +
            "<td><b>Relationship</b></td><td><b>Primary/Contingent</b></td>\n" +
            "<td><b>Benefit percent(%)</b></td></tr></thead><tbody>");
    //secondTableTBody(out, valMap);
    String[] biName = request.getParameterValues("bi-name"), biRel = request.getParameterValues("bi-relation"),
            biPorC = request.getParameterValues("bi-pc"), biPercent = request.getParameterValues("bi-percent");
    for (int i = 0; i < biName.length; i++) {
        out.println("<tr>");
        out.println("<td>" + biName[i] +
                "</td><td>" + biRel[i] +
                "</td><td>" + biPorC[i] +
                "</td><td>" + biPercent[i] + "</td>");
        out.println("</tr>");
    }
    out.println("</tbody></table>");
    out.println("<br>Signed by: " + request.getParameter("emp-sig") +
            "<br>Signed Date:" + request.getParameter("sign-date"));
%>
</body>
</html>
