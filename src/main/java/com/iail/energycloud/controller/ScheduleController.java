package com.iail.energycloud.controller;

import com.iail.energycloud.entity.bgmx.ScheduleParamEntity;
import com.iail.energycloud.service.ScheduleParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScheduleController {

    @Autowired
    ScheduleParamService scheduleParamService;

    @GetMapping("/schedule/select")
    public List<ScheduleParamEntity> getSchedule(){
        return scheduleParamService.selectSchedule();
    }

    @PostMapping("/schedule/insert")
    public String insertSchedule(@RequestParam("order")Integer order, @RequestParam("varName")String varName, @RequestParam("lowLimit")Integer lowLimit,
                                 @RequestParam("highLimit")Integer highLimit, @RequestParam("group")String group, @RequestParam("unit")String unit){
        scheduleParamService.insertSchedule(order, varName, lowLimit, highLimit, group, unit);
        return "200";
    }

    @PostMapping("/schedule/delete")
    public String deleteSchedule(@RequestParam("id")String id){
        scheduleParamService.deleteSchedule(id);
        return "200";
    }
}
