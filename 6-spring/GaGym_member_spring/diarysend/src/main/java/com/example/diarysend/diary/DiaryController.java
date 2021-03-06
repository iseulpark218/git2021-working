package com.example.diarysend.diary;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.diarysend.Result;

@RestController
public class DiaryController {
	private DiaryService service;

	public DiaryController(DiaryService service) {
		this.service = service;
	}

	@PostMapping(value = "/diary")
	public DiaryCreateResponse addDiary(@RequestBody DiaryCreateRequest diaryRequest) {

		// 데이터 검증

		// DB에 저장할 객체 생성
		Diary diary = Diary
				.builder()
//				.id(1)
//				.diaryCreateTime(new Date().getTime())
				.diaryMorning(diaryRequest.getDiaryMorning())
				.diaryLunch(diaryRequest.getDiaryLunch())
				.diaryDinner(diaryRequest.getDiaryDinner())
				.diaryRoutine(diaryRequest.getDiaryRoutine())
				.diaryRequest(diaryRequest.getDiaryRequest())
				.trainerName(diaryRequest.getTrainerName())
				.trainerFeedback(diaryRequest.getTrainerFeedback())
				.build();

		// DB에 저장
		// repo.save(diary)

		// (event)외부 시스템에 추가된 데이터 보내기
		service.sendDiary(diary);

		return DiaryCreateResponse.builder().diary(diary).result(new Result("00", "생성완료")).build();
	}
}
