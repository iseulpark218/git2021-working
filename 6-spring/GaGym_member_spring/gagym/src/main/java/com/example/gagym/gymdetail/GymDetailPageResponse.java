package com.example.gagym.gymdetail;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GymDetailPageResponse {

	private boolean isLast;
	private long totalElements;
	private List<GymDetail> content;
}
