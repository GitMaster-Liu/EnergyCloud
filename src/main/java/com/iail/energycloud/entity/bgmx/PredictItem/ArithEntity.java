package com.iail.energycloud.entity.bgmx.PredictItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArithEntity {
    private String id;
    private String arithName;
    private String arithType;
}
