package com.iail.energycloud.service.impl;

import com.iail.energycloud.entity.bgmx.ScheduleParamEntity;
import com.iail.energycloud.mapper.bgmx.PlanOperateMapper;
import com.iail.energycloud.mapper.bgmx.ScheduleParamMapper;
import com.iail.energycloud.service.ScheduleParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class ScheduleParamServiceImpl implements ScheduleParamService {
    @Autowired
    ScheduleParamMapper scheduleParamMapper;

    @Override
    public List<ScheduleParamEntity> selectSchedule() {
        return scheduleParamMapper.selectSchedule();
    }

    @Override
    public void insertSchedule(Integer order,String varName,Integer lowLimit,Integer highLimit,String group,String unit){
        String id = randomUUID().toString();
        scheduleParamMapper.insertSchedule(id, order, varName, lowLimit, highLimit, group, unit);
    }

    @Override
    public void deleteSchedule(String id){
        scheduleParamMapper.deleteSchedule(id);
    }
}
