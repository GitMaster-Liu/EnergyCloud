package com.iail.energycloud.service;

import com.iail.energycloud.entity.bgmx.ScheduleParamEntity;

import java.util.List;

public interface ScheduleParamService {
    public List<ScheduleParamEntity> selectSchedule();
    public void insertSchedule(Integer order,String varName,Integer lowLimit,Integer highLimit,String group,String unit);
    public void deleteSchedule(String id);
}
