package com.iail.energycloud.service.impl;

import com.iail.energycloud.entity.bgmx.DmModuleEntity;
import com.iail.energycloud.mapper.bgmx.DmModuleMapper;
import com.iail.energycloud.service.DmModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class DmModuleServiceImpl implements DmModuleService {
    @Autowired
    DmModuleMapper dmModuleMapper;

    @Override
    public List<DmModuleEntity> getModule(){
        return dmModuleMapper.selectModule();
    }

    @Override
    public void insertModule(String moduleName, String moduleType, Integer cycle){
        String id = randomUUID().toString();
        String moduleNavConfig = null;//暂时写为空
        Date ts = new Date();
        SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String time = dateFormat.format(ts);
        Timestamp predictTime = Timestamp.valueOf(time);
        dmModuleMapper.insertModule(id,moduleName,moduleType,cycle,moduleNavConfig,predictTime);
    }

    @Override
    public void updateModule(String id, String moduleName, String moduleType, Integer cycle){
        String moduleNavConfig = null;//暂时写为空
        Date ts = new Date();
        SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String time = dateFormat.format(ts);
        Timestamp predictTime = Timestamp.valueOf(time);
        dmModuleMapper.updateModule(id,moduleName,moduleType,cycle,moduleNavConfig,predictTime);
    }

    @Override
    public void deleteModule(String id){
        dmModuleMapper.deleteModule(id);
    }

    @Override
    public void tempModule(){

    }
}
