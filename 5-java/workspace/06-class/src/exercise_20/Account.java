package exercise_20;

public class Account {
	private String ano; // 계좌번호
	private String owner; // 소유자이름
	private int balance; // 잔고금액
	private int deposit; // 입금액
	private int withdraw; // 출금액

	public Account(String ano, String owner, int balance, int deposit, int withdraw) {
		this.ano = ano;
		this.owner = owner;
		this.balance = balance;
		this.deposit = deposit;
		this.withdraw = withdraw;
	}

	public String getAno() {
		return ano;
	}

	public void setAno(String ano) {
		this.ano = ano;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public int getBalance() {
		return balance;
	}

	public void setBalance(int balance) {
		this.balance = balance;
	}

	public int getDeposit() {
		return deposit;
	}

	public void setDeposit(int deposit) {
		this.deposit = deposit;
	}

	public int getWithdraw() {
		return withdraw;
	}

	public void setWithdraw(int withdraw) {
		this.withdraw = withdraw;
	}
}
