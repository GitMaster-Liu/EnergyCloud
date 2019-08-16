package com.iail.energycloud.mapper.bgmx;

import com.iail.energycloud.entity.bgmx.PlanOperateEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PlanOperateMapper {
    public List<PlanOperateEntity> selectPlan();
    public void insertPlan(@Param("id")String id,@Param("systemName")String systemName,
                           @Param("objectName")String objectName,@Param("operation")String operation,
                           @Param("objectTag")Integer objectTag,@Param("systemTag")Integer systemTag);
    public void deletePlan(String id);
}
