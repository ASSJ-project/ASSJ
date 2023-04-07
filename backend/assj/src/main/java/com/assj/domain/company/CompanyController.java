package com.assj.domain.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assj.dto.Company;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // 삭제 예정
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/items")
    public List<Company> getCompaniesPage(@RequestParam String region, @RequestParam String jobsCd,
            @RequestParam int page, @RequestParam int size) {

        return companyService.getCompaniesPage(region, jobsCd, page, size);
    }

    @GetMapping("/getItems")
    public List<Company> getItems(@RequestParam String region, @RequestParam String jobsCd) {
        log.info("region : ", region);
        return companyService.getItems(region, jobsCd);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/set")
    public void setCompaniesData() {
        companyService.initializeCompanyData();
    }
}
