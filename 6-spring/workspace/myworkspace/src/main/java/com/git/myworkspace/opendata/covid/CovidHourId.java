package com.git.myworkspace.opendata.covid;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CovidHourId implements Serializable {
	private static final long serialVersionUID = 1L;
	private String stdDay;
	private String gubun;
	private int defCnt;
	private int incDec;
	private int isolIngCnt;
	private int isolClearCnt;
	private int overFlowCnt;
	private int deathCnt;
}
