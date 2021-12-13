package com.example.gagym.gym.gymdetail;

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
//	@GetMapping(value = "/gagym/gym-list")
	@GetMapping(value = {"/gagym/gym-list","/gagym/detail/{id}"})
	public List<GymDetail> getGymDetail() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}

}