package com.iail.energycloud.mapper.bgmx;

import com.iail.energycloud.entity.bgmx.TagDetailEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TagDetailMapper {
    public List<TagDetailEntity> selectTagDetail();
    public void insertTagDetail(@Param("id")String id,@Param("tag")String tag,@Param("tagName")String tagName,@Param("groupName")String groupName,
                                @Param("isCollect")Integer isCollect,@Param("unit")String unit,@Param("pointNo")String pointNo,@Param("pointTypeId")String pointTypeId,
                                @Param("storeTypeId")String storeTypeId,@Param("hLimit")Integer hLimit,@Param("lLimit")Integer lLimit,@Param("selfDef")Integer selfDef);
    public void insertVariable(@Param("id")String id,@Param("ruleBaseId")String ruleBaseId,@Param("variableTypeId")String variableTypeId,@Param("tagName")String tagName,
                               @Param("varOrder")Integer varOrder,@Param("memberShipId")String memberShipId);
    public void deleteTagDetail(String id);
    public void deleteVariable(String tagName);
}
