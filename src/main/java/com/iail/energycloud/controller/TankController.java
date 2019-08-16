package com.iail.energycloud.controller;

import com.iail.energycloud.entity.bgmx.TankLimitEntity;
import com.iail.energycloud.service.TankLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TankController {

    @Autowired
    TankLimitService tankLimitService;

    @GetMapping("/tank/select")
    public List<TankLimitEntity> getTankLimit(){
        return tankLimitService.selectTankLimit();
    }

    @PostMapping("/tank/insert")
    public String insertTankLimit(@RequestParam("itemName")String itemName, @RequestParam("hhLimit")Integer hhLimit, @RequestParam("hLimit")Integer hLimit, @RequestParam("lLimit")Integer lLimit,
                                  @RequestParam("llLimit")Integer llLimit, @RequestParam("dsp")Integer dsp){
        tankLimitService.insertTankLimit(itemName,hhLimit,hLimit,lLimit,llLimit,dsp);
        return "200";
    }

    @PostMapping("/tank/delete")
    public String deleteTankLimit(@RequestParam("id")String id){
        tankLimitService.deleteTankLimit(id);
        return "200";
    }
}
