package com.example.gagym.gymdetail;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GymDetailController {

	GymDetailRepository repo;

	public GymDetailController(GymDetailRepository repo) {
		this.repo = repo;
	}

//	@Cacheable(value = "gym")
//	@GetMapping(value = "/gym/{id}")
	@GetMapping(value = "/gymdetail")
	public List<GymDetail> getGymDetail() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}

}