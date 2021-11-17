package com.example.gagym.gymdetail;


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
public class GymDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
//	@Column(columnDefinition = "BLOB")
	@Column(columnDefinition = "VARCHAR(255)")
	private String gymName;
	private String gymCoNum;
	private String gymLocateSi;
	private String gymLocateGunGu;
	private String gymAddress;
	private String gymPhoneNum;
	private String gymTime;
	private String gymService;
	private String gym1DayPrice;
	private String gym3DayPrice;
	private String gym7DayPrice;
	private String gymMonthPrice;
	private String gym3MonthPrice;
	private String gym6MonthPrice;
	private String gymYearPrice;
}
