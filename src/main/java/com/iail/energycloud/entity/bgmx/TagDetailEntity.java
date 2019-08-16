package com.iail.energycloud.entity.bgmx;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TagDetailEntity {
    private String id;
    private String tag;
    private String tagName;
    private String groupName;
    private String pointNo;
    private String unit;
    private Integer isCollect;
    private Float hLimit;
    private Float lLimit;
    private Integer selfDef;
    private String ruleId;
    private String typeName;
    private String name;
    private Integer frequency;
}
