package com.git.helloproducer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloproducerController {

	// service를 여기에 의존주입 한다.
	private HelloproducerService service;

	@Autowired
	public HelloproducerController(HelloproducerService service) {
		this.service = service;
	}

	@PostMapping(value = "/send-message")
	public boolean sendMessage(@RequestBody String message) {
		System.out.println(message);
		service.sendMessage(message.getBytes());
		return true;
	}
}
