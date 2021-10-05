package com.git.myworkspace.opendata.covid;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(name = "idx_covid_sidodaily_1", columnList = "stdDay , gubun"))
@IdClass(CovidSidoDailyId.class)
public class CovidSidoDaily {

	// 기준일시/ 시도명에만 유일한 값으로 중복처리 안되게.
	@Id
	private String stdDay; // 수정일시분초
	@Id
	private String gubun; // 시도명(한글)
	private int defCnt; // 확진자 수
	private int incDec; // 전일대비 증감수
	private int isolIngCnt; // 격리중 환자수
	private int isolClearCnt; // 격리 해제 수
	private int overFlowCnt; // 해외유입 수
	private int deathCnt; // 사망자 수
	private int localOccCnt; // 지역발생 수

}