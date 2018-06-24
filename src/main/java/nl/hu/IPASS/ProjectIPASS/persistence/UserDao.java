package nl.hu.IPASS.ProjectIPASS.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserDao extends PostgresBaseDao {
	
	/*
	 * Het ophalen van een rol van een gebruiker
	 */
	
	public String findRoleForUser(String username, String password) {
		String query = ("select role from users where gebruikersnaam= '" + username + "'and wachtwoord = '" + password+ "'");
		String rol = null;
		try (Connection con = super.getConnection()) {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			while (rs.next()) {
				String role = rs.getString("ROLE");
				rol = role;
			}
		} 
		catch (SQLException e) {
			e.printStackTrace();
		}
		//System.out.println("role: " + rol);
		return rol;
	}
}
