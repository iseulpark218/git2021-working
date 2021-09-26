package exercise_20;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	private static Map<String, Account> accounts = new HashMap<String, Account>();
	private static Scanner scanner = new Scanner(System.in);
	private static int deposit;
	private static int withdraw;

	public static void main(String[] args) {

		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.���»��� | 2.���¸�� | 3.���� | 4.��� | 5.���»��� |6.����");
			System.out.println("----------------------------------------------------------");
			System.out.println("���� ���¼�:" + accounts.size());
			System.out.print("����> ");

			int selectNo = scanner.nextInt();
			scanner.nextLine();

			if (selectNo == 1) {
				createAccount();
			} else if (selectNo == 2) {
				accountList();
			} else if (selectNo == 3) {
				deposit();
			} else if (selectNo == 4) {
				withdraw();
			} else if (selectNo == 5) {
				remove();
			} else if (selectNo == 6) {
				run = false;
			}
		}
		System.out.println("���α׷� ����");

	}

	// ���»����ϱ�(�����߰��ϱ�)
	private static void createAccount() {

		System.out.println("------\n���»���\n------");
		System.out.print("���¹�ȣ:");
		String ano = scanner.nextLine();
		if (accounts.containsKey(ano)) {
			System.out.println("�̹� �����ϴ� �����Դϴ�.");
			return;
		}
		System.out.print("������:");
		String owner = scanner.nextLine();
		System.out.print("�ʱ��Աݾ�:");
		int balance = scanner.nextInt();

		Account account = new Account(ano, owner, balance, (balance + deposit), (balance - withdraw));
		accounts.put(ano, account);

		System.out.println("���:���°� �����Ǿ����ϴ�.");
	}

	// ���¸�Ϻ���
	private static void accountList() {
		System.out.println("------\n���¸��\n------");

		for (String ano : accounts.keySet()) {
			String owner = accounts.get(ano).getOwner();
			int balance = accounts.get(ano).getBalance();
			int deposit = accounts.get(ano).getDeposit();
			int withdraw = accounts.get(ano).getWithdraw();
			System.out.println(ano + " | " + owner + " | " + balance);
		}
	}

	// �����ϱ�(�ʵ尪����)
	private static void deposit() {
		System.out.println("------\n����\n------");
		System.out.print("���¹�ȣ:");
		String ano = scanner.next();
		if (!accounts.containsKey(ano)) {
			System.out.println("�������� �ʴ� �����Դϴ�.");
			return;
		}
		System.out.print("���ݾ�:");
		int deposit = scanner.nextInt();
		int balance = accounts.get(ano).getBalance();
		System.out.println("���: ������ �����Ǿ����ϴ�.");
		System.out.println("���" + deposit + "�� -�ܰ�:" + (balance + deposit));

		Account newAno = accounts.get(ano);
		newAno.setBalance(balance + deposit - withdraw);

	}

	// ����ϱ�(�ʵ尪����)
	private static void withdraw() {
		System.out.println("------\n���\n------");
		System.out.print("���¹�ȣ:");
		String ano = scanner.next();
		if (!accounts.containsKey(ano)) {
			System.out.println("�������� �ʴ� �����Դϴ�.");
			return;
		}
		System.out.print("��ݾ�:");
		int withdraw = scanner.nextInt();
		int balance = accounts.get(ano).getBalance();
		System.out.println("���: ����� �����Ǿ����ϴ�.");
		System.out.println("���" + withdraw + "�� -�ܰ�:" + (balance - withdraw));

		Account newAno = accounts.get(ano);
		newAno.setBalance(balance + deposit - withdraw);
	}

	private static void remove() {
		System.out.println("------\n���»���\n------");
		System.out.print("������ ���¹�ȣ:");
		String ano = scanner.nextLine();
		if (accounts.containsKey(ano)) {
			accounts.remove(ano);
			System.out.println("�ش� ���¸� �����Ͽ����ϴ�.");
		} else {
			System.out.println("���°� �������� �ʽ��ϴ�.");
		}
	}
}
