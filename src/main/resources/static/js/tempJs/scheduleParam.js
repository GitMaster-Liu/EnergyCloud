//增加user
$('#user_add_btn').on('click', function () {
    userButtonStatusExchanged();
});
//删除user
$('#user_del_btn').on('click', function () {
    alert("确认删除？");
    var selectedRow = $('#user_param_table').bootstrapTable('getSelections');
    console.log(selectedRow);
    for(var i=0;i<selectedRow.length;i++) {
        var data = {
            "id": selectedRow[i].id
        };
        deleteUser(data);
    }
});

$('#adjust_query_point_btn').on('click', function () {



    PointQuery.init(ScheduleAdjustItem.setPointDetails);
    PointQuery.queryPoint(null);

});



//user表单提交
$('#save_user_btn').on('click', function () {
    var object = userFormData();
    console.log(object);
    $.ajax({
        type: "POST",
        url: "/schedule/insert",
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



// user返回
$("#back_user_btn").on('click', function () {
    userButtonStatusExchanged();
});

//下一页
$('#next_page_btn').on('click', function () {
    window.location.href = location.origin+"/tank";
});

//返回上一页
$('#back_page_btn').on('click', function () {
    window.location.href = location.origin+"/tag";
});

// 参数初始化
$.ajax({
    type: "GET",
    url: "/schedule/select",
    dataType: "json",
    async: true,
    data: {},
    success: function (TableData) {
        console.log(TableData);
        paramTableInit(TableData);
    },
    error: function(){
        console.log("查询失败");
    }
});

//用户参数
var paramTableInit = function (userParamData) {
    $('#user_param_table').bootstrapTable('load', userParamData);
    $('#user_param_table').bootstrapTable({
        data: userParamData,
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
        //search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
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
                width: 57

            }, {
                //field: '',
                title: '序号',
                width: 57,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'varName',
                title: '变量名'
                //formatter: timeFormatter
            }, {
                field: 'lowLimit',
                title: '下限'
            }, {
                field: 'highLimit',
                title: '上限'
            }, {
                field: 'group',
                title: '组别'
            }, {
                field: 'unit',
                title: '单位'
            }
        ]
    });
};

var setPointDetails = function (selectedRow) {
    $("#variable_name").val(selectedRow[0].pointName);
    $("#variable_id").val(selectedRow[0].id);
};
//params删除
var deleteUser = function (data) {
    $.ajax({
        type: "POST",
        url: "/schedule/delete",
        dataType: "json",
        async: true,
        data: data,
        success: function () {
            $.ajax({
                type: "GET",
                url: "/schedule/select",
                dataType: "json",
                async: true,
                data: {},
                success: function (tagTableData) {
                    $('#user_param_table').bootstrapTable('load', tagTableData);
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
var userButtonStatusExchanged = function () {
    $('#user_edit_form_show').toggle();
    $('#user_table_show').toggle();
    $('#foot_user').toggle();
    $('#next_page_btn').toggle();
    $('#back_page_btn').toggle();
};
//表单数据及验证

var userFormData = function () {
    var variableName = $("#variable_name").val();
    if (variableName == "") {
        alert("请选择变量");
        return;
    }

    var netClassfy = $("#net_classfy").val();
    var logicMax = parseInt($("#logic_max").val());

    var logicMin = parseInt($("#logic_min").val());

    var unit = $("#unit").val();
    if (unit == "") {
        unit = null;
    }
    var object = {
        "varName": variableName,
        "lowLimit": logicMin,
        "highLimit": logicMax,
        "group": netClassfy,
        "unit": unit,
        "order": 1
    };
    console.log(object);
    return object;
};
