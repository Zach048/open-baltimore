/**
 * 
 */
package com.jhu.openbaltimore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author Zach
 *
 */

@Entity
@Table(name = "review")
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 50)
	private String email;
	@Column(length = 10)
	private Integer rating;
	@Column(length = 100)
	private String review;
	@ManyToOne(optional = false)
	@JoinColumn(name = "restaurant_id")
	private Restaurant restaurant;
	
	public Review() {
		super();
	}

	public Review(Long id, String email, Integer rating, String review, Restaurant restaurant) {
		super();
		this.id = id;
		this.email = email;
		this.rating = rating;
		this.review = review;
		this.restaurant = restaurant;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
}
	
	