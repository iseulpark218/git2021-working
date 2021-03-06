package com.example.diarysend.diary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryCreateRequest {
	private String diaryMorning;
	private String diaryLunch;
	private String diaryDinner;
	private String diaryRoutine;
	private String diaryRequest;
	private String trainerName;
	private String trainerFeedback;
}