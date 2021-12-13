package com.example.diaryreceive.diary;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DiaryReceiveController {

	DiaryReceiveRepository repo;

	public DiaryReceiveController(DiaryReceiveRepository repo) {
		this.repo = repo;
	}

//	@Cacheable(value = "diary")
//	@GetMapping(value = "/diary/{id}")
	@GetMapping(value = "/diaryreceive")
	public List<DiaryReceive> getDiaryReceive() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}

}