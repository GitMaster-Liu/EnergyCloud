package com.iail.energycloud.service.impl;

import com.iail.energycloud.entity.bgmx.TankLimitEntity;
import com.iail.energycloud.mapper.bgmx.TankLimitMapper;
import com.iail.energycloud.service.TankLimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class TankLimitServiceImpl implements TankLimitService {

    @Autowired
    TankLimitMapper tankLimitMapper;

    @Override
    public List<TankLimitEntity> selectTankLimit() {
        return tankLimitMapper.selectTankLimit();
    }

    @Override
    public void insertTankLimit(String itemName,Integer hhLimit,Integer hLimit,Integer lLimit,Integer llLimit,Integer dsp){
        String id = randomUUID().toString();
        tankLimitMapper.insertTankLimit(id,itemName,hhLimit,hLimit,lLimit,llLimit,dsp);
    }

    @Override
    public void deleteTankLimit(String id){
        tankLimitMapper.deleteTankLimit(id);
    }
}
