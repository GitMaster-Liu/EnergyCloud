package com.iail.energycloud.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/module")
    public String module(){
        return "init/module";
    }

    @GetMapping("/point")
    public String point(){
        return "init/point";
    }

    @GetMapping("/predict")
    public String predict(){
        return "init/predict";
    }

    @GetMapping("/tag")
    public String tag(){
        return "init/tagParam";
    }

    @GetMapping("/schedule")
    public String schedule(){
        return "init/scheduleParam";
    }

    @GetMapping("/tank")
    public String tank(){
        return "init/tankLimit";
    }

    @GetMapping("/plan")
    public String plan(){
        return "init/planOperate";
    }

    @GetMapping("/logout")
    public String logout(){
    return "index";
    }

}
