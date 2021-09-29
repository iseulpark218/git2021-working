package com.git.myworkspace.contact;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.git.myworkspace.lib.TextProcesser;

@RestController
public class ContactController {

	private ContactRepository repo;

	// Autowired 어노테이션은 매개변수나 필드 타입에 맞는 객체를
	// Spring에서 생성하여 주입하여줌(의존성 주입, 의존객체주입, DI, Dependency Injection)
	// Repository 인터페이스 구조에 맞는 객체를 Spring에 생성하여 넣어줌
	@Autowired
	public ContactController(ContactRepository repo) {
		this.repo = repo;
	}

	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() throws InterruptedException {
		// repository.findAll();
		// SELECT * FROM contact;
		// 기본적으로 PK 순정렬(asc, ascending)되고 있는 상황
		// 1 2 3 .....
//		return repo.findAll();

		// id컬럼 역정렬(clusted index)
		// Sort.by("정렬컬럼").desceding() 역정렬
		// Sort.by("정렬컬럼").ascending() 순정렬
		return repo.findAll(Sort.by("id").descending());
	}

	// 예) 한페이지 2개, 1번째 페이지
	// 예) GET /contacts/paging?page=0&size=2
	@GetMapping("/contacts/paging")
	public Page<Contact> getContactsPaging(@RequestParam int page, @RequestParam int size) {
		// findAll(Pageable page)
		// findAll(PageRequest.of(page, size, Sort sort));
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}

	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) throws InterruptedException {
		// 타이틀이 빈값
		if (TextProcesser.isEmpyText(contact.getTxtName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 파일URL이 빈값
		if (TextProcesser.isEmpyText(contact.getTxtContact())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 객체 생성
		Contact contactItem = Contact.builder().txtName(contact.getTxtName()).txtContact(contact.getTxtContact())
				.txtEmail(contact.getTxtEmail()).createdTime(new Date().getTime()).build();

		// repository.save(entity)
		// insert into contact(...) values(...)
		Contact contactSaved = repo.save(contactItem);

		// 리소스 생성됨
		res.setStatus(HttpServletResponse.SC_CREATED);

		// 추가된 객체를 반환
		return contactSaved;
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContacts(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
//		Thread.sleep(5000);

		// id에 해당하는 객체가 없으면
		// Optional null-safe, 자바 1.8 나온 방식
		// repository.findBy(id)
		// select * from contact where id = ?;
		Optional<Contact> contact = repo.findById(id);
		if (contact.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 삭제 수행
		// repository.deletebyId(id)
		// delete from contact where id = ?
		repo.deleteById(id);

		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContacts(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res)
			throws InterruptedException {

		// id에 해당하는 객체가 없으면
		Optional<Contact> contactItem = repo.findById(id);
		if (contactItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		// 타이틀이 빈값
		if (TextProcesser.isEmpyText(contact.getTxtName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 파일URL이 빈값
		if (TextProcesser.isEmpyText(contact.getTxtContact())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Contact contactToSave = contactItem.get();

		contactToSave.setTxtName(contact.getTxtName());
		contactToSave.setTxtContact(contact.getTxtContact());
		contactToSave.setTxtEmail(contact.getTxtEmail());

		// repository.save(entity)
		// id가 있으면 UPDATE, 없으면 INSERT
		// UPDATE
		// SET txtName=?, descript=?,......
		// WHERE id = ?
		Contact contactSaved = repo.save(contactToSave);

		return contactSaved;
	}
}
