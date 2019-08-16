package com.iail.energycloud.entity.bgmx.PointItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointInitEntity {
    private String id;
    private String pointTypeId;
    private String minFreqId;
    private String storeTypeId;
    private String pointName;
    private String pointNo;
    private String unit;
    private Integer dimension;
    private String descp;
    private Float maxValue;
    private Float minValue;
    private Float logicMax;
    private Float logicMin;
    private Float defaultValue;
    private Integer unitTransfactor;
}
