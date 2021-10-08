package com.git.helloproducer;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelloproducerService {

	private RabbitTemplate rabbit;

	@Autowired
	public HelloproducerService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}

	public void sendMessage(byte[] message) {
		rabbit.send("test.hello.1", new Message(message));
//		rabbit.send("test.hello.2", new Message(message));
//		rabbit.send("test.hello.3", new Message(message));
	}

}
