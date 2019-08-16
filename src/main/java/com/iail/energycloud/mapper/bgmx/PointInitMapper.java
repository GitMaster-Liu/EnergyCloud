package com.iail.energycloud.mapper.bgmx;

import com.iail.energycloud.entity.bgmx.PointItem.MinFreqEntity;
import com.iail.energycloud.entity.bgmx.PointItem.PointInitEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PointInitMapper {
    public List<PointInitEntity> selectPoint();
    public List<MinFreqEntity> selectMinFreq();
    public String selectTypeId(@Param("pointTypeNo")Integer pointTypeNo);
    public String selectFreqId(@Param("minFreqNo")Integer minFreqNo);
    public String selectStoreId(@Param("storeTypeNo")String storeTypeNo);
    public void insertPoint(@Param("id")String id,@Param("pointTypeId")String pointTypeId,
                            @Param("minFreqId")String minFreqId,@Param("storeTypeId")String storetypeid,
                            @Param("pointName")String pointName,@Param("pointNo")String pointNo,@Param("unit")String unit,@Param("dimension")Integer dimension,
                            @Param("descp")String descp,@Param("maxValue")Float maxValue,@Param("minValue")Float minValue,
                            @Param("logicMax")Float logicMax,@Param("logicMin")Float logicMin,@Param("defaultValue")Float defaultValue,@Param("unitTransfactor")Integer unitTransfactor);
    public void deletePoint(String id);
}
