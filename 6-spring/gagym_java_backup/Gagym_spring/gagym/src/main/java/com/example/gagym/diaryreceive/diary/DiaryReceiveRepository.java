package com.example.gagym.diaryreceive.diary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryReceiveRepository extends JpaRepository<DiaryReceive, Long> {
//	List<DiaryReceive> findById(int id);
}