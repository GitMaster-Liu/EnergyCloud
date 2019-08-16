package com.iail.energycloud.service;

import com.iail.energycloud.entity.bgmx.PredictItem.ArithEntity;
import com.iail.energycloud.entity.bgmx.PredictItem.PredictItemEntity;

import java.util.List;

public interface PredictItemService {
    public List<PredictItemEntity> selectPredictItem();
    public void insertPredict(String itemNo,String itemName,String calTypeId,String itemTypeId,Integer predictLength,Integer granularity,
                              Integer status,Integer isFuse,Integer predictPhase,Integer workChecked,Integer unitTransfactor);
    public List<ArithEntity> selectArith();
}
