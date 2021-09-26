package exercise_18;

public class ShopService {

	private static ShopService ss;

	private ShopService() {

	}

	public static ShopService getInstance() {
		if (ss == null) {
			ss = new ShopService();
		}
		return ss;
	}

	/*
	 * ���� private static ShopService singleton = new ShopService();
	 * 
	 * private ShopService() { }
	 * 
	 * static ShopService getInstance() { return singleton; }
	 */
}
