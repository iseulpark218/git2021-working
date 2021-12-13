package com.example.gagym.gym.trainer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class TrainerDetailService {

	TrainerDetailRepository repo;

	public TrainerDetailService(TrainerDetailRepository repo) {
		this.repo = repo;
	}

	@RabbitListener(queues = "service.trainer.create1")

	public void getTrainerDetail(TrainerDetail trainerDetail) {
		System.out.println(trainerDetail);
		saveTrainerDetail(trainerDetail);
	}

	public TrainerDetail saveTrainerDetail(TrainerDetail trainerDetail) {
		TrainerDetail saveTrainerDetail = TrainerDetail
				.builder()
				.gymCoNum(trainerDetail.getGymCoNum())
				//1117추가
				.gymCode(trainerDetail.getGymCode())
				.trainerName(trainerDetail.getTrainerName())
				.trainerIntro(trainerDetail.getTrainerIntro())
				.trainerPhotoUrl(trainerDetail.getTrainerPhotoUrl())
				.pt1TimePrice(trainerDetail.getPt1TimePrice())
				.pt10TimePrice(trainerDetail.getPt10TimePrice())
				.pt30TimePrice(trainerDetail.getPt30TimePrice())
				.yoga1TimePrice(trainerDetail.getYoga1TimePrice())
				.yoga10TimePrice(trainerDetail.getYoga10TimePrice())
				.yoga30TimePrice(trainerDetail.getYoga30TimePrice())
				.pilates1TimePrice(trainerDetail.getPilates1TimePrice())
				.pilates10TimePrice(trainerDetail.getPilates10TimePrice())
				.pilates30TimePrice(trainerDetail.getPilates30TimePrice())
				.build();	
		repo.save(saveTrainerDetail);

		return saveTrainerDetail;
	}
}