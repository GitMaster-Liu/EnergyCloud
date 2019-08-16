package com.iail.energycloud.entity.bgmx;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleParamEntity {
    private String id;
    private Integer order;
    private String varName;
    private Integer lowLimit;
    private Integer highLimit;
    private String group;
    private String unit;
}
