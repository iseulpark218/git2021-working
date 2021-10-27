package com.git.myworkspace.opendata.covid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component("covidController")
@RestController
@RequestMapping(value = "/opendata/covid")
public class CovidController {
	private CovidSidoDailyRepository repo;
	private final String cachName = "covid-current";

	@Autowired
	public CovidController(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}
	// 1. ���� ������ ��ȸ
	// page size(limit)�� 19��, ������ stdDay desc

	// 2. Ư�� �õ��� �ֱ� 7�ϰ� ������ ��ȸ
	// �˻����ǿ� gubun, page size(limit)�� 7, ������ stdDay desc
	// ��) WHERE gubun='����' ORDER BY std_day DESC LIMIT 7;

	@Cacheable(value = cachName, key = "'all'")
	@GetMapping(value = "/gubun/current")
	public List<CovidSidoDaily> getCovidSidoCurrent() {
		return repo.findAll(PageRequest.of(0, 19, Sort.by("stdDay").descending())).toList();
	}

	@Cacheable(value = cachName, key = "#gubun")
	@GetMapping(value = "/gubun/current/{gubun}")
	public List<CovidSidoDaily> getCovideSidoCurrent(@PathVariable String gubun) {
		Pageable page = PageRequest.of(0, 7, Sort.by("stdDay").descending());
		return repo.findByGubun(page, gubun);
	}

}