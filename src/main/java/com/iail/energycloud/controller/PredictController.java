package com.iail.energycloud.controller;

import com.iail.energycloud.entity.bgmx.PredictItem.ArithEntity;
import com.iail.energycloud.entity.bgmx.PredictItem.PredictItemEntity;
import com.iail.energycloud.service.PredictItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class PredictController {

    @Autowired
    PredictItemService predictItemService;

    @GetMapping("/predict/select")
    public List<PredictItemEntity> getPredictItem(){
        return predictItemService.selectPredictItem();
    }

    @GetMapping("/predict/arith")
    public List<ArithEntity> getArith(){
        return predictItemService.selectArith();
    }

    @PostMapping("/predict/insert")
    public String insertPredict(@RequestParam("itemNo")String itemNo, @RequestParam("itemName")String itemName, @RequestParam("calTypeId")String calTypeId,
                                @RequestParam("itemTypeId")String itemTypeId, @RequestParam("predictLength")Integer predictLength, @RequestParam("granularity")Integer granularity,
                                @RequestParam("status")Integer status, @RequestParam("isFuse")Integer isFuse, @RequestParam("predictPhase")Integer predictPhase,
                                @RequestParam("workChecked")Integer workChecked, @RequestParam("unitTransfactor")Integer unitTransfactor){
        predictItemService.insertPredict(itemNo, itemName, calTypeId, itemTypeId, predictLength, granularity,
                status, isFuse, predictPhase, workChecked, unitTransfactor);
        long a =123L;
        double b =0.9239d;
        return "200";
    }
}