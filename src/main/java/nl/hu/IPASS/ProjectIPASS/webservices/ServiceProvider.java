package nl.hu.IPASS.ProjectIPASS.webservices;

public class ServiceProvider {
	private static OnderdeelService onderdeelService = new OnderdeelService();

	public static OnderdeelService getOnderdeelService() {
		return onderdeelService;
	}
}
