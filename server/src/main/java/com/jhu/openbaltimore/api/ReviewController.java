/**
 * 
 */
package com.jhu.openbaltimore.api;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jhu.openbaltimore.model.Restaurant;
import com.jhu.openbaltimore.model.Review;
import com.jhu.openbaltimore.repository.RestaurantRepository;
import com.jhu.openbaltimore.repository.ReviewRepository;

/**
 * @author Zach
 *
 */
@RestController
@RequestMapping("review")
public class ReviewController {
	
	@Autowired
	ReviewRepository reviewRepo;
	
	@Autowired
	RestaurantRepository restRepo;
		
	@GetMapping("all/{email}")
	public List <Review> getReviewByEmail(@PathVariable String email) {
		return reviewRepo.findAllByEmail(email);
	}
	
	@PostMapping("save")
	public void saveReview(@RequestBody Review r) {
		Review newReview = reviewRepo.save(r);
		Restaurant restaurantReviewed = restRepo.getOne(newReview.getRestaurant().getId());	
		if (restRepo.getSumOfRatings(restaurantReviewed.getId()) != null) {
			Integer sumOfRatings = restRepo.getSumOfRatings(restaurantReviewed.getId())+newReview.getRating();
			Double rating = (double) (sumOfRatings/reviewRepo.findAllByRestaurant(restaurantReviewed).size());
			restaurantReviewed.setRating(rating);
		}
		else {
			restaurantReviewed.setRating((double)newReview.getRating()); 
		}
		restRepo.save(restaurantReviewed);
	}
		

}
