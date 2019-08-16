package com.iail.energycloud.mapper.bgmx;

import com.iail.energycloud.entity.bgmx.PredictItem.ArithEntity;
import com.iail.energycloud.entity.bgmx.PredictItem.PredictItemEntity;

import java.util.List;

public interface PredictItemMapper {
    public List<PredictItemEntity> selectPredictItem();
    public void insertPredict(String id,String itemNo,String itemName,String calTypeId,String itemTypeId,Integer predictLength,Integer granularity,
            Integer status,Integer isFuse,Integer predictPhase,Integer workChecked,Integer unitTransfactor);
    public List<ArithEntity> selectArith();
}
