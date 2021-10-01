package com.git.myworkspace.opendata.covid;

import java.util.List;

import lombok.Data;

@Data
public class CovidHourResponse {
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

		private String stdDay;
		private String gubun;
		private int defCnt;
		private int incDec;
		private int isolIngCnt;
		private int isolClearCnt;
		private int overFlowCnt;
		private int deathCnt;

	}

}