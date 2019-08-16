$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/predict/select",
        dataType: "json",
        async: true,
        data:{},
        success: function (predictData) {
            console.log(predictData);
            predictItemTableInit(predictData);
        },
        error: function(){
            console.log("管网查询数据接口出错");
        }
    })
});

//查询预测项
$.ajax({
    type: "GET",
    url: "/point/select",
    dataType: "json",
    async: true,
    data:{},
    success: function (pointData) {
        console.log(pointData);
        $("#point_search_modal").modal("show");
        pointTableInit(pointData);
    },
    error: function(){
        console.log("查询数据接口出错");
    }
});
//查询采集点
var pointTableInit = function (pointData) {
    $("#point_table").bootstrapTable('load', pointData);
    $("#point_table").bootstrapTable({
        data: pointData,
        //toolbar: opts.el.toolbar,
        //striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        //sortOrder: "asc",                   //排序方式
        //queryParams: oTableInit.queryParams,//传递参数（*）
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        //pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        //strictSearch: true,
        //showColumns: true,                  //是否显示所有的列
        //showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数

        detailView: false,                   //是否显示父子表
        columns: [
            {
                checkbox: true
                //title: '序号',
                //width: 40,

            },
            {
                //field: '',
                title: '序号',
                width: 40,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'pointName',
                title: '采集点名',
                //formatter: timeFormatter
            }, {
                field: 'pointNo',
                title: '编号'
            },
            {
                field: 'logicMax',
                title: '逻辑上限'
            },
            {
                field: 'logicMin',
                title: '逻辑下限'
            },
            {
                field: 'maxValue',
                title: '最大值'

            },
            {
                field: 'minValue',
                title: '最小值'
            },
            {
                field: 'unit',
                title: '单位'
            },

        ]
    });
}
//预测项作为模型参数保存的结果
$('#model_params_checked_btn').on('click', function () {
    var modelParams = $("#predict_query_table").bootstraps('getSelection');
    if (modelParams.length == 0) {
        toastr.warning("请选择模型参数");
        //alert('请选择模型参数');
        return;
    }
    modalParamShow(modelParams);
    $("#model_params_details_modal").modal('hide');
});

//删除预测点
$('#predict_model_del_btn').on('click', function () {
    alert("确认删除？");
    var selectedRow = $('#predict_query_model_param').bootstrapTable('getSelections');
    if (selectedRow.length == 0) {
        toastr.warning("请选择一行");

    }
    console.log(removeDate(selectedRow));
    deletePoint(removeDate(selectedRow));
});

$("#predict_item_classfy").on('change', function () {
    var predict_item_classfy = $("#predict_item_classfy").val();
    console.log(predict_item_classfy);
    if (predict_item_classfy == "MergeItem") {
        $("#merged_params_form").css('display', 'block');
    } else {
        $("#merged_params_form").css('display', 'none');
    }

});



modelPanelNumber = 0;
// 添加模型
$("#model_Add_Btn").on('click', function () {
    modelPanelNumber +=1;
    addModel(modelPanelNumber);
});
// 增加模型的form
var addModel = function (Number) {
    var div = "";
    div += '<div class="hr-line-dashed"> </div>'
        + '<form class="form-horizontal"name="modelPanel' + Number + '"><div class="form-group">'
        + '<label class="col-lg-2 col-lg-pull-1 control-label">模型编号:</label>'
        + '<div class="col-lg-4 col-lg-pull-1">'
        + '<input type="text" class="form-control "  name="model_no" placeholder="ELE01">'
        + '</div>'
        + '<label class="col-lg-2 col-lg-pull-1 control-label">模型名称:</label>'
        + '<div class="col-lg-4 col-lg-pull-1">'
        + '<input type="text" class="form-control " name="model_name" placeholder="超短期预测0NN模型">'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-lg-2 col-lg-pull-1 control-label">预测算法:</label>'
        + '<div class="col-lg-4 col-lg-pull-1" id="">'
        + '<select class="form-control" id=""name="arith_classfy"></select>'
        + '</div>'
        + '<label class="col-lg-2 col-lg-pull-1 control-label">是否在线训练:</label>'
        + '<div class="col-lg-4 col-lg-pull-1" name="online_training">'
        + '<div class="col-sm-2">'
        + '<label>'
        + '<input type="radio" value="1" id="" name="onlineRadios">是'
        + '</label>'
        + '</div>'
        + '<div class="col-sm-2">'
        + '<label>'
        + '<input type="radio" value="0" id="" name="onlineRadios">否'
        + '</label>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="form-group" name="arith_details" style="display:none;border-top:1px dashed #e7eaec;border-bottom:1px dashed #e7eaec;margin-left: 0px;margin-right: 0px;padding-top: 15px">'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-lg-2 col-lg-pull-1 control-label">训练样本长度:</label>'
        + '<div class="col-lg-4 col-lg-pull-1">'
        + '<input type="number" class="form-control " name="traning_samp_length" value="30"  placeholder="">'
        + '</div>'
        + '<label class="col-lg-2 col-lg-pull-1 control-label">预测样本长度:</label>'
        + '<div class="col-lg-4 col-lg-pull-1">'
        + '<input type="number" class="form-control " name="predict_samp_length" value="30"  placeholder="">'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-lg-2 col-lg-pull-1 control-label">模型路径:</label>'
        + '<div class="col-lg-4 col-lg-pull-1">'
        + '<input type="text" class="form-control " name="model_path"  placeholder="">'
        + '</div>'
        + '</div>'
        + '<div class="form-group" style="margin-bottom: 0px;">'
        + '<label class="col-lg-1 control-label ">参数添加</label>'
        + '<div class="col-lg-2 ">'
        + '<button type="button" class="btn btn-default" name="params_add_btn">'
        + '<i class="fa fa-plus"></i>'
        + '</button>'
        + '<button type="button" class="btn btn-default" name="params_del_btn">'
        + '<i class="fa fa-minus"></i>'
        + '</button>'
        + '</div>'
        + '</div>'
        + '</form>'
    $("#model_template").append(div);
    getArithParam($("#model_template").children("form:last-child").find("select[name=arith_classfy]"));
};

// 获取算法
var getArithParam = function (arithNode) {
    abp.service.call({
        serviceFunc: expertService.predictItem.getArith,
        serviceParams: [],
        success: function (response) {
            $(arithNode).empty();
            console.log(response);
            var options = '<option value=""></option>';
            for (var i = 0; i < response.data.length; i++) {
                options += '<option value="' + response.data[i].arithName + '">' + response.data[i].arithName + "--" + response.data[i].arithType + '</option>';
            }
            $(arithNode).append(options);
        },
        successNotify: false//service调用成功后不提示消息

    });
};

// 删除模型
$("#model_Del_Btn").on('click', function () {
    if (modelPanelNumber == -1) {
        return;
    }
    delModel(modelPanelNumber);
    modelPanelNumber -= 1;

});
// 删除模型form
var delModel = function () {
    $("#model_template").children("form:last-child").remove();
};

// 算法切换问题
$("#model_template").on('change', "select[name=arith_classfy]", function () {
    console.log($(this));
    var predictArith = $(this).val();

    if (predictArith == "") {
        $(this).parent().parent().next().hide().empty();

        //$("#arith_details").hide();
        //$("#arith_details").empty();
        return;
    } else {
        //var str = predictArith.split("--");
        getArithParamDefaultValue(predictArith, $(this).parent().parent().next());
    }

});

//表单提交
$('#form_submit_btn').on('click', function () {
    var object = formData();
    console.log(object);
    $.ajax({
        type: "POST",
        url: "/predict/insert",
        dataType: "json",
        async: true,
        data: object,
        success: function () {
            userButtonStatusExchanged();
            console.log("数据点添加成功");
        },
        error: function(){
            console.log("数据点添加接口出错");
        }
    })
});

