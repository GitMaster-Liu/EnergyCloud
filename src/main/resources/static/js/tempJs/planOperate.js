$('#query_item_btn').on('click', function () {
    predictObject();
    //predictModelView.init(planOperate.setTankLimit);
    //predictModelView.predictModel();
});
$("#object_checked_btn").on('click', function () {
    var selectRow = $("#predict_object_table").bootstrapTable('getSelections');
    //$("#operate_details_modal").modal('hide');
    setAssociation(selectRow);
});

//增加计划项
$('#plan_add_btn').on('click', function () {
    planBtnExchanged();
    $("#object_operate_div").empty();
});
$('#plan_del_btn').on('click', function () {
    alert("确认删除？");
    var selectedRow = $('#plan_table').bootstrapTable('getSelections');
    console.log(selectedRow);
    for(var i=0;i<selectedRow.length;i++) {
        var data = {
            "id": selectedRow[i].id
        };
        deletePlan(data);
    }
});

//计划表单提交
$('#save_plan_btn').on('click', function () {
    var submitData = planFormData();
    console.log(submitData);
    $.ajax({
        type: "POST",
        url: "/plan/insert",
        dataType: "json",
        async: true,
        data: submitData,
        success: function () {
            planBtnExchanged();
            $.ajax({
                type: "GET",
                url: "/plan/select",
                dataType: "json",
                async: true,
                data: {},
                success: function (tagTableData) {
                    $('#plan_table').bootstrapTable('load', tagTableData);
                },
                error: function(){
                    console.log("查询失败");
                }
            });
            console.log("数据点添加成功");
        },
        error: function(){
            console.log("数据点添加接口出错");
        }
    })
});


// 删除添加项
$("#object_operate_div").on('click',"button[name=del_btn]", function () {
    //console.log("删除");
    //console.log(this.parentNode.parentNode.parentNode);
    this.parentNode.parentNode.parentNode.remove();

});
// 计划向返回
$('#back_plan_btn').on('click', function () {
    planBtnExchanged();
});


//返回上一页
$('#back_page_btn').on('click', function () {
    window.location.href = location.origin + "/tank";
});


$.ajax({
    type: "GET",
    url: "/plan/select",
    dataType: "json",
    async: true,
    data: {},
    success: function (TableData) {
        console.log(TableData);
        planTableInit(TableData);
    },
    error: function(){
        console.log("查询失败");
    }
});

//已存在计划项
var planTableInit = function (planData) {
    $('#plan_table').bootstrapTable('load', planData);
    $('#plan_table').bootstrapTable({
        toolbar: "#toolbar_plan",
        data: planData,
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
        // rowStyle: function (row, index) {
        //     console.log(row, index);
        //
        //     if (row.systemTag == 1) {
        //         return {
        //             css: { "background-color":"#51ff35"} };
        //     }
        //     return {
        //         css: {} };
        // },
        columns: [
            {
                checkbox: true,
                //field: '',
                //title: '序号',
                width: 57

            },{
                //field: '',
                title: '序号',
                width: 40,
                formatter: function (value, row, index) {

                    return index + 1;
                }

            }, {
                field: 'systemName',
                title: '系统名'
                //formatter: timeFormatter
            }, {
                field: 'objectName',
                title: '对象名'
            }, {
                field: 'operation',
                title: '操作'
            }]
    });
};

//设置添加项
var setAssociation = function (selectedRow) {
    var div = "";
    for (var i = 0; i < selectedRow.length; i++) {
        div += '<div class="form-group" >'
            + '<div class="col-lg-12" style="padding-left: 0px; padding-right: 0px; ">'
            + '<label class="col-lg-2 col-lg-pull-1 control-label">对象名:</label>'
            + '<div class="col-lg-4 col-lg-pull-1">'
            + '<input type="text" class="form-control " name="object" placeholder="" value="' + selectedRow[i].itemName + '">'
            + '<input type="text" class="form-control " name="itemId" placeholder="" value="' + selectedRow[i].id + '"style="display:none">'
            + '</div>'
            + '<label class="col-lg-2 col-lg-pull-1 control-label">操作:</label>'
            + '<div class="col-lg-2 col-lg-pull-1">'
            + '<input type="text" class="form-control " name="operate" placeholder="">'
            + '</div>'
            + '<div class="col-lg-2 col-lg-pull-1">'
            + '<button type="button" class="btn btn-destroy" name="del_btn">'
            + '<i class="fa fa-times"></i>'
            + '</button>'
            + '</div>'
            + '</div>'
            + '</div>'
    }

    $(".form-group")[1].append(div);
};

