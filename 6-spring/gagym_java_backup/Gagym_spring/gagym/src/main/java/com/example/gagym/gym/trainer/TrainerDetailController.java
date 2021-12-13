package com.example.gagym.gym.trainer;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TrainerDetailController {

	TrainerDetailRepository repo;

	public TrainerDetailController(TrainerDetailRepository repo) {
		this.repo = repo;
	}

//	@Cacheable(value = "gym")
	@GetMapping(value = "/gagym/detail/trainer")
//	@GetMapping(value = {"/gagym/detail","/gagym/detail/{id}"})
	public List<TrainerDetail> getTrainerDetail() throws InterruptedException {
		return repo.findAll(Sort.by("id").descending());
	}

}