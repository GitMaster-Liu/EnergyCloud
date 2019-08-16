package com.iail.energycloud.service.impl;

import ch.qos.logback.core.util.FileUtil;
import com.iail.energycloud.entity.bgmx.PointItem.MinFreqEntity;
import com.iail.energycloud.entity.bgmx.PointItem.PointInitEntity;
import com.iail.energycloud.mapper.bgmx.PointInitMapper;
import com.iail.energycloud.service.PointInitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class PointInitServiceImpl implements PointInitService {
    @Autowired
    PointInitMapper pointInitMapper;

    @Override
    public List<PointInitEntity> getPoint(){
        return pointInitMapper.selectPoint();
    }

    @Override
    public List<MinFreqEntity> selectMinFreq(){
        return pointInitMapper.selectMinFreq();
    }

    @Override
    public void insertPoint(String pointTypeId,String minFreqId,String storeTypeId,String pointName,String pointNo,String unit,
                            String descp,Float maxValue,Float minValue,Float logicMax,Float logicMin,Float defaultValue){
//        String pointTypeId = pointInitMapper.selectTypeId(pointTypeNo);
//        String minFreqId = pointInitMapper.selectFreqId(minFreqNo);
//        String storeTypeId = pointInitMapper.selectStoreId(storeTypeNo);
        String id = randomUUID().toString();
        Integer dimension = 1;//暂时写为1
        Integer unitTransfactor = 1;//暂时写为1
        pointInitMapper.insertPoint(id,pointTypeId,minFreqId,storeTypeId,pointName,pointNo,unit,dimension,descp,maxValue,minValue,
                                    logicMax,logicMin,defaultValue,unitTransfactor);
    }

    @Override
    public void deletePoint(String id){
        pointInitMapper.deletePoint(id);
    }

    @Override
    public void tempPoint(HttpServletResponse response) throws IOException {
        String path = "D:\\工程\\energycloud\\src\\main\\resources\\static\\xlsx\\CollectionPoints.xlsx";
        File f = new File(path);
        if (!f.exists()) {
            response.sendError(404, "File not found!");
            return;
        }
        String fileName = f.getName();
        fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

        BufferedInputStream br = new BufferedInputStream(new FileInputStream(f));
        byte[] buf = new byte[1024];
        int len = 0;
        response.reset(); // 非常重要
        response.setContentType("application/msexcel");// 设置生成的文件类型
        response.setCharacterEncoding("UTF-8");// 设置文件头编码方式和文件名
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        OutputStream out = response.getOutputStream();
        while ((len = br.read(buf)) > 0)
            out.write(buf, 0, len);
        br.close();
        out.close();
    }

    @Override
    public void importPoint(HttpServletRequest request, MultipartFile file){
        String fileName = file.getOriginalFilename();
        String filePath = request.getSession().getServletContext().getRealPath("upload/");
        try {
            //发送文件到指定路径
            uploadFile(file.getBytes(), filePath, fileName);

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();

        }
    }

    public static void uploadFile(byte[] file, String filePath, String fileName) throws Exception{

        File targetFile = new File(filePath);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        FileOutputStream out = new FileOutputStream(filePath+fileName);
        out.write(file);
        out.flush();
        out.close();
    }
}
