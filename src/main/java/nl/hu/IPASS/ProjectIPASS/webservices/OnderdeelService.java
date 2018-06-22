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
	
	public Onderdeel updateOnderdeel(String naam, String nm, String cap, String reg, double sur, int pop) throws SQLException {
		Onderdeel o = onderdeelDao.find(naam);
		o.setNaam(nm);
		if(onderdeelDao.update(o)) {
			return onderdeelDao.find(naam);
		}
		return o;
	}
	
	public boolean deleteOnderdeel(String naam) {
		boolean verwijderd = false;
		Onderdeel o = onderdeelDao.find(naam);
		
		if (o != null) {
			verwijderd = onderdeelDao.delete(o);
		} 
		else {
			throw new IllegalArgumentException("Code bestaat niet!");
		}
		return verwijderd;	
	}
	
	public Onderdeel saveOnderdeel(String naam, int onderdeel_nr, double prijs, String beschrijving) {
		Onderdeel c = new Onderdeel (naam, onderdeel_nr, prijs, beschrijving);
		c.setNaam(naam);
		c.setOnderdeel_nr(onderdeel_nr);
		c.setPrijs(prijs);
		c.setBeschrijving(beschrijving);
		onderdeelDao.save(c);
		return c;
	}
}