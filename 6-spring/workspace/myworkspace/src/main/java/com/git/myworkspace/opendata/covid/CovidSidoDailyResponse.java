package com.git.myworkspace.opendata.covid;

import java.util.List;

import lombok.Data;

@Data
public class CovidSidoDailyResponse {
	private Response response;

	@Data
	public class Response {
		private Header header;
		private Body body;
	}

	@Data
	public class Header {
		private String resultCode;
		private String resultMsg;
	}

	@Data
	public class Body {
		private Items items;
	}

	@Data
	public class Items {
		private List<Item> item;
	}

	@Data
	public class Item {

		private String stdDay; // �����Ͻú���
		private String gubun; // �õ���(�ѱ�)
		private int defCnt; // Ȯ���� ��
		private int incDec; // ���ϴ�� ������
		private int isolIngCnt; // �ݸ��� ȯ�ڼ�
		private int isolClearCnt; // �ݸ� ���� ��
		private int overFlowCnt; // �ؿ����� ��
		private int deathCnt; // ����� ��
		private int localOccCnt; // �����߻� ��

	}

}