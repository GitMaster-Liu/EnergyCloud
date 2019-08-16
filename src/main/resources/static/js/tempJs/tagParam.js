$('#tag_point_add_btn').on('click', function () {
    buttonStatusExchanged();
});
//查询采集点id
$('#query_point_btn').on('click', function () {
    var pointToTag = $('#tagName').val();
    if (pointToTag == "") {
        pointToTag = null;
    } else {


    }

    PointQuery.init(tagParamInit.setPointDetails);
    PointQuery.queryPoint(pointToTag);

});

// 模型配置页面跳转
$("#model_forward_btn").on('click', function () {
    window.location.href = location.origin + "/rule";
});
////确认查询采集点的结果
//$("#point_to_tag_btn").on('click', function () {
//    var selectedRow = $(opts.el.pointTable).bootstrapTable('getSelections');
//        if (selectedRow.length == 0 || selectedRow.length > 1) {
//            alert("请选择一行");
//            //swal({

//            //})
//            return;
//        }
//    $(opts.elInst.tagName).val(selectedRow[0].pointName);
//    //console.log($(opts.elInst.tagName).val());
//    //$(opts.elInst.pointTypeClasafy).val(selectedRow[0].pointTypeId);
//    //console.log($(opts.elInst.pointTypeClasafy).val());

//    $(opts.elInst.pointNo).val(selectedRow[0].pointNo);
//    $("#tagNo").val(selectedRow[0].tagNo);
//    //console.log(selectedRow[0].pointNo, $(opts.elInst.pointNo).val());

//    $("#point_search_modal").modal("hide");
//})


//变量类型转换
//$("#ruleVarClassfy").on('change', function () {
//    console.log($(this));
//    if ($(this).value != null) {
//        $("#rule_var_group_div").show();

//    } else {
//        $("#rule_var_group_div").hide();
//    }
//})
//删除tag点
$('#tag_point_del_btn').on('click', function () {
    alert("确认删除？");
    var selectedRow = $('#tag_param_table').bootstrapTable('getSelections');
    console.log(selectedRow);
    for(var i=0;i<selectedRow.length;i++){
        var data={
            "id": selectedRow[i].id,
            "tagName": selectedRow[i].tagName
        };
        deletePoint(data);
    }
});






//表单提交
$('#form_submit_btn').on('click', function () {
    var submitData = [];
    var object = formData();
    console.log(object);
    submitData.push(object);
    console.log(submitData);
    submitTag(submitData[0]);
});

//返回
$('#back_btn').on('click', function () {
    buttonStatusExchanged();
});

//下一页
$('#next_page_btn').on('click', function () {
    window.location.href = location.origin+"/schedule";
});

//返回上一页
$('#back_page_btn').on('click', function () {
    window.location.href = location.origin+"/predict";
});

//初始化表单数据
$.ajax({
    type: "GET",
    url: "/tag/select",
    dataType: "json",
    async: true,
    data: {},
    success: function (tagTableData) {
        tagParamTableInit(tagTableData);
    },
    error: function(){
        console.log("变量配置查询失败");
    }
});

