package com.example.gagym.gym.gymdetail;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class GymDetailService {

	GymDetailRepository repo;

	public GymDetailService(GymDetailRepository repo) {
		this.repo = repo;
	}

	@RabbitListener(queues = "service.gym.create1")

	public void getGymDetail(GymDetail gymDetail) {
		System.out.println(gymDetail);
		saveGymDetail(gymDetail);
	}

	public GymDetail saveGymDetail(GymDetail gymDetail) {
		GymDetail saveGymDetail = GymDetail
				.builder()
				.gymName(gymDetail.getGymName())
				.gymCoNum(gymDetail.getGymCoNum())
				.gymLocateSi(gymDetail.getGymLocateSi())
				.gymLocateGunGu(gymDetail.getGymLocateGunGu())
				.gymAddress(gymDetail.getGymAddress())
				.gymPhoneNum(gymDetail.getGymPhoneNum())
				.gymTime(gymDetail.getGymTime())
				.gymService(gymDetail.getGymService())
				.gymPhoto(gymDetail.getGymPhoto())
				.fileName(gymDetail.getFileName())
				.fileType(gymDetail.getFileType())
				.gym1DayPrice(gymDetail.getGym1DayPrice())
				.gym3DayPrice(gymDetail.getGym3DayPrice())
				.gym7DayPrice(gymDetail.getGym7DayPrice())		
				.gymMonthPrice(gymDetail.getGymMonthPrice())
				.gym3MonthPrice(gymDetail.getGym3MonthPrice())
				.gym6MonthPrice(gymDetail.getGym6MonthPrice())
				.gymYearPrice(gymDetail.getGymYearPrice())
				//1117추가
//				.gymCode(gymDetail.getGymCode())
//				.trainerName(gymDetail.getTrainerName())
//				.trainerIntro(gymDetail.getTrainerIntro())
//				.trainerPhotoUrl(gymDetail.getTrainerPhotoUrl())
//				.pt1TimePrice(gymDetail.getPt1TimePrice())
//				.pt10TimePrice(gymDetail.getPt10TimePrice())
//				.pt30TimePrice(gymDetail.getPt30TimePrice())
//				.yoga1TimePrice(gymDetail.getYoga1TimePrice())
//				.yoga10TimePrice(gymDetail.getYoga10TimePrice())
//				.yoga30TimePrice(gymDetail.getYoga30TimePrice())
//				.pilates1TimePrice(gymDetail.getPilates1TimePrice())
//				.pilates10TimePrice(gymDetail.getPilates10TimePrice())
//				.pilates30TimePrice(gymDetail.getPilates30TimePrice())
				.build();	
		repo.save(saveGymDetail);

		return saveGymDetail;
	}
}