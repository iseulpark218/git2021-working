package com.git.myworkspace.mypage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MypageRepository extends JpaRepository<Mypage, Long> {

}
