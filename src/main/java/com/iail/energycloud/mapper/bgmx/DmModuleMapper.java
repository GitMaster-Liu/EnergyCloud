package com.iail.energycloud.mapper.bgmx;

import com.iail.energycloud.entity.bgmx.DmModuleEntity;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface DmModuleMapper {
    public List<DmModuleEntity> selectModule();
    public void insertModule(@Param("id")String id, @Param("moduleName")String moduleName, @Param("moduleType")String moduleType,
                             @Param("cycle")Integer cycle, @Param("moduleNavConfig")String moduleNavConfig, @Param("predictTime")Date predictTime);
    public void updateModule(@Param("id")String id, @Param("moduleName")String moduleName, @Param("moduleType")String moduleType,
                             @Param("cycle")Integer cycle, @Param("moduleNavConfig")String moduleNavConfig, @Param("predictTime")Date predictTime);
    public void deleteModule(String id);
}