//plan删除
var deletePlan = function (data) {
    $.ajax({
        type: "POST",
        url: "/plan/delete",
        dataType: "json",
        async: true,
        data: data,
        success: function () {
            $.ajax({
                type: "GET",
                url: "/plan/select",
                dataType: "json",
                async: true,
                data: {},
                success: function (tagTableData) {
                    $('#plan_table').bootstrapTable('load', tagTableData);
                },
                error: function(){
                    console.log("查询失败");
                }
            });
            console.log("数据点删除成功");
        },
        error: function(){
            console.log("数据点删除接口出错");
        }
    });
};

var predictObject = function () {
    $.ajax({
        type: "GET",
        url: "/predict/select",
        dataType: "json",
        async: true,
        data: {},
        success: function (TableData) {
            console.log(TableData);
            predictObjectTable(TableData);
        },
        error: function(){
            console.log("查询失败");
        }
    });
    setAssociation();
    //$("#operate_details_modal").modal('show');
};
var predictObjectTable = function (itemData) {
    $("#predict_object_table").bootstrapTable('load', itemData);
    $("#predict_object_table").bootstrapTable({
        //toolbar: '#toolbar',
        data: itemData,
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        //sortOrder: "asc",                   //排序方式
        //queryParams: oTableInit.queryParams,//传递参数（*）
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        //strictSearch: true,
        //showColumns: true,                  //是否显示所有的列
        //showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数

        detailView: false,                   //是否显示父子表
        columns: [

            {
                checkbox: true,
                //field: '',
                //title: '序号',
                width: 40,

            },
            {
                field: '',
                title: '序号',
                width: 40,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            {
                field: 'itemName',
                title: '名称',

                //formatter: timeFormatter
            },
            {
                field: 'itemNo',
                title: '编号',
                //formatter: timeFormatter
            }

        ]
    });
};

var planBtnExchanged = function () {
    $('#plan_edit_form_show').toggle();
    $('#plan_table_show').toggle();
    $('#foot_plan').toggle();
    $('#next_page_btn').toggle();
    $('#back_page_btn').toggle();
};

// plan表单数据及验证
var planFormData = function () {
    var systemName = $("#system_name").val();
    if (systemName == "") {
        alert("请选择或者填写系统名");
        return;
    }

    var objectName = $("#object_name").val();
    if (objectName == "") {
        alert("请选择或者填写对象名");
        return;
    }
    var operateName = $("#operate_name").val();
    if (operateName == "") {
        alert("请选择或者填写操作");
        return;
    }
    // var object = [];
    // for (var i = 0; i < $("#object_operate_div").find("input[name=object]").length; i++) {
    //     object.push($("#object_operate_div").find("input[name=object]")[i].value);
    // }
    // var itemId = [];
    // for (var i = 0; i < $("#object_operate_div").find("input[name=itemId]").length; i++) {
    //     itemId.push($("#object_operate_div").find("input[name=itemId]")[i].value);
    // }
    // var operation = [];
    // for (var i = 0; i < $("#object_operate_div").find("input[name=operate]").length; i++) {
    //     operation.push($("#object_operate_div").find("input[name=operate]")[i].value);
    // }
    // if (object.length == 0) {
    //     alert("请添加对象及操作");
    //     return;
    // }
    // var entity = [];
    // for (var i = 0; i < object.length; i++) {
    //     var objectEntity = {
    //         //"id": itemId[i],
    //         "systemName": systemName,
    //         "objectName": object[i],
    //         "operation": operation[i],
    //         "objectTag": 0,
    //         "systemTag": 0
    //     };
    //     entity.push(objectEntity);
    // }
    var objectEntity = {
        //"id": itemId[i],
        "systemName": systemName,
        "objectName": objectName,
        "operation": operateName,
        "objectTag": 1,
        "systemTag": 0
    };
    //console.log(entity);
    return objectEntity;
};