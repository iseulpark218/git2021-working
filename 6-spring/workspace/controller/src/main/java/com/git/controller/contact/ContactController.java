package com.git.controller.contact;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.git.controller.lib.TextProcesser;

@RestController
public class ContactController {

	private SortedMap<Long, Contact> contacts = Collections
			.synchronizedSortedMap(new TreeMap<Long, Contact>(Collections.reverseOrder()));
	private AtomicLong maxId = new AtomicLong();

	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() throws InterruptedException {
		Thread.sleep(1000); // �ӽ������� 2�� ����
		return new ArrayList<Contact>(contacts.values());
	}

	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) throws InterruptedException {
		Thread.sleep(1000); // �ӽ�

		// Ÿ��Ʋ�� ��
		if (TextProcesser.isEmpyText(contact.getTxtName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ����URL�� ��
		if (TextProcesser.isEmpyText(contact.getTxtContact())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// id���� ����
		Long currentId = maxId.incrementAndGet();

		// ��ü ����
		Contact contactItem = Contact.builder().id(currentId).txtName(contact.getTxtName())
				.txtEmail(TextProcesser.getPlainText(contact.getTxtEmail())).txtContact(contact.getTxtContact())
				.createdTime(new Date().getTime()).build();

		contacts.put(currentId, contactItem);

		// ���ҽ� ������
		res.setStatus(HttpServletResponse.SC_CREATED);

		// �߰��� ��ü�� ��ȯ
		return contactItem;
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContacts(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
		Thread.sleep(5000);

		// id�� �ش��ϴ� ��ü�� ������
		Contact contact = contacts.get(Long.valueOf(id));
		if (contact == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// ���� ����
		contacts.remove(Long.valueOf(id));

		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContacts(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res)
			throws InterruptedException {

		Thread.sleep(1000);

		// id�� �ش��ϴ� ��ü�� ������
		Contact contactItem = contacts.get(Long.valueOf(id));
		if (contactItem == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		// Ÿ��Ʋ�� ��
		if (TextProcesser.isEmpyText(contact.getTxtName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ����URL�� ��
		if (TextProcesser.isEmpyText(contact.getTxtContact())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		contactItem.setTxtName(contact.getTxtName());
		contactItem.setTxtEmail(TextProcesser.getPlainText(contact.getTxtEmail()));
		contactItem.setTxtContact(contact.getTxtContact());

		return contactItem;
	}
}
