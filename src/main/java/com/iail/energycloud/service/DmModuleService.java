package com.iail.energycloud.service;

import com.iail.energycloud.entity.bgmx.DmModuleEntity;
import com.sun.tracing.dtrace.ModuleName;

import java.util.Date;
import java.util.List;

public interface DmModuleService {
    public List<DmModuleEntity> getModule();
    public void insertModule(String moduleName, String moduleType, Integer cycle);
    public void updateModule(String id, String moduleName, String moduleType, Integer cycle);
    public void deleteModule(String id);
    public void tempModule();
}
