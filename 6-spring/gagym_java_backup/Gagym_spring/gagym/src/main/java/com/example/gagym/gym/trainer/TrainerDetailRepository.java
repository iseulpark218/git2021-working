package com.example.gagym.gym.trainer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerDetailRepository extends JpaRepository<TrainerDetail, Long> {
//	List<TrainerDetail> findById(int id);
}