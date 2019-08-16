package com.iail.energycloud.entity.bgmx;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlanOperateEntity {
    private String id;
    private String systemName;
    private String objectName;
    private String operation;
    private Integer objectTag;
    private Integer systemTag;
}
