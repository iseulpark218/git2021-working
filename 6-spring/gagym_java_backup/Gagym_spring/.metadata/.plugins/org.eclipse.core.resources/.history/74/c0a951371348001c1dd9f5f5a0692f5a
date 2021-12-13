package com.example.diarysend.diary;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class DiaryService {

	private RabbitTemplate rabbit;

	private DiaryService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}

	public void sendDiary(Diary diary) {
		System.out.println(diary);
		rabbit.convertAndSend("service.diary.create", diary);
	}
}
