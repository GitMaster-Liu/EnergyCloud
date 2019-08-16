package com.iail.energycloud.entity.bgmx.PredictItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemTypeEntity {
    private String id;
    private String itemTypeName;
    private String itemClassType;
    private String assemblyName;
}
