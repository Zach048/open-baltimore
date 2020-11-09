/**
 * 
 */
package com.jhu.openbaltimore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jhu.openbaltimore.model.Restaurant;
import com.jhu.openbaltimore.model.Review;

/**
 * @author Zach
 *
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	@Query("from Review where email = :email")
	public List<Review> findAllByEmail(@Param("email") String email);
	
	@Query("from Review where restaurant = :restaurant")
	public List<Review> findAllByRestaurant(@Param("restaurant") Restaurant restaurant);
	
}
