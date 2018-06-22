package nl.hu.IPASS.ProjectIPASS.webservices;

public class Onderdeel {
	private String naam;
	private int onderdeel_nr;
	private double prijs;
	private String beschrijving;
	
	public Onderdeel(String naam, int onderdeel_nr, double prijs, String beschrijving) {
		this.naam = naam; 
		this.onderdeel_nr = onderdeel_nr;
		this.prijs = prijs;
		this.beschrijving = beschrijving;
	}
	
	public String getNaam() {
		return naam;
	}
	
	public void setNaam(String naam) {
		this.naam = naam;
	}
	
	public int getOnderdeel_nr() {
		return onderdeel_nr;
	}
	
	public void setOnderdeel_nr(int nr) {
		this.onderdeel_nr = nr;
	}
	
	public double getPrijs() {
		return prijs;
	}
	
	public void setPrijs(double prijs) {
		this.prijs = prijs;
	}
	
	public String getBeschrijving() {
		return beschrijving;
	}
	
	public void setBeschrijving(String text) {
		this.beschrijving = text;
	}
}