package com.example.gagym.gym.gymdetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymDetailRepository extends JpaRepository<GymDetail, Long> {
//	List<GymDetail> findById(int id);
}