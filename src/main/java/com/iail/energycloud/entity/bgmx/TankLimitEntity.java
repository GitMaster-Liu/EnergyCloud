package com.iail.energycloud.entity.bgmx;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TankLimitEntity {
    private String id;
    private String itemName;
    private Integer hhLimit;
    private Integer hLimit;
    private Integer lLimit;
    private Integer llLimit;
    private Integer dsp;
}
