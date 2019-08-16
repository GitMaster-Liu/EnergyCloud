package com.iail.energycloud.service;

import com.iail.energycloud.entity.bgmx.PlanOperateEntity;

import java.util.List;

public interface PlanOperateService {
    public List<PlanOperateEntity> selectPlan();
    public void insertPlan(String systemName,String objectName,String operation,
                           Integer objectTag,Integer systemTag);
    public void deletePlan(String id);
}
