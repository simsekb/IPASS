package nl.hu.IPASS.ProjectIPASS.persistence;

import java.sql.SQLException;
import java.util.List;

import nl.hu.IPASS.ProjectIPASS.webservices.Onderdeel;

public interface OnderdeelDao {
	public boolean save (Onderdeel onderdeel);
	public List<Onderdeel> findAll();
	public Onderdeel find(String naam);
	public boolean update(Onderdeel onderdeel) throws SQLException;
	public boolean delete(Onderdeel onderdeel);
}