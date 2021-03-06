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

		private String stdDay; // 수정일시분초
		private String gubun; // 시도명(한글)
		private int defCnt; // 확진자 수
		private int incDec; // 전일대비 증감수
		private int isolIngCnt; // 격리중 환자수
		private int isolClearCnt; // 격리 해제 수
		private int overFlowCnt; // 해외유입 수
		private int deathCnt; // 사망자 수
		private int localOccCnt; // 지역발생 수

	}

}