package com.git.myworkspace.opendata.covid;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidSidoDailyRepository extends JpaRepository<CovidSidoDaily, Long> {

	// https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation

	// findBy�ʵ��
	// �ʵ���� Pacal-Case�� ��ҹ��� �� ���߾����

	// ��) �ʵ�� gubunName
	// findByGubun
	// -> WHERE gubun_name = :gubun ORDER BY ... LIMIT ...
	List<CovidSidoDaily> findByGubun(Pageable page, String gubun);
}