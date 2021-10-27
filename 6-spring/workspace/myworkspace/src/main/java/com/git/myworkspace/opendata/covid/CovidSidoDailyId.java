package com.git.myworkspace.opendata.covid;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CovidSidoDailyId implements Serializable {
	private static final long serialVersionUID = 1L;
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