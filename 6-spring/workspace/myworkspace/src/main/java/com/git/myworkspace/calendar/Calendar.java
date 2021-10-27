package com.git.myworkspace.calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Calendar {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
//	private String select;
	@Column(columnDefinition = "VARCHAR(1000)")
	private String txtName;
	@Column(columnDefinition = "TEXT")
	private String txtCalendar;
	private String txtEmail;
	private long createdTime;
}
