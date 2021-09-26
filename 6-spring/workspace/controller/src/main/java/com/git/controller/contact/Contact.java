package com.git.controller.contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
	private long id;
//	private String select;
	private String txtName;
	private String txtContact;
	private String txtEmail;
	private long createdTime;
}
