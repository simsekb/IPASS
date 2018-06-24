package nl.hu.IPASS.ProjectIPASS.webservices;

import java.sql.SQLException;
import java.util.List;

import nl.hu.IPASS.ProjectIPASS.persistence.OnderdeelDao;
import nl.hu.IPASS.ProjectIPASS.persistence.OnderdeelPostgresDaoImpl;

public class OnderdeelService {
	OnderdeelDao onderdeelDao = new OnderdeelPostgresDaoImpl();
	
	/*
	 * Alle onderdelen vinden
	 */
	
	public List<Onderdeel> getAllOnderdelen() {
		return onderdeelDao.findAll();
	}
	
	/*
	 * Het vinden van een onderdeel
	 */
	
	public Onderdeel find(String naam) {
		Onderdeel result = null;
		
		for (Onderdeel o : onderdeelDao.findAll()) {
			if (o.getNaam().equals(naam)) {
				result = o;
				break;
			}
		}
		return result;
	}
	
	/*
	 * Updaten van een onderdeel
	 */
	
	public Onderdeel updateOnderdeel(String naam, double prijs, String beschrijving) throws SQLException {
		Onderdeel o = onderdeelDao.find(naam);
		o.setNaam(naam);
		o.setPrijs(prijs);
		o.setBeschrijving(beschrijving);
		if(onderdeelDao.update(o)) {
			return onderdeelDao.find(naam);
		}
		return o;
	}
	
	/*
	 * Verwijderen onderdelen
	 */
	
	public void deleteOnderdeel(String naam) {
		Onderdeel o = onderdeelDao.find(naam);
		
		if (o != null) {
			onderdeelDao.delete(o);
		} 
	}
	
	/*
	 * Opslaan van onderdelen
	 */
	
	public Onderdeel saveOnderdeel(String naam, double prijs, String beschrijving) {
		Onderdeel c = new Onderdeel (naam, 0, prijs, beschrijving); // onderdeel_id cus it's a serial in de db, we won't be using it here
		c.setNaam(naam);
		c.setPrijs(prijs);
		c.setBeschrijving(beschrijving);
		onderdeelDao.save(c);
		return c;
	}
}