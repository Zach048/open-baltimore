package com.jhu.openbaltimore.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jhu.openbaltimore.model.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	
	@Query("SELECT SUM(rating) FROM Restaurant WHERE id = :id")
	public Integer getSumOfRatings(@Param("id") Long id);

}
