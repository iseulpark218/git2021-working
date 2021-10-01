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
@Table(indexes = @Index(name = "idx_covid_hour_1", columnList = "gubun"))
@IdClass(CovidHourId.class)
public class CovidHour {

	// �����Ͻ�/ �õ����� ������ ������ �ߺ�ó�� �ȵǰ�.
	@Id
	private String stdDay; // �����Ͻú���
	@Id
	private String gubun; // �õ���(�ѱ�)
	private int defCnt; // Ȯ���� ��
	private int incDec; // ���ϴ�� ������
	private int isolIngCnt; // �ݸ��� ȯ�ڼ�
	private int isolClearCnt; // �ݸ� ���� ��
	private int overFlowCnt; // �ؿ����� ��
	private int deathCnt; // ����� ��
//	private int localOccCnt; //�����߻� ��

}
