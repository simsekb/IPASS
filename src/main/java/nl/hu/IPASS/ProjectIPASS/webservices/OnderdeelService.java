package nl.hu.IPASS.ProjectIPASS.webservices;

import java.sql.SQLException;
import java.util.List;

import nl.hu.IPASS.ProjectIPASS.persistence.OnderdeelDao;
import nl.hu.IPASS.ProjectIPASS.persistence.OnderdeelPostgresDaoImpl;

public class OnderdeelService {
	OnderdeelDao onderdeelDao = new OnderdeelPostgresDaoImpl();
	
	public List<Onderdeel> getAllOnderdelen() {
		return onderdeelDao.findAll();
	}
	
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
	
	public void deleteOnderdeel(String naam) {
		Onderdeel o = onderdeelDao.find(naam);
		
		if (o != null) {
			onderdeelDao.delete(o);
		} 
	}
	
	public Onderdeel saveOnderdeel(String naam, double prijs, String beschrijving) {
		Onderdeel c = new Onderdeel (naam, 0, prijs, beschrijving); // onderdeel_id cus it's a serial in de db, we won't be using it here
		c.setNaam(naam);
		c.setPrijs(prijs);
		c.setBeschrijving(beschrijving);
		onderdeelDao.save(c);
		return c;
	}
}