var tagParamTableInit = function (tagTableData) {
    $('#tag_param_table').bootstrapTable('load', tagTableData);
    $('#tag_param_table').bootstrapTable({
        toolbar:"#toolbar",
        data: tagTableData,
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        //queryParams: oTableInit.queryParams,//传递参数（*）
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        //strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        //showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数

        detailView: false,                   //是否显示父子表
        columns: [
            {
                checkbox: true,
                //field: '',
                //title: '序号',
                width: 57

            },
            {
                field: '',
                title: '序号',
                width: 40,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            //{
            //    field: 'id',
            //    title: 'ID',
            //    //formatter: timeFormatter
            //},
            {
                field: 'tagName',
                title: '预测项名'
                //formatter: timeFormatter
            },
            {
                field: 'tag',
                title: '编号'
            },
            {
                field: 'groupName',
                title: '组别'
            },
            {
                field: 'pointNo',
                title: '采集点编号'
            },
            {
                field: 'unit',
                title: '单位'
            },
            {
                field: 'isCollect',
                title: '收集'
            },
            {
                field: 'selfDef',
                title: '自定义'
            },
            {
                field: 'hLimit',
                title: '上限'
            },
            {
                field: 'lLimit',
                title: '下限'
            }

        ]
    });
};
var setPointDetails = function (selectedRow) {
    console.log(selectedRow);
    $('#tagName').val(selectedRow[0].pointName);
    $('#pointNo').val(selectedRow[0].pointNo);
    $("#tagNo").val(selectedRow[0].tagNo);
};


//提交添加数据
var submitTag = function (submitData) {
    $.ajax({
        type: "POST",
        url: "/tag/insert",
        dataType: "json",
        async: true,
        data: submitData,
        success: function () {
            buttonStatusExchanged();
            console.log("数据点添加成功");
        },
        error: function(){
            console.log("数据点添加接口出错");
        }
    })
};
//tag删除
var deletePoint = function (data) {
    $.ajax({
        type: "POST",
        url: "/tag/delete",
        dataType: "json",
        async: true,
        data: data,
        success: function () {
            $.ajax({
                type: "GET",
                url: "/tag/select",
                dataType: "json",
                async: true,
                data: {},
                success: function (tagTableData) {
                    $('#tag_param_table').bootstrapTable('load', tagTableData);
                },
                error: function(){
                    console.log("变量配置查询失败");
                }
            });
            console.log("数据点删除成功");
        },
        error: function(){
            console.log("数据点删除接口出错");
        }
    });
};
// 页面底部button切换
var buttonStatusExchanged = function () {
    $('#tag_edit_form_show').toggle();
    $('#tag_point_table_show').toggle();
    $("#foot_tag").toggle();
    $("#back_page_btn").toggle();
    $("#next_page_btn").toggle();
};
//表单数据
var formData = function () {
    var tag = $("#tagNo").val();
    var ruleVarClassfy = $("#ruleVarClassfy").val();
    if (ruleVarClassfy == "") {
        ruleVarClassfy = null;
    }
    var tagName = $("#tagName").val();
    var pointTypeClasafy = null;
    var pointNo = $("#pointNo").val();;
    var tag_classfy = $("#tag_classfy").val();
    //var is_collect = parseInt($("#is_collect").val());

    var max = parseInt($("#max").val());
    var min = parseInt($("#min").val());
    var unit = $("#unit").val();
    if (unit == "") {
        unit = null;
    }
    var storeTypeClassfy = null;
    var ruleVarGroupClassfy = null;
    if (max == "") {
        max = null;
    }
    if (min == "") {
        min = null;
    }
    var pointTypeId = $("#pointTypeId").val();
    var storeTypeId = $("#storeTypeId").val();
    var ruleBaseId = $("#ruleBaseId").val();
    //if (opts.data.selfDef == 0) {
    //    pointTypeClasafy = $("#pointTypeClasafy").val();
    //    pointNo = $("#pointNo").val();
    //    storeTypeClassfy = $("#storeTypeClassfy").val();
    //    if (tag_classfy != "SL") {
    //        ruleVarGroupClassfy = tag_classfy;
    //    } else {
    //        ruleVarGroupClassfy = "联合";
    //    }

    //} else {
    //    storeTypeClassfy = $("#storeTypeClassfy").val();
    //    ruleVarGroupClassfy = $("#rule_var_classfy").val();
    //}
    //if()

//是否为自定义 0非自定义，1是自定义
    var selfDef = 1;
    $('#isSelfDef').on('click', 'input[name=selfRadios]', function () {
        if ($(this)[0].value == "1") {
            //$("#store_div").show();
            //$(opts.el.pointMsg).hide();
            ////$(opts.el.storeDiv).show();
            //$(opts.el.queryBtn).attr('disabled', true);
            selfDef = 1;
            //$("#rule_var_group_div").show();
        } else {
            //$("#store_div").hide();
            //$(opts.el.pointMsg).show();
            ////$(opts.el.storeDiv).hide();
            //$(opts.el.queryBtn).attr('disabled', false);
            selfDef = 0;
            //$("#rule_var_group_div").hide();
        }
    });
    var object = {
        "tag": tag,
        "tagName": tagName,
        "groupName": tag_classfy,
        //"varGroupName": null,
        "isCollect": 1,
        "hLimit": max,
        "lLimit": min,
        "unit": unit,
        "selfDef": selfDef,
        "pointNo": pointNo,
        "pointTypeId": pointTypeId,
        "storeTypeId": storeTypeId,
        "ruleBaseId": ruleBaseId,
        "variableTypeId": ruleVarClassfy,
        "varOrder": 0,
        "memberShipId": '8ae37813-15fd-4c17-ac4e-01110e05a62a'
        //"entityState": 1


    };
    return object;
};
