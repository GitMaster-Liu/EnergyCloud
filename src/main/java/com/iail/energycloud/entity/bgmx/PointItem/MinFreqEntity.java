package com.iail.energycloud.entity.bgmx.PointItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MinFreqEntity {
    private String id;
    private String minFreqName;
    private String minFreqNo;
    private String descp;
}
