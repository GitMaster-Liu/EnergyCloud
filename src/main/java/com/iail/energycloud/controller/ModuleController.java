package com.iail.energycloud.controller;

import com.iail.energycloud.entity.bgmx.*;
import com.iail.energycloud.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ModuleController{

    @Autowired
    DmModuleService dmModuleService;

    @GetMapping("/module/select")
    public List<DmModuleEntity> getModule(){
        return dmModuleService.getModule();
    }

    @PostMapping("/module/insert")
    public String insertModule(@RequestParam("moduleName")String moduleName,@RequestParam("moduleType")String moduleType,
                             @RequestParam("cycle")Integer cycle){
        dmModuleService.insertModule(moduleName, moduleType, cycle);
        return "200";
    }

    @PostMapping("/module/update")
    public String updateModule(@RequestParam("id")String id,@RequestParam("moduleName")String moduleName,
                             @RequestParam("moduleType")String moduleType,
                             @RequestParam("cycle")Integer cycle){
        dmModuleService.updateModule(id, moduleName, moduleType, cycle);
        return "200";
    }

    @PostMapping("/module/delete")
    public String deleteModule(@RequestParam("id")String id){
        dmModuleService.deleteModule(id);
        return "200";
    }

    @GetMapping("/module/template")
    public String tempModule(){
        return "200";
    }
}