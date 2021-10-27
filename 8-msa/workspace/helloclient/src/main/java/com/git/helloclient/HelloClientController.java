package com.git.helloclient;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
public class HelloClientController {

	private HelloClientService service;

	private Map<String, String> clientConnectedMap = new HashMap<String, String>();

	@Autowired
	public HelloClientController(HelloClientService service) {
		this.service = service;
	}

	// Server Sent Event �������ݷ� ó���� ���� ��ȯ Ÿ���� SseEmitter
	@GetMapping("/event/{clientId}")
	public SseEmitter connectEvent(@PathVariable String clientId) {

		// Event�� �߻���Ű�� ��ü�� ����

		// ������ �ش� clientId emitter ������ ����
		SseEmitter emitter = service.getEmitter(clientId);
		if (emitter != null) {
			service.removeEmitter(clientId);
		}

		// timeout �ð��� �������� ó��, Ŭ���̾�Ʈ���� �ٽ� ��û�� ������ ����
		emitter = new SseEmitter(-1L);

		// ���� ��ü�� emitter ��ü�� �Ѱ���
		service.putEmitter(clientId, emitter);

		try {
			emitter.send("connected");
//			emitter.send(SseEmitter.event().name("connect").data("connect").build());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return emitter;
	}
}