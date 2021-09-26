package exercise_16;

public class PrinterExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Printer printer = new Printer();

		printer.println(10);
		printer.println(true);
		printer.println(5.7);
		printer.println("홍길동");

		printer.println("메시지입니다", 1);

		// printer.println("알림메시지입니다", 1, "!!");

	}

}
