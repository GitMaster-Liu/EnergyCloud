package com.iail.energycloud.service.impl;

import com.iail.energycloud.entity.bgmx.PlanOperateEntity;
import com.iail.energycloud.mapper.bgmx.PlanOperateMapper;
import com.iail.energycloud.service.PlanOperateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class PlanOperateServiceImpl implements PlanOperateService {

    @Autowired
    PlanOperateMapper planOperateMapper;

    @Override
    public List<PlanOperateEntity> selectPlan() {
        return planOperateMapper.selectPlan();
    }

    @Override
    public void insertPlan(String systemName, String objectName, String operation, Integer objectTag, Integer systemTag) {
        String id = randomUUID().toString();
        planOperateMapper.insertPlan(id,systemName,objectName,operation,objectTag,systemTag);
    }

    @Override
    public void deletePlan(String id) {
        planOperateMapper.deletePlan(id);
    }
}
