package exercise_15;

public class MemberService {
	boolean login(String id, String password) {
		return id == "hong" && password == "12345" ? true : false;
	}

	void logout(String id) {
		System.out.println("�α׾ƿ� �Ǿ����ϴ�.");
	}

}
