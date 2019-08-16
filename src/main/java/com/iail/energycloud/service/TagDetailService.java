package com.iail.energycloud.service;

import com.iail.energycloud.entity.bgmx.TagDetailEntity;

import java.util.List;

public interface TagDetailService {
    public List<TagDetailEntity> selectTagDetail();
    public void insertTag(String tag,String tagName,String groupName,
                                Integer isCollect,String unit,String pointNo,String pointTypeId,
                                String storeTypeId,Integer hLimit,Integer lLimit,Integer selfDef,
                                String ruleBaseId,String variableTypeId,Integer varOrder,String memberShipId);
    public void deleteTag(String id,String tagName);
}
