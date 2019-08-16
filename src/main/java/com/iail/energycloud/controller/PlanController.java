package com.iail.energycloud.controller;

import com.iail.energycloud.entity.bgmx.PlanOperateEntity;
import com.iail.energycloud.service.PlanOperateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlanController {

    @Autowired
    PlanOperateService planOperateService;

    @GetMapping("/plan/select")
    public List<PlanOperateEntity> getPlan(){
        return planOperateService.selectPlan();
    }

    @PostMapping("/plan/insert")
    public String insertPlan(@RequestParam("systemName")String systemName,
                             @RequestParam("objectName")String objectName,@RequestParam("operation")String operation,
                             @RequestParam("objectTag")Integer objectTag,@RequestParam("systemTag")Integer systemTag){
        planOperateService.insertPlan(systemName,objectName,operation,objectTag,systemTag);
        return "200";
    }

    @PostMapping("/plan/delete")
    public String deletePlan(@RequestParam("id")String id){
        planOperateService.deletePlan(id);
        return "200";
    }
}
