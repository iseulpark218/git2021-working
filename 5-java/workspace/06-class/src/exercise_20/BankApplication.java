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
			System.out.println("1.계좌생성 | 2.계좌목록 | 3.예금 | 4.출금 | 5.계좌삭제 |6.종료");
			System.out.println("----------------------------------------------------------");
			System.out.println("현재 계좌수:" + accounts.size());
			System.out.print("선택> ");

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
		System.out.println("프로그램 종료");

	}

	// 계좌생성하기(계좌추가하기)
	private static void createAccount() {

		System.out.println("------\n계좌생성\n------");
		System.out.print("계좌번호:");
		String ano = scanner.nextLine();
		if (accounts.containsKey(ano)) {
			System.out.println("이미 존재하는 계좌입니다.");
			return;
		}
		System.out.print("계좌주:");
		String owner = scanner.nextLine();
		System.out.print("초기입금액:");
		int balance = scanner.nextInt();

		Account account = new Account(ano, owner, balance, (balance + deposit), (balance - withdraw));
		accounts.put(ano, account);

		System.out.println("결과:계좌가 생성되었습니다.");
	}

	// 계좌목록보기
	private static void accountList() {
		System.out.println("------\n계좌목록\n------");

		for (String ano : accounts.keySet()) {
			String owner = accounts.get(ano).getOwner();
			int balance = accounts.get(ano).getBalance();
			int deposit = accounts.get(ano).getDeposit();
			int withdraw = accounts.get(ano).getWithdraw();
			System.out.println(ano + " | " + owner + " | " + balance);
		}
	}

	// 예금하기(필드값수정)
	private static void deposit() {
		System.out.println("------\n예금\n------");
		System.out.print("계좌번호:");
		String ano = scanner.next();
		if (!accounts.containsKey(ano)) {
			System.out.println("존재하지 않는 계좌입니다.");
			return;
		}
		System.out.print("예금액:");
		int deposit = scanner.nextInt();
		int balance = accounts.get(ano).getBalance();
		System.out.println("결과: 예금이 성공되었습니다.");
		System.out.println("출금" + deposit + "원 -잔고:" + (balance + deposit));

		Account newAno = accounts.get(ano);
		newAno.setBalance(balance + deposit - withdraw);

	}

	// 출금하기(필드값수정)
	private static void withdraw() {
		System.out.println("------\n출금\n------");
		System.out.print("계좌번호:");
		String ano = scanner.next();
		if (!accounts.containsKey(ano)) {
			System.out.println("존재하지 않는 계좌입니다.");
			return;
		}
		System.out.print("출금액:");
		int withdraw = scanner.nextInt();
		int balance = accounts.get(ano).getBalance();
		System.out.println("결과: 출금이 성공되었습니다.");
		System.out.println("출금" + withdraw + "원 -잔고:" + (balance - withdraw));

		Account newAno = accounts.get(ano);
		newAno.setBalance(balance + deposit - withdraw);
	}

	private static void remove() {
		System.out.println("------\n계좌삭제\n------");
		System.out.print("삭제할 계좌번호:");
		String ano = scanner.nextLine();
		if (accounts.containsKey(ano)) {
			accounts.remove(ano);
			System.out.println("해당 계좌를 삭제하였습니다.");
		} else {
			System.out.println("계좌가 존재하지 않습니다.");
		}
	}
}
