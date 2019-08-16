package com.iail.energycloud.entity.bgmx;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DmModuleEntity {
    private String id;
    private String moduleName;
    private String moduleType;
    private Integer cycle;
    private String moduleNavConfig;
    private Date predictTime;
}
