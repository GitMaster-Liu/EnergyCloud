package com.iail.energycloud.service.impl;

import com.iail.energycloud.entity.bgmx.TagDetailEntity;
import com.iail.energycloud.mapper.bgmx.TagDetailMapper;
import com.iail.energycloud.service.TagDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class TagDetailServiceImpl implements TagDetailService {

    @Autowired
    TagDetailMapper tagDetailMapper;

    @Override
    public List<TagDetailEntity> selectTagDetail(){
        return tagDetailMapper.selectTagDetail();
    }

    @Override
    public void insertTag(String tag,String tagName,String groupName,
                                Integer isCollect,String unit,String pointNo,String pointTypeId,
                                String storeTypeId,Integer hLimit,Integer lLimit,Integer selfDef,
                                String ruleBaseId,String variableTypeId,Integer varOrder,String memberShipId){
        String id1 = randomUUID().toString();
        String id2 = randomUUID().toString();
        tagDetailMapper.insertTagDetail(id1, tag, tagName, groupName,
                isCollect, unit, pointNo, pointTypeId,
                storeTypeId, hLimit, lLimit, selfDef);
        tagDetailMapper.insertVariable(id2, ruleBaseId, variableTypeId, tagName,
                varOrder, memberShipId);
    }

    @Override
    public void deleteTag(String id,String tagName){
        tagDetailMapper.deleteTagDetail(id);
        tagDetailMapper.deleteVariable(tagName);
    }
}
