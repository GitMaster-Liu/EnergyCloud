package com.iail.energycloud.service.impl;

import com.iail.energycloud.entity.bgmx.PredictItem.ArithEntity;
import com.iail.energycloud.entity.bgmx.PredictItem.PredictItemEntity;
import com.iail.energycloud.mapper.bgmx.PredictItemMapper;
import com.iail.energycloud.service.PredictItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class PredictItemServiceImpl implements PredictItemService {

    @Autowired
    PredictItemMapper predictItemMapper;

    @Override
    public List<PredictItemEntity> selectPredictItem(){
        return predictItemMapper.selectPredictItem();
    }

    @Override
    public void insertPredict(String itemNo,String itemName,String calTypeId,String itemTypeId,Integer predictLength,Integer granularity,
                              Integer status,Integer isFuse,Integer predictPhase,Integer workChecked,Integer unitTransfactor){
        String id = randomUUID().toString();
        predictItemMapper.insertPredict(id, itemNo, itemName, calTypeId, itemTypeId, predictLength, granularity,
                 status, isFuse, predictPhase, workChecked, unitTransfactor);
    }

    @Override
    public List<ArithEntity> selectArith(){
        return predictItemMapper.selectArith();
    }
}
