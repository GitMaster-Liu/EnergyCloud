package com.iail.energycloud.entity.bgmx.PredictItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PredictItemEntity {
    private String id;
    private String itemNo;
    private String itemName;
    private Integer predictLength;
    private Integer granularity;
    private Integer status;
    private Integer isFuse;
    private Integer predictPhase;
    private Integer workChecked;
    private String calTypeName;
    private String itemTypeName;
    private String itemClassType;
    private String assemblyName;
    private String tableName;
    private String modelNo;
    private String modelName;
    private String arithId;
    private Integer trainSampLength;
    private Integer predictSampLength;
    private Integer isOnlineTrain;
    private String modelPath;
    private Integer isNormal;
    private Integer normalMax;
    private Integer normalMin;
    private Integer status1;
}
