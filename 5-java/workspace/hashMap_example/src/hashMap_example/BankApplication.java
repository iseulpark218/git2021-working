package hashMap_example;

public class BankApplication {
	private static Account20[] accountArray = new Account20[100];
	// 하나의 계좌 정보를 가지고 있는 객체 Account20을 여러개 만들기 위해서 배열 필드로 저장
	// Account20[] 변수의 타입을 Account20이라는 클래스의 배열로 지정 후
	// new Account20[100] 100개의 고정 배열로 생성
	private static Scanner scanner = new Scanner(System.in);
	static int arrCount = 0;

	// 계좌 생성시 배열의 카운트를 생성해주는 변수
	public static void main(String[] args) {

		boolean run = true;

		while (run) {
			System.out.println("--------------------------------------------------");
			System.out.println("1.계좌생성 | 2.계좌목록 | 3.예금 | 4.출금 | 5.종료");
			System.out.println("--------------------------------------------------");
			System.out.print("선택> ");

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
		System.out.println("프로그램 종료");
	}

	// 계좌 생성하기
	private static void createAccount() {
		System.out.println("----------");
		System.out.println("계좌 생성");
		System.out.println("----------");

		// scanner 입력창을 전부 nextLine으로 통일 하고
		// String으로 받은 금액 balance를 다시 Integer.parseInt를
		// 사용해서 int형으로 변환
		System.out.print("계좌번호: ");
		String ano = scanner.nextLine();
		System.out.print("계좌주: ");
		String owner = scanner.nextLine();
		System.out.print("초기입금액: ");
		String strBalance = scanner.nextLine();
		int balance = Integer.parseInt(strBalance);

		// scanner로 입력받은 사용자 정보를 아래의 객체로 생성
		Account20 account = new Account20(ano, owner, balance);

		// 위에서 생성한 account 배열에 객체 하나를 저장한다.
		accountArray[arrCount] = account;
		// 배열 저장 후 배열의 행을 다음 카운트로 넘긴다.
		arrCount++;
		// 배열의 행 카운트가 1씩 증감되었기 때문에 계좌를 다시 생성할 경우
		// 먼저 생성된 배열의 바로 다음 행에 저장된다.
		System.out.println("결과: 계좌가 생성되었습니다.");

	}

	// 계좌 목록보기
	private static void accountList() {
		System.out.println("----------");
		System.out.println("계좌 목록");
		System.out.println("----------");

		for (int i = 0; i < accountArray.length; i++) {
			// 위에서 생성된 배열의 길이만큼 돈 후에
			Account20 account = accountArray[i];
			// 배열에 저장된 객체의 값을 account20 클래스에 저장한다.
			if (account != null) {
				// account객체의 값이 있으면
				System.out.print(account.getAno() + "\t");
				// account의 필드값을 받아와서 화면에 나타낸다.
				System.out.print(account.getOwner() + "\t");
				System.out.print(account.getBalnace() + "\t");
				System.out.println();
			} else {
				break;
				// account 객체의 값이 비어있으면 반복문을 정지시킨다.
			}
		}
	}

	// 예금하기
	private static void deposit() {
		System.out.println("----------");
		System.out.println("예금");
		System.out.println("----------");

		System.out.print("계좌번호: ");
		String ano = scanner.nextLine();

		System.out.print("예금액: ");
		String strBalance = scanner.nextLine();
		int balance = Integer.parseInt(strBalance);

		Account20 account = findAccount(ano);

		if (account != null) { // findAccount를 실행해서 account에 저장된 값을 찾았으면
			account.setBalnace(account.getBalnace() + balance); // account객체에서 balance를 get으로 불러와
																// 내가 입력한 값을 더해서 set으로 다시 저장한다.
			System.out.println("결과: 예금이 성공되었습니다.");
		} else {
			System.out.println("결과: 예금에 실패하였습니다.");
			return; // findAccount에서 검색을 못했으면 그대로 빠져나온다.
		}

	}

	// 출금하기
	private static void withdraw() {
		System.out.println("----------");
		System.out.println("출금");
		System.out.println("----------");

		System.out.print("계좌번호: ");
		String ano = scanner.nextLine();

		System.out.print("출금액: ");
		String strBalance = scanner.nextLine();
		int balance = Integer.parseInt(strBalance);

		Account20 account = findAccount(ano);

		if (account != null) {
			account.setBalnace(account.getBalnace() - balance); // 예금과 같은 코드를 사용하고 출금을 하기 때문에
																// 단순하게 금액만 단항연산자(-)로 빼준다.
			System.out.println("결과: 출금에 성공되었습니다.");
		} else {
			System.out.println("결과: 출금에 실패하였습니다.");
			return;
		}

	}

	// Account20 배열에서 ano와 동일한 Account20 객체 찾기
	private static Account20 findAccount(String ano) {
		Account20 account = null;
		for (int i = 0; i < accountArray.length; i++) { // 배열에 저장된 객체들을 불러운 후
			if (accountArray[i] != null) { // 값이 저장되어 있으면
				String searchAno = accountArray[i].getAno(); // 배열의 객체에 저장된 Ano의 값을
																// searchAno 객체에 저장한다.
				if (searchAno.equals(ano)) { // searchAno의 값과 내가 입력한 ano의 값이 같으면
					account = accountArray[i]; // 배열에 저장된 객체를 다시 account 객체에 저장한다
					break; // 그 후 반복문을 종료 시키고
				}
			}
		}
		return account; // 객체값을 가지고 있는다.
	}

}