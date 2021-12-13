package com.example.gagym.gym.trainer;

import javax.persistence.Column;
//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
public class TrainerDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
//	@Column(columnDefinition = "BLOB")
//	@Column(columnDefinition = "VARCHAR(255)")
	@Column(columnDefinition = "TEXT")
	private String gymCoNum;
	private String gymCode;
	private String trainerName;
	private String trainerIntro;
	private String trainerPhotoUrl;
	private String pt1TimePrice;
	private String pt10TimePrice;
	private String pt30TimePrice;
	private String yoga1TimePrice;
	private String yoga10TimePrice;
	private String yoga30TimePrice;
	private String pilates1TimePrice;
	private String pilates10TimePrice;
	private String pilates30TimePrice;
}