//表单数据
var formData = function () {

    var point_id = $(opts.elInst.point_id).val();
    if (point_id == "") {

        toastr.warning("请选择采集点");
        //return;
    }
    var itemNo = $("#predict_no").val();
    var predict_item = $(opts.elInst.predict_item).val();
    var predict_item_computer_classfy = null;
    var predict_item_classfy = null;
    var predict_length = null;
    //var predict_freq = null;
    var predict_status = null;


    var user_classfy = null;
    var user_isDisplay = null;
    var user_point = null;

    var self_defined_name = null;
    var output_store = null;

    predict_item_computer_classfy = $("#predict_item_computer_classfy").val();
    predict_item_classfy = $("#predict_item_classfy").val();
    user_net = $("#user_net").val();

    predict_length = $("#predict_length").val();
    if (predict_length == "") {
        predict_length = null;
    } else {
        predict_length = parseInt($("#predict_length").val());
    }

    predict_status = $("#predict_status").val();
    if (predict_status == "") {
        predict_status = null;
    } else {
        predict_status = parseInt($("#predict_status").val());
    }

    self_defined_name = $("#self_defined_name").val();
    if (self_defined_name == "") {
        //alert("请检查自定义输出名称");
        toastr.warning("请检查自定义输出名称");
        //return false;
    }
    output_store = $("#output_store").val();

    user_isDisplay = opts.data.isDisplay;
    if (user_isDisplay == 1) {
        user_classfy = $("#user_classfy").val();
    }
    var itemOrder = $("#prediction_order").val();
    // 融合表达式
    var mergeStatus = 0;
    var mergeExpression = null;

    if (predict_item_classfy == "MergeItem") {
        mergeStatus = 1;
        var length = $("#merged_div").children.length;
        for (var i = 0; i < length; i++) {
            var experssion;
            var experssion = $("#merged_div").children[i].find("input[name=merged_item_number]")[0].value;
            if ($("#merged_div").children[i].find("select[name=operator]")[0].value == "") {

            } else {
                experssion += $("#merged_div").children[i].find("select[name=operator]")[0].value;
            }
            if ($("#merged_div").children[i].find("select[name=number]")[0].value != "") {
                experssion += $("#merged_div").children[i].find("select[name=number]")[0].value;
            }
            if (i != (length - 1)){
                if ($("#merged_div").children[i].find("select[name=other_operator]")[0].value != "") {
                    experssion += $("#merged_div").children[i].find("select[name=other_operator]")[0].value;
                }
            }
            mergeExpression += experssion;
        }
    }

    var templateLength = $("#model_template").find("form").length;
    if (templateLength == 0) {
        toaster.warning("请添加模型");
        //return false;
    }

    var modelArr = [];
    for (var i = 0; i < templateLength; i++) {
        var templateDate;
        //var modelNode = $("#model_template").children("form")[i];
        var modelNode = $("#model_template").find("form");
        console.log(modelNode);
        //console.log();
        //console.log($("#model_template").find("form"));
        var model_name = $("#model_template").find("form")[i].context;
        var predict_model = $("#model_template").find("form").find("select[name=predict_model]")[i].value;
        if (predict_model == "") {
            toastr.warning("请选择算法");
            //alert("请选择算法");
            //return false;
        }
        var arithParamsCount = $("#model_template").find("form").find("div[name=arith_details]").children.length;
        var arith_param_name = [];
        var arith_param_id = [];
        var arith_type = [];
        var arith_value = [];
        for (var j = 0; j < arithParamsCount; j++) {

            arith_param_name.push($("#model_template").children("form")[i].find("div[name=arith_details]").children[j].find("input[name=arith_param_name]")[0].value);
            arith_param_id.push($("#model_template").children("form")[i].find("div[name=arith_details]").children[j].find("input[name=arith_param_id]")[0].value);
            arith_type.push($("#model_template").children("form")[i].find("div[name=arith_details]").children[j].find("input[name=arith_type]")[0].value);
            arith_value.push($("#model_template").children("form")[i].find("div[name=arith_details]").children[j].find("input[name=arith_value]")[0].value);
        }

        var onlineTraining;
        for (var k = 0; k < 2; k++) {
            if ($("#model_template").children("form")[i].find("input[name=onlineRadios]")[i].checked == true) {
                onlineTraining = $("#model_template").children("form")[i].find("input[name=onlineRadios]")[i].value;
            }
        }

        var traning_samp_length = $("#model_template").children("form")[i].find("input[name=traning_samp_length]")[0].value;
        if (traning_samp_length == "") {
            traning_samp_length = null;
        }
        var predict_samp_length = $("#model_template").children("form")[i].find("input[name=predict_samp_length]")[0].value;
        if (predict_samp_length == "") {
            predict_samp_length = null;
        }
        var model_path = $("#model_template").children("form")[i].find("input[name=model_path]")[0].value;
        if (model_path == "") {
            model_path = null;
        }

        var modelParamsLength = $("#model_template").children("form")[i].find("div[name=model_params]").length;
        if (modelParamsLength == 0) {
            toaster.warning("请添加模型参数");
            return false;
        }
        var modelParamsArr = [];
        for (var m = 0; m < modelParamsLength; m++) {
            var modelParams;
            var model_params_classfy = $("#model_template").children("form")[i].find("div[name=model_params]")[i].find("select[name=params_select]")[0].value;
            var singleLength = $("#model_template").children("form")[i].find("div[name=model_params]")[i].next().children.length;
            if (singleLength == 0) {
                toaster.warning("请确认参数");
                return false;
            }
            for (var n = 0; n < singleLength; n++) {
                var modelParams;
                var model_params_name = $("#model_template").children("form")[i].find("div[name=model_params]")[i].next().children[i].find("input[name=model_params_name]")[0].value;
                var model_params_id = $("#model_template").children("form")[i].find("div[name=model_params]")[i].next().children[i].find("input[name=model_params_id]")[0].value;
                //var model_params_order = $("#model_template").children()[i].find("div[name=model_params]")[i].next().children()[i].find("input[name=model_params_order]")[0].value;
                modelParams = {
                    "modelParamsName": model_params_name,
                    "modelParamsType": model_params_classfy,
                    "modelParamsId": model_params_id
                };
                modelParamsArr.push(modelParams);
            }
        }
        templateDate = {
            "predictModelNo": model_no,
            "predictModelName": model_name,
            "predictArithId": predict_model,
            // 算法参数值
            "predictArithParamValue": arith_value,
            "predictArithParamName": arith_param_name,
            "predictArithParamId": arith_param_id,
            "predictArithParamType": arith_type,

            "trainingClassfy": onlineTraining,
            "trainingSampLength": traning_samp_length,
            "predictSampLength": predict_samp_length,
            "predictModelPath": model_path,
            "predictModelParams": modelParamsArr
        }
        modelArr.push(templateDate);
    }

    var object = {
        "pointId": point_id,
        "itemName": predict_item,
        "itemNo": itemNo,
        "calType": predict_item_computer_classfy,
        "itemType": predict_item_classfy,
        "predictLength": predict_length,
        //"predictPhase": predict_phase,
        "predictStatus": predict_status,
        //"granularity": predict_freq,
        //"isFuse": predict_fuse,
        "itemOrder": itemOrder,
        //"outputStatus": opts.data.outputStatus,//数据库中添加字段
        "tagName": self_defined_name,
        "itemStoreTable": output_store,
        "mergeStatus": mergeStatus,
        "mergeExpression": mergeExpression,
        "moduleName": user_net,
        "isDisplay": user_isDisplay,
        "userType": user_classfy,
        "predictModel": modelArr
    };
    return object;
};

