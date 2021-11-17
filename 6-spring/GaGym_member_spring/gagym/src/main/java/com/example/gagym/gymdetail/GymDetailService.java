package com.example.gagym.gymdetail;

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
				.gymLocateGunGu(gymDetail.getGymLocateGunGu()).gymAddress(gymDetail.getGymAddress()).gymPhoneNum(gymDetail.getGymPhoneNum())
				.gymTime(gymDetail.getGymTime()).gymService(gymDetail.getGymService()).gym1DayPrice(gymDetail.getGym1DayPrice())
				.gym3DayPrice(gymDetail.getGym3DayPrice()).gym7DayPrice(gymDetail.getGym7DayPrice())
				.gym3MonthPrice(gymDetail.getGymMonthPrice()).gym3MonthPrice(gymDetail.getGym3MonthPrice()).gym6MonthPrice(gymDetail.getGym6MonthPrice())
				.gymYearPrice(gymDetail.getGymYearPrice())
							.build();	
		repo.save(saveGymDetail);

		return saveGymDetail;
	}
}