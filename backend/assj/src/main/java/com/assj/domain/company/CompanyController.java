package com.assj.domain.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assj.utils.Wgs84ToWtmConverter;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/get")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/items")
    public List<Company> getCompaniesPage(@RequestParam int page, @RequestParam int size,
            @RequestParam String filteredData) {
        return companyService.getCompaniesPage(page, size, filteredData);
    }

    @GetMapping("/getItems")
    public List<Company> getItems(@RequestParam String filteredData) {
        return companyService.getItems(filteredData);
    }

    @GetMapping("/set")
    public void setCompaniesData() {
        companyService.initializeCompanyData();
    }

    @GetMapping("/map")
    public double[] map() {
        return Wgs84ToWtmConverter.convertWgs84ToWtm(126.5774068, 33.4533577);
    }
}
