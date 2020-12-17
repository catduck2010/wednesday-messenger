<%--
  Created by IntelliJ IDEA.
  User: lihangzhou
  Date: 11/1/20
  Time: 22:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Part 3 Form</title>
</head>
<body>
<form action="${pageContext.request.contextPath}/pdf" method="post">
    <b>CHECK REASON THAT YOU ARE COMPLETING THIS ENROLLMENT FORM</b><br>
    <input type="checkbox" name="reason" value="New hire"/><label>New hire</label>
    <input type="checkbox" name="reason" value="Qualifying event for family status change"/>
    <label>Qualifying event for family status change</label>

    <br>Effective Date: <input type="date" name="eff-date" value="2020-01-01"/><br>
    <b>EMPLOYEE INFORMATION</b><br>
    <input placeholder="Name(Last, First, MI)" type="text" name="full-name"/>

    <input placeholder="Social Security #" type="number" name="ssn">
    <input placeholder="Marital status" type="text"
           name="marital"><br>
    Date of Birth<input type="date" name="date-of-birth" value="2020-01-01">
    Date of Hire<input type="date" name="date-of-hire" value="2020-01-01">


    <br><b>HEALTH INSURANCE</b><br>
    <br>Medical
    <input type="radio" name="hi-medical" value="Individual"><label>Individual</label>
    <input type="radio" name="hi-medical" value="Family"><label>Family</label>
    <input type="radio" name="hi-medical" value="Terminate"><label>Terminate</label>
    <input type="radio" name="hi-medical" value="HDHP W/HSA"><label>HDHP W/HSA</label>
    <input type="radio" name="hi-medical" value="Core"><label>Core</label>
    <input type="radio" name="hi-medical" value="Enhanced"><label>Enhanced</label>
    <input type="radio" name="hi-medical" value="PPO"><label>PPO</label>
    <input type="radio" name="hi-medical" value="waive"><label>Waive participation</label>
    <br>Dental
    <input type="radio" name="hi-dental" value="Individual"><label>Individual</label>
    <input type="radio" name="hi-dental" value="family"><label>Family</label>
    <input type="radio" name="hi-dental" value="terminate"><label>Terminate</label>
    <input type="radio" name="hi-dental" value="value"><label>Value</label>
    <input type="radio" name="hi-dental" value="value plus"><label>Value Plus</label>
    <input type="radio" name="hi-dental" value="waive"><label>Waive participation</label>
    <br>Vision Plan
    <input type="radio" name="hi-vp" value="individual"><label>Individual</label>
    <input type="radio" name="hi-vp" value="family"><label>Family</label>
    <input type="radio" name="hi-vp" value="terminate"><label>Terminate</label>
    <input type="radio" name="hi-vp" value="waive"><label>Waive</label>


    <br><b>HEALTH INSURANCE DEPENDENT AND PRIMARY CARE PHYSICIAN INFORMATION</b>
    <table border="1">
        <thead>
        <tr>
            <td>Medical</td>
            <td>Dental</td>
            <td>Vision</td>
            <td>Name(Last, First, MI)</td>
            <td>Social Security #</td>
            <td>D.O.B.</td>
            <td>Gender</td>
            <td>Student?</td>
            <td>Relationship</td>
            <td>PCP#</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><select name="hid-medical">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-dental">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-vision">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-name"></td>
            <td><input type="text" name="hid-ssn"></td>
            <td><input type="date" value="2020-01-01" name="hid-dob"></td>
            <td><select name="hid-gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select></td>
            <td><select name="hid-student">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-relationship"></td>
            <td><input type="text" name="hid-pcp"></td>
        </tr><tr>
            <td><select name="hid-medical">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-dental">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-vision">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-name"></td>
            <td><input type="text" name="hid-ssn"></td>
            <td><input type="date" value="2020-01-01" name="hid-dob"></td>
            <td><select name="hid-gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select></td>
            <td><select name="hid-student">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-relationship"></td>
            <td><input type="text" name="hid-pcp"></td>
        </tr><tr>
            <td><select name="hid-medical">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-dental">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-vision">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-name"></td>
            <td><input type="text" name="hid-ssn"></td>
            <td><input type="date" value="2020-01-01" name="hid-dob"></td>
            <td><select name="hid-gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select></td>
            <td><select name="hid-student">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-relationship"></td>
            <td><input type="text" name="hid-pcp"></td>
        </tr><tr>
            <td><select name="hid-medical">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-dental">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-vision">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-name"></td>
            <td><input type="text" name="hid-ssn"></td>
            <td><input type="date" value="2020-01-01" name="hid-dob"></td>
            <td><select name="hid-gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select></td>
            <td><select name="hid-student">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-relationship"></td>
            <td><input type="text" name="hid-pcp"></td>
        </tr><tr>
            <td><select name="hid-medical">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-dental">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><select name="hid-vision">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-name"></td>
            <td><input type="text" name="hid-ssn"></td>
            <td><input type="date" value="2020-01-01" name="hid-dob"></td>
            <td><select name="hid-gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select></td>
            <td><select name="hid-student">
                <option value="no">-</option>
                <option value="yes">✓</option>
            </select></td>
            <td><input type="text" name="hid-relationship"></td>
            <td><input type="text" name="hid-pcp"></td>
        </tr>
        </tbody>
    </table>
    <br><b>REIMBURSEMENT ACCOUNTS</b>
    <br>Health Care Reimbursement Account
    <input type="radio" name="healthcare" value="yes"><label>Waive participation</label>
    <input type="radio" name="healthcare" value="no"><label>Amount:<input type="number" value="0" name="healthcare-num"></label>
    <br>Dependent Care Reimbursement Account
    <input type="radio" name="dependentcare" value="yes"><label>Waive participation</label>
    <input type="radio" name="dependentcare" value="no"><label>Amount:<input type="number" value="0" name="dependentcare-num"></label>
    <br><b>HEALTH SAVINGS ACCOUNT (HSA)</b><br>
    Health Savings Account <input type="checkbox" name="hsa"><label>Amount:<input name="hsa-num" type="number" value="0"></label>
    <br><b>LIFE INSURANCE</b>
    <br>Supplemental Life Insurance
    <input type="radio" name="li-sli" value="1x base salary"><label>1x base salary</label>
    <input type="radio" name="li-sli" value="2x base salary"><label>2x base salary</label>
    <input type="radio" name="li-sli" value="3x base salary"><label>3x base salary</label>
    <input type="radio" name="li-sli" value="4x base salary"><label>4x base salary</label>
    <input type="radio" name="li-sli" value="waive"><label>Waive</label>
    <br>Spouse/Domestic Partner
    Date of Birth: <input type="date" name="sdp-dob" value="2020-01-01">
    <input type="radio" name="li-sdp" value="$25,000"><label>$25,000</label>
    <input type="radio" name="li-sdp" value="$50,000"><label>$50,000</label>
    <input type="radio" name="li-sdp" value="$75,000"><label>$75,000</label>
    <input type="radio" name="li-sdp" value="$100,000"><label>$100,000</label>
    <input type="radio" name="li-sdp" value="waive"><label>Waive</label>
    <br>Dependent Child(ren)
    <input type="radio" name="li-dc" value="$10,000"><label>$10,000</label>
    <input type="radio" name="li-dc" value="$20,000"><label>$20,000</label>
    <input type="radio" name="li-dc" value="waive"><label>Waive</label>

    <br><b>VOLUNTARY BENEFIT</b><br>
    Legal Plan
    <input type="radio" name="legal-plan" value="individual/family"><label>Individual/family</label>
    <input type="radio" name="legal-plan" value="waive"><label>Waive participation</label>
    <br><b>BENEFICIARY INFORMATION</b>
    <table border="1">
        <thead>
        <tr>
            <td><b>Name</b>(Last, First, Middle Initial)</td>
            <td><b>Relationship</b></td>
            <td><b>Primary/Contingent</b></td>
            <td><b>Benefit percent(%)</b></td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><input type="text" name="bi-name"></td>
            <td><input type="text" name="bi-relation"></td>
            <td><select name="bi-pc">
                <option value="primary">Primary</option>
                <option value="contingent">Contingent</option>
            </select></td>
            <td><input type="number" name="bi-percent"></td>
        </tr><tr>
            <td><input type="text" name="bi-name"></td>
            <td><input type="text" name="bi-relation"></td>
            <td><select name="bi-pc">
                <option value="primary">Primary</option>
                <option value="contingent">Contingent</option>
            </select></td>
            <td><input type="number" name="bi-percent"></td>
        </tr><tr>
            <td><input type="text" name="bi-name"></td>
            <td><input type="text" name="bi-relation"></td>
            <td><select name="bi-pc">
                <option value="primary">Primary</option>
                <option value="contingent">Contingent</option>
            </select></td>
            <td><input type="number" name="bi-percent"></td>
        </tr><tr>
            <td><input type="text" name="bi-name"></td>
            <td><input type="text" name="bi-relation"></td>
            <td><select name="bi-pc">
                <option value="primary">Primary</option>
                <option value="contingent">Contingent</option>
            </select></td>
            <td><input type="number" name="bi-percent"></td>
        </tr>
        </tbody>
    </table>

    Employee signature<input type="text" name="emp-sig">
    Date<input type="date" name="sign-date" value="2020-01-01"><br>
    <!--    Reviewed by-->
    <!--    Entered-->
    <input type="submit" value="Submit"/>
</form>
</body>
</html>
