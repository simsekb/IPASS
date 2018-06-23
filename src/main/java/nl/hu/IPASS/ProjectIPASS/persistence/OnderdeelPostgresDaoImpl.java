package nl.hu.IPASS.ProjectIPASS.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import nl.hu.IPASS.ProjectIPASS.webservices.Onderdeel;

public class OnderdeelPostgresDaoImpl extends PostgresBaseDao implements OnderdeelDao {
	
	private List<Onderdeel> selectOnderdeel(String query) {
		List<Onderdeel> results = new ArrayList<Onderdeel>();

		try (Connection con = super.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);

			while (dbResultSet.next()) {
				String naam = dbResultSet.getString("naam");
				int onderdeel_nr = dbResultSet.getInt("onderdeel_nr");
				double prijs = dbResultSet.getDouble("prijs");
				String beschrijving = dbResultSet.getString("beschrijving");

				Onderdeel onderdeel = new Onderdeel(naam, onderdeel_nr, prijs, beschrijving);
				results.add(onderdeel);
			}
		} 
		catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		return results;
	}
	
	@Override
	public List<Onderdeel> findAll() {
		return selectOnderdeel("SELECT naam, onderdeel_nr, prijs, beschrijving FROM onderdeel");
	}
	
	@Override
	public Onderdeel find(String naam) {
		return selectOnderdeel("SELECT naam, onderdeel_nr, prijs, beschrijving FROM onderdeel WHERE naam = '"+ naam + "'").get(0);
	}
	
	@Override
	public boolean save(Onderdeel onderdeel) {
		boolean opgeslagen = false;

		String sql = "INSERT INTO onderdeel (naam, prijs, beschrijving) VALUES (?, ?, ?)";

		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(sql);
			pstmt.setString(1, onderdeel.getNaam());
			pstmt.setDouble(2, onderdeel.getPrijs());
			pstmt.setString(3, onderdeel.getBeschrijving());
			
			int result = pstmt.executeUpdate();

			if (result == 0) {
				return false;
			} 
			else {
				opgeslagen = true;
				System.out.println("Insert voltooid voor onderdeel : " + onderdeel.getNaam() + "\n");
			}

		} 
		catch (SQLException e) {
			e.printStackTrace();
		}
		return opgeslagen;
	}
	
	@Override
	public boolean update(Onderdeel onderdeel) throws SQLException {
		boolean resultaat = false;

		String query = "UPDATE onderdeel SET prijs = ?, beschrijving = ?" + " WHERE naam = '"+ onderdeel.getNaam() + "'";
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			
			System.out.println("query: " + query);

			//System.out.println("prijs: " + onderdeel.getPrijs() + " | " + onderdeel.getBeschrijving());
			pstmt.setDouble(1, onderdeel.getPrijs());
			pstmt.setString(2, onderdeel.getBeschrijving());

			int result = pstmt.executeUpdate();
			pstmt.close();

			if (result == 0)
				return false;
			else
				resultaat = true;
		}
		return resultaat;
	}

	@Override
	public boolean delete(Onderdeel onderdeel) {
		boolean result = false;

		String query = "DELETE FROM onderdeel WHERE naam = '" + onderdeel.getNaam() + "'";
		try (Connection con = super.getConnection()) {

			Statement stmt = con.createStatement();
			if (stmt.executeUpdate(query) == 1) { // 1 row updated!
				result = true;
			}
		} 
		catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		return result;
	}
}