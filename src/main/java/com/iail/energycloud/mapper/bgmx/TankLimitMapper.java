package com.iail.energycloud.mapper.bgmx;

import com.iail.energycloud.entity.bgmx.TankLimitEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TankLimitMapper {
    public List<TankLimitEntity> selectTankLimit();
    public void insertTankLimit(@Param("id")String id, @Param("itemName")String itemName, @Param("hhLimit")Integer hhLimit, @Param("hLimit")Integer hLimit, @Param("lLimit")Integer lLimit,
                                @Param("llLimit")Integer llLimit, @Param("dsp")Integer dsp);
    public void deleteTankLimit(String id);
}
