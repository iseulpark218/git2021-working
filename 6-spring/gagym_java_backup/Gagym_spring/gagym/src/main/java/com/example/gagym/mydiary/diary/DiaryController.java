package com.example.gagym.mydiary.diary;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DiaryController {

	private DiaryRepository repo;

	
	@Autowired
	public DiaryController(DiaryRepository repo) {
		this.repo = repo;
		
	}

	@GetMapping(value = "/diary")
	public List<Diary> getDiarys() throws InterruptedException {


		return repo.findAll(Sort.by("id").descending());
	}


	@GetMapping("/diary/paging")
	public Page<Diary> getDiarysPaging(@RequestParam int page, @RequestParam int size) {
	
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}

	@PostMapping(value = "/diary")
	public Diary addDiary(@RequestBody Diary diary, HttpServletResponse res) throws InterruptedException {

		Diary diaryItem = Diary.builder()
				.diaryCreateTime(new Date().getTime())
				.diaryMorning(diary.getDiaryMorning())
				.diaryLunch(diary.getDiaryLunch())
				.diaryDinner(diary.getDiaryDinner())
				.diaryRoutine(diary.getDiaryRoutine())
				.diaryRequest(diary.getDiaryRequest())
				.trainerName(diary.getTrainerName())
				.trainerFeedback(diary.getTrainerFeedback())
				.build();


		Diary diarySaved = repo.save(diaryItem);

		res.setStatus(HttpServletResponse.SC_CREATED);

		return diarySaved;
	}

	@DeleteMapping(value = "/diary/{id}")
	public boolean removeDiarys(@PathVariable long id, HttpServletResponse res) throws InterruptedException {

		Optional<Diary> diary = repo.findById(id);
		if (diary.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		repo.deleteById(id);

		return true;
	}

	@PutMapping(value = "/diary/{id}")
	public Diary modifyDiarys(@PathVariable long id, @RequestBody Diary diary, HttpServletResponse res)
			throws InterruptedException {


		Optional<Diary> diaryItem = repo.findById(id);
		if (diaryItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}


		Diary diaryToSave = diaryItem.get();

		diaryToSave.setTrainerFeedback(diary.getTrainerFeedback());
		diaryToSave.setDiaryMorning(diary.getDiaryMorning());
		diaryToSave.setDiaryLunch(diary.getDiaryLunch());
		diaryToSave.setDiaryDinner(diary.getDiaryDinner());
		diaryToSave.setDiaryRoutine(diary.getDiaryRoutine());
		diaryToSave.setDiaryRequest(diary.getDiaryRequest());
		diaryToSave.setTrainerName(diary.getTrainerName());
		

		Diary diarySaved = repo.save(diaryToSave);

		return diarySaved;
	}
}