package com.iail.energycloud.service;

import com.iail.energycloud.entity.bgmx.TankLimitEntity;

import java.util.List;

public interface TankLimitService {
    public List<TankLimitEntity> selectTankLimit();
    public void insertTankLimit(String itemName,Integer hhLimit,Integer hLimit,Integer lLimit,Integer llLimit,Integer dsp);
    public void deleteTankLimit(String id);
}
