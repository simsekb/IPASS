package nl.hu.IPASS.ProjectIPASS.webservices;

public class ServiceProvider {
	private static WorldService worldService = new WorldService();

	public static WorldService getWorldService() {
		return worldService;
	}
}
