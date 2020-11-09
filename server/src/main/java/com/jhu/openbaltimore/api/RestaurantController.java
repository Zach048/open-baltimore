/**
 * 
 */
package com.jhu.openbaltimore.api;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	public List<Restaurant> getRestaurants() {
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
	
	@GetMapping(value = "/export")
    public void downloadCSV(HttpServletResponse response) throws IOException {
        String csvFileName = "restaurants.csv";
        response.setContentType("text/csv");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename="+csvFileName+".csv");
        response.setHeader(headerKey, headerValue);
        // uses the Super CSV API to generate CSV data from the model data
        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(),
                CsvPreference.STANDARD_PREFERENCE);
        String[] header = { "Name", "Address", "ZipCode", "Neighborhood" };
        csvWriter.writeHeader(header);
        for (Restaurant r : getRestaurants()) {
            csvWriter.write(r, header);
        }
        csvWriter.close();
    }
}
