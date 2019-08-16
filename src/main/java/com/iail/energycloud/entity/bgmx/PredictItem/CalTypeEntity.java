package com.iail.energycloud.entity.bgmx.PredictItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalTypeEntity {
    private String id;
    private String calTypeName;
}
