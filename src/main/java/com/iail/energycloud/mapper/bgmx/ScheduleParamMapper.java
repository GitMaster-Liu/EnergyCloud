package com.iail.energycloud.mapper.bgmx;

import com.iail.energycloud.entity.bgmx.ScheduleParamEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ScheduleParamMapper {
    public List<ScheduleParamEntity> selectSchedule();
    public void insertSchedule(@Param("id")String id, @Param("order")Integer order, @Param("varName")String varName, @Param("lowLimit")Integer lowLimit,
                               @Param("highLimit")Integer highLimit, @Param("group")String group, @Param("unit")String unit);
    public void deleteSchedule(String id);
}
