package com.iail.energycloud.controller;

import com.iail.energycloud.entity.bgmx.PointItem.MinFreqEntity;
import com.iail.energycloud.entity.bgmx.PointItem.PointInitEntity;
import com.iail.energycloud.service.PointInitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class PointController {

    @Autowired
    PointInitService pointInitService;

    @GetMapping("/point/select")
    public List<PointInitEntity> getPoint(){
        return pointInitService.getPoint();
    }

    @GetMapping("/minFreq/select")
    public List<MinFreqEntity> selectMinFreq(){
        return pointInitService.selectMinFreq();
    }

    @PostMapping("/point/insert")
    public String insertPoint(@RequestParam("pointTypeId")String pointTypeId, @RequestParam("minFreqId")String minFreqId,
                            @RequestParam("storeTypeId")String storeTypeId,@RequestParam("pointName")String pointName, @RequestParam("pointNo")String pointNo,
                            @RequestParam("unit")String unit,
                            @RequestParam("descp")String descp, @RequestParam("maxValue")Float maxValue, @RequestParam("minValue")Float minValue,
                            @RequestParam("logicMax")Float logicMax, @RequestParam("logicMin")Float logicMin,
                            @RequestParam("defaultValue")Float defaultValue){
        pointInitService.insertPoint(pointTypeId, minFreqId, storeTypeId, pointName, pointNo, unit,
                 descp, maxValue, minValue, logicMax, logicMin, defaultValue);
        return "200";
    }

    @PostMapping("/point/delete")
    public String deletePoint(@RequestParam("id")String id){
        pointInitService.deletePoint(id);
        return "200";
    }

    @GetMapping("/point/template")
    @ResponseBody
    public String tempPoint(HttpServletResponse response) throws IOException {
        pointInitService.tempPoint(response);
        return null;
    }

    @GetMapping("/point/import")
    @ResponseBody
    public String importPoint(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {
        pointInitService.importPoint(request, file);
        return null;
    }
}
