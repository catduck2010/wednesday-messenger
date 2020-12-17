package com.wednesday.service;

import java.sql.*;
import java.util.Properties;

public class CSVHandler { // Part 4
    private static final String CSV_JDBC_DRIVER = "org.relique.jdbc.csv.CsvDriver";
    private static final String CSV_JDBC_HEADER = "jdbc:relique:csv:";
    public static final String DEFAULT_DIRECTORY = "/Users/lihangzhou/Documents";

    public static String parse(final String csvName) throws ClassNotFoundException, SQLException {
        return parse(DEFAULT_DIRECTORY, csvName);
    }

    /**
     * parse
     *
     * @param csvDirectory String CSV file directory
     * @param csvName      String CSV filename (no suffix)
     */
    public static String parse(final String csvDirectory, final String csvName) throws ClassNotFoundException, SQLException {
        Class.forName(CSV_JDBC_DRIVER);

        final Properties props = new Properties();
        props.put("separator", ",");
        props.put("suppressHeaders", "false");
        props.put("fileExtension", ".csv");
        props.put("charset", "UTF-8");

        final Connection conn = DriverManager.getConnection(CSV_JDBC_HEADER + csvDirectory, props);
        final Statement stmt = conn.createStatement();
        final ResultSet results =
                stmt.executeQuery("SELECT * FROM " + csvName);
        final ResultSetMetaData mtd = results.getMetaData();
        final int COL_NUM = mtd.getColumnCount();
        StringBuilder str = new StringBuilder();
        str.append("<thead><tr>");
        for (int i = 1; i <= COL_NUM; i++) {
            str.append("<td>").append(mtd.getColumnName(i)).append("</td>");
        }
        str.append("</tr></thead>");

        str.append("<tbody>");
        while (results.next()) {
            str.append("<tr>");
            for (int i = 1; i <= COL_NUM; i++) {
                str.append("<td>").append(results.getString(i)).append("</td>");
            }
            str.append("</tr>");
        }
        str.append("</tbody>");

        // close
        results.close();
        stmt.close();
        conn.close();

        return str.toString();
    }

}