//新增
$('#predict_model_add_btn').on('click', function () {
    buttonStatusExchanged();
});

//返回
$('#back_btn').on('click', function () {
    buttonStatusExchanged();
});


//下一页
$('#next_page_btn').on('click', function () {
    window.location.href = location.origin+"/tag";
});

//返回上一页
$('#back_page_btn').on('click', function () {
    window.location.href = location.origin+"/point";
});

//新增参数
//添加模型的输入参数
$("#model_template").on('click', 'button[name=params_add_btn]', function () {
    $(this).parent().parent().parent().append(addParams());
})

var addParams = function () {
    var div = "";
    div += '<div class="form-group"name="model_params" style="margin-left: 0px;margin-right: 0px;padding-top: 15px" >'
        + '<div class="form-group">'
        + '<label class="col-lg-1 control-label ">参数类型:</label>'
        + '<div class="col-lg-2 ">'
        + '<select class="form-control" id=""name="params_select">'
        + '<option value="DataPoint">DataPoint</option>'
        + '<option value="PredictModel">PredictModel</option>'
        + '<option value="ProducePlan">ProducePlan</option>'
        + '</select>'
        + '</div>'
        + '<div class="col-lg-1 ">'
        + '<button type="button" class="btn btn-primary" id="" name="params_count_btn">查询</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div name="params_div">'
        +'</div>'
    return div;
}
var predictItemTableInit = function (pointData) {
    $('#predict_item_table').bootstrapTable({
        toolbar: "#toolbar",                //工具按钮用哪个容器
        data: pointData,
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
                width: 40
            },
            {
                field: '',
                title: '序号',
                width: 57,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            //{
            //    field: 'id',
            //    visible: false
            //    //formatter: timeFormatter
            //},
            {
                field: 'itemName',
                title: '预测项名'
                //formatter: timeFormatter
            },
            {
                field: 'itemNo',
                title: '编号'
            },
            {
                field: 'predictLength',
                title: '预测长度'
            },
            {
                field: 'isFuse',
                title: '融合',
                visible: false
            },
            {
                field: 'granularity',
                title: '频度',
                visible: false
            },
            {
                field: 'status',
                title: '参与预测'
            },
            {
                field: 'predictPhase',
                title: '预测时段',
                visible: false
            },
            {
                field: 'workChecked',
                title: '校正标识位',
                visible: false
            },
            {
                field: 'calTypeName',
                title: '计算类型'
            },
            {
                field: 'itemTypeName',
                title: '预测项类型'
            },
            {
                field: 'tableName',
                title: '表名',
                visible: false
            },
            {
                field: 'modelNo',
                title: '模型编号',
                visible: false
            },
            {
                field: 'modelName',
                title: '模型名称'

            },
            {
                field: 'trainSampLength',
                title: '训练样本长度'
            },
            {
                field: 'predictSampLength',
                title: '预测样本长度'
            },
            {
                field: 'isOnlineTrain',
                title: '是否在线训练',
                visible: false
            },
            {
                field: 'modelPath',
                title: '模型路径',
                visible: false
            },

            {
                field: 'status1',
                title: '是否使用',
                visible: false
            }




        ]
    });
};

var buttonStatusExchanged = function () {
        $('#predict_model_edit_form_show').toggle();
        $('#predict_model_table_show').toggle();
        $('#edit_btn').toggle();
        $('#next_btn').toggle();
    }
