package com.iail.energycloud.service;

import com.iail.energycloud.entity.bgmx.PointItem.MinFreqEntity;
import com.iail.energycloud.entity.bgmx.PointItem.PointInitEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface PointInitService {
    public List<PointInitEntity> getPoint();
    public List<MinFreqEntity> selectMinFreq();
    public void insertPoint(String pointTypeId,String minFreqId,String storeTypeId,String pointName,String pointNo,String unit,
                            String descp,Float maxValue,Float minValue,Float logicMax,Float logicMin,Float defaultValue);
    public void deletePoint(String id);
    public void tempPoint(HttpServletResponse response) throws IOException;
    public void importPoint(HttpServletRequest request, MultipartFile file);
}
