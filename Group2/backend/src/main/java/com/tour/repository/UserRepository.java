package com.tour.repository;

import com.tour.model.AdminUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends CrudRepository<AdminUser, Integer> {
    // Define any custom queries or methods if needed
}
