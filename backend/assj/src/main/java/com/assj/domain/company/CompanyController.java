package com.assj.domain.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/api/getCorpData")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    // 주소 좌표 호출
    @GetMapping("/api/getGeo/{address}")
    public List<Double> getGeo(@PathVariable String address) {
        List<Double> obj = getGeo(address);
        return obj;
    }

    @GetMapping("/api/setcorp")
    public void test1() throws Exception {
        companyService.initializeCompanyData();
    }
}
