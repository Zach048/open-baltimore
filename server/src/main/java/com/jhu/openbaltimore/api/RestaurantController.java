/**
 * 
 */
package com.jhu.openbaltimore.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jhu.openbaltimore.model.Restaurant;
import com.jhu.openbaltimore.repository.RestaurantRepository;

/**
 * @author Zach Earl
 *
 */
@RestController
@RequestMapping("restaurant")
public class RestaurantController {
	
	@Autowired
	RestaurantRepository restRepo;
	
	@GetMapping("all")
	public List<Restaurant> getRestuarants() {
		return restRepo.findAll();
	}
	
	@PostMapping("save")
	public Long saveRestaurant(@RequestBody Restaurant r) {
		Restaurant newRestaurant = restRepo.save(r);
		return newRestaurant.getId();
	}
	
	@PutMapping("update")
	public void updateRestaurant(@RequestBody Restaurant r) {
		if(r.getId() != null && restRepo.existsById(r.getId())) {
			restRepo.save(r);
		}
	}
	
	@PostMapping("delete")
	public void deleteRestaurant(@RequestBody Long id) {
		restRepo.deleteById(id);
	}
}
