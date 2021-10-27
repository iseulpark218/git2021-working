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

	// �����Ͻ�/ �õ����� ������ ������ �ߺ�ó�� �ȵǰ�.
	@Id
	private String stdDay; // �����Ͻú���
	@Id
	private String gubun; // �õ���(�ѱ�)
	private int defCnt; // Ȯ���� ��
	private int incDec; // ���ϴ�� ������
	private int isolIngCnt; // �ݸ��� ȯ�ڼ�
	private int isolClearCnt; // �ݸ� ���� ��
	private int deathCnt; // ����� ��
	private Integer overFlowCnt; // �ؿ����� ��
	private Integer localOccCnt; // �����߻� ��
}