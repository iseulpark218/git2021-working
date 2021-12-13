package com.example.gagym.diaryreceive.diary;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class DiaryReceiveService {

	DiaryReceiveRepository repo;

	public DiaryReceiveService(DiaryReceiveRepository repo) {
		this.repo = repo;
	}

	@RabbitListener(queues = "service.diary.feedback")

	public void getDiaryReceive(DiaryReceive diaryReceive) {
		System.out.println(diaryReceive);
		saveDiaryReceive(diaryReceive);
	}

	public DiaryReceive saveDiaryReceive(DiaryReceive diaryReceive) {
		DiaryReceive saveDiaryReceive = DiaryReceive
				.builder()
//				.id(1)
//				.diaetCreateTime(new Date().getTime())
				.diaryMorning(diaryReceive.getDiaryMorning())
				.diaryLunch(diaryReceive.getDiaryLunch())
				.diaryDinner(diaryReceive.getDiaryDinner())
				.diaryRoutine(diaryReceive.getDiaryRoutine())
				.diaryRequest(diaryReceive.getDiaryRequest())
				.trainerName(diaryReceive.getTrainerName())
				.trainerFeedback(diaryReceive.getTrainerFeedback())
				.build();
		repo.save(saveDiaryReceive);

		return saveDiaryReceive;
	}
}