package hashMap_example;

public class BankApplication {
	private static Account20[] accountArray = new Account20[100];
	// �ϳ��� ���� ������ ������ �ִ� ��ü Account20�� ������ ����� ���ؼ� �迭 �ʵ�� ����
	// Account20[] ������ Ÿ���� Account20�̶�� Ŭ������ �迭�� ���� ��
	// new Account20[100] 100���� ���� �迭�� ����
	private static Scanner scanner = new Scanner(System.in);
	static int arrCount = 0;

	// ���� ������ �迭�� ī��Ʈ�� �������ִ� ����
	public static void main(String[] args) {

		boolean run = true;

		while (run) {
			System.out.println("--------------------------------------------------");
			System.out.println("1.���»��� | 2.���¸�� | 3.���� | 4.��� | 5.����");
			System.out.println("--------------------------------------------------");
			System.out.print("����> ");

			int selectNo = scanner.nextInt();

			if (selectNo == 1) {
				createAccount();
			} else if (selectNo == 2) {
				accountList();
			} else if (selectNo == 3) {
				deposit();
			} else if (selectNo == 4) {
				withdraw();
			} else if (selectNo == 5) {
				run = false;
			}
		}
		System.out.println("���α׷� ����");
	}

	// ���� �����ϱ�
	private static void createAccount() {
		System.out.println("----------");
		System.out.println("���� ����");
		System.out.println("----------");

		// scanner �Է�â�� ���� nextLine���� ���� �ϰ�
		// String���� ���� �ݾ� balance�� �ٽ� Integer.parseInt��
		// ����ؼ� int������ ��ȯ
		System.out.print("���¹�ȣ: ");
		String ano = scanner.nextLine();
		System.out.print("������: ");
		String owner = scanner.nextLine();
		System.out.print("�ʱ��Աݾ�: ");
		String strBalance = scanner.nextLine();
		int balance = Integer.parseInt(strBalance);

		// scanner�� �Է¹��� ����� ������ �Ʒ��� ��ü�� ����
		Account20 account = new Account20(ano, owner, balance);

		// ������ ������ account �迭�� ��ü �ϳ��� �����Ѵ�.
		accountArray[arrCount] = account;
		// �迭 ���� �� �迭�� ���� ���� ī��Ʈ�� �ѱ��.
		arrCount++;
		// �迭�� �� ī��Ʈ�� 1�� �����Ǿ��� ������ ���¸� �ٽ� ������ ���
		// ���� ������ �迭�� �ٷ� ���� �࿡ ����ȴ�.
		System.out.println("���: ���°� �����Ǿ����ϴ�.");

	}

	// ���� ��Ϻ���
	private static void accountList() {
		System.out.println("----------");
		System.out.println("���� ���");
		System.out.println("----------");

		for (int i = 0; i < accountArray.length; i++) {
			// ������ ������ �迭�� ���̸�ŭ �� �Ŀ�
			Account20 account = accountArray[i];
			// �迭�� ����� ��ü�� ���� account20 Ŭ������ �����Ѵ�.
			if (account != null) {
				// account��ü�� ���� ������
				System.out.print(account.getAno() + "\t");
				// account�� �ʵ尪�� �޾ƿͼ� ȭ�鿡 ��Ÿ����.
				System.out.print(account.getOwner() + "\t");
				System.out.print(account.getBalnace() + "\t");
				System.out.println();
			} else {
				break;
				// account ��ü�� ���� ��������� �ݺ����� ������Ų��.
			}
		}
	}

	// �����ϱ�
	private static void deposit() {
		System.out.println("----------");
		System.out.println("����");
		System.out.println("----------");

		System.out.print("���¹�ȣ: ");
		String ano = scanner.nextLine();

		System.out.print("���ݾ�: ");
		String strBalance = scanner.nextLine();
		int balance = Integer.parseInt(strBalance);

		Account20 account = findAccount(ano);

		if (account != null) { // findAccount�� �����ؼ� account�� ����� ���� ã������
			account.setBalnace(account.getBalnace() + balance); // account��ü���� balance�� get���� �ҷ���
																// ���� �Է��� ���� ���ؼ� set���� �ٽ� �����Ѵ�.
			System.out.println("���: ������ �����Ǿ����ϴ�.");
		} else {
			System.out.println("���: ���ݿ� �����Ͽ����ϴ�.");
			return; // findAccount���� �˻��� �������� �״�� �������´�.
		}

	}

	// ����ϱ�
	private static void withdraw() {
		System.out.println("----------");
		System.out.println("���");
		System.out.println("----------");

		System.out.print("���¹�ȣ: ");
		String ano = scanner.nextLine();

		System.out.print("��ݾ�: ");
		String strBalance = scanner.nextLine();
		int balance = Integer.parseInt(strBalance);

		Account20 account = findAccount(ano);

		if (account != null) {
			account.setBalnace(account.getBalnace() - balance); // ���ݰ� ���� �ڵ带 ����ϰ� ����� �ϱ� ������
																// �ܼ��ϰ� �ݾ׸� ���׿�����(-)�� ���ش�.
			System.out.println("���: ��ݿ� �����Ǿ����ϴ�.");
		} else {
			System.out.println("���: ��ݿ� �����Ͽ����ϴ�.");
			return;
		}

	}

	// Account20 �迭���� ano�� ������ Account20 ��ü ã��
	private static Account20 findAccount(String ano) {
		Account20 account = null;
		for (int i = 0; i < accountArray.length; i++) { // �迭�� ����� ��ü���� �ҷ��� ��
			if (accountArray[i] != null) { // ���� ����Ǿ� ������
				String searchAno = accountArray[i].getAno(); // �迭�� ��ü�� ����� Ano�� ����
																// searchAno ��ü�� �����Ѵ�.
				if (searchAno.equals(ano)) { // searchAno�� ���� ���� �Է��� ano�� ���� ������
					account = accountArray[i]; // �迭�� ����� ��ü�� �ٽ� account ��ü�� �����Ѵ�
					break; // �� �� �ݺ����� ���� ��Ű��
				}
			}
		}
		return account; // ��ü���� ������ �ִ´�.
	}

}