package com.safespace;

import com.amazonaws.services.lambda.runtime.Context;

import java.sql.*;
import java.util.IllegalFormatCodePointException;

/**
 * @author mthwate
 */
public class SafeSpace {

	public SafeSpace() {
		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public int getRating(RequestUserRanking request, Context context) {
		Connection con = getDb();
		try {
			PreparedStatement statement = con.prepareStatement("select rating from ratings where useraccount = ?");
			statement.setString(1, request.user);
			statement.execute();
			ResultSet resultSet = statement.getResultSet();
			if (resultSet.next()) {
				return resultSet.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(con);
		}

		return 0;
	}

	public boolean register(RequestRegister request, Context context) {
		Connection con = getDb();
		try {
			PreparedStatement statement = con.prepareStatement("insert into users values (?,?)");
			statement.setString(1, request.user);
			statement.setString(2, request.pass);
			return statement.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(con);
		}
		return false;
	}

	public boolean report(RequestReport request, Context context) {
		Connection con = getDb();
		try {
			PreparedStatement statement = con.prepareStatement("select password from users where username = ?");
			statement.setString(1, request.source);
			statement.execute();
			ResultSet resultSet = statement.getResultSet();
			if (resultSet.next() && request.pass.equals(resultSet.getString(1))) {
				PreparedStatement statement2 = con.prepareStatement("insert into ratings values (?,?)");
				statement2.setString(1, request.target);
				statement2.setInt(2, request.rating);
				statement2.setString(3, request.comment);
				return statement2.execute();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(con);
		}
		return false;
	}

	private static void close(Connection connection) {
		if (connection != null) {
			try {
				connection.close();
			} catch (SQLException e) {}
		}
	}

	private static Connection getDb() {
		Connection connection = null;
		try {
			connection = DriverManager.getConnection("jdbc:postgresql://safespace.cphux8mhfagi.us-east-1.rds.amazonaws.com:4321/safespace", "master", "ThisIsMySafeSpace!");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return connection;
	}

}
