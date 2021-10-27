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