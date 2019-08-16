package com.iail.energycloud.controller;

import com.iail.energycloud.entity.bgmx.TagDetailEntity;
import com.iail.energycloud.service.TagDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController {

    @Autowired
    public TagDetailService tagDetailService;

    @GetMapping("/tag/select")
    public List<TagDetailEntity> getTagDetail(){
        return tagDetailService.selectTagDetail();
    }

    @PostMapping("/tag/insert")
    public String insertTag(@RequestParam("tag")String tag,@RequestParam("tagName")String tagName,@RequestParam("groupName")String groupName,
                            @RequestParam("isCollect")Integer isCollect,@RequestParam("unit")String unit,@RequestParam("pointNo")String pointNo,@RequestParam("pointTypeId")String pointTypeId,
                            @RequestParam("storeTypeId")String storeTypeId,@RequestParam("hLimit")Integer hLimit,@RequestParam("lLimit")Integer lLimit,@RequestParam("selfDef")Integer selfDef,
                            @RequestParam("ruleBaseId")String ruleBaseId,@RequestParam("variableTypeId")String variableTypeId,
                            @RequestParam("varOrder")Integer varOrder,@RequestParam("memberShipId")String memberShipId){
        tagDetailService.insertTag(tag, tagName, groupName,
                 isCollect, unit, pointNo, pointTypeId,
                 storeTypeId, hLimit, lLimit, selfDef,
                 ruleBaseId, variableTypeId, varOrder, memberShipId);
        return "200";
    }

    @PostMapping("/tag/delete")
    public String insertTag(@RequestParam("id")String id,@RequestParam("tagName")String tagName){
        tagDetailService.deleteTag(id, tagName);
        return "200";
    }
}
