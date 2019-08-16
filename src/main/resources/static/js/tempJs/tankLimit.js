//增加tank点
$('#tank_add_btn').on('click', function () {
    tankButtonStatusExchanged();
});
// 删除tank点
$('#tank_del_btn').on('click', function () {
    alert("确认删除？");
    var selectedRow = $('#tank_table').bootstrapTable('getSelections');
    console.log(selectedRow);
    for(var i=0;i<selectedRow.length;i++) {
        var data = {
            "id": selectedRow[i].id
        };
        deleteTank(data);
    }

});

$("#query_prediction_btn").on('click', function () {
    predictModelView.init(tankLimit.setTankLimit);
    predictModelView.predictModel();
});

//tank表单提交
$('#save_tank_btn').on('click', function () {
    var data = tankFormData();
    console.log(data);
    if (data == false) {
        return;
    }


    $.ajax({
        type: "POST",
        url: "/tank/insert",
        dataType: "json",
        async: true,
        data: data,
        success: function () {
            tankButtonStatusExchanged();
            $.ajax({
                type: "GET",
                url: "/tank/select",
                dataType: "json",
                async: true,
                data: {},
                success: function (tagTableData) {
                    $('#tank_table').bootstrapTable('load', tagTableData);
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



// tank返回
$('#back_tank_btn').on('click', function () {
    tankButtonStatusExchanged();
});


//返回上一页
$('#back_page_btn').on('click', function () {
    window.location.href = location.origin + "/schedule";
});

//下一页
$('#next_page_btn').on('click', function () {
    window.location.href = location.origin+"/plan";
});

//柜位
$.ajax({
    type: "GET",
    url: "/tank/select",
    dataType: "json",
    async: true,
    data: {},
    success: function (TableData) {
        console.log(TableData);
        tankTableInit(TableData);
    },
    error: function(){
        console.log("查询失败");
    }
});

var setTankLimit = function (selectedRow) {
    $("#prediction_name").val(selectedRow[0].itemName);
};
//柜位限
var tankTableInit = function (tankData) {
    $('#tank_table').bootstrapTable('load', tankData);
    $('#tank_table').bootstrapTable({
        data: tankData,
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
                field: 'itemName',
                title: '柜位名'
                //formatter: timeFormatter
            }, {
                field: 'hhLimit',
                title: '物理上限'
            }, {
                field: 'hlimit',
                title: '安全上限'
            }, {
                field: 'llimit',
                title: '安全下限'
            }, {
                field: 'llLimit',
                title: '物理下限'
            }
        ]
    });
};

//tank删除
var deleteTank = function (data) {
    $.ajax({
        type: "POST",
        url: "/tank/delete",
        dataType: "json",
        async: true,
        data: data,
        success: function () {
            $.ajax({
                type: "GET",
                url: "/tank/select",
                dataType: "json",
                async: true,
                data: {},
                success: function (tagTableData) {
                    $('#tank_table').bootstrapTable('load', tagTableData);
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

// 页面底部button切换
var tankButtonStatusExchanged = function () {
    $('#tank_edit_form_show').toggle();
    $('#tank_table_show').toggle();
    $('#foot_tank').toggle();
    $('#next_page_btn').toggle();
    $('#back_page_btn').toggle();
};

//表单数据及验证
var tankFormData = function () {
    var predictionName = $("#prediction_name").val();
    if (predictionName == "") {
        alert("请选择预测项");
        return false;
    }

    var machineMax = $("#machine_max").val();
    if (machineMax == "") {
        alert("请设置机械上限");
        return false;
    }
    var safeMax = $("#safe_max").val();
    if (safeMax == "") {
        alert("请设置安全上限");
        return false;
    }
    var safeMin = $("#safe_min").val();
    if (safeMin == "") {
        alert("请设置安全下限");
        return false;
    }
    var machineMin = $("#machine_min").val();
    if (machineMin == "") {
        alert("请设置机械下限");
        return false;
    }
    if (parseInt(machineMax) < parseInt(safeMax) || parseInt(safeMax) < parseInt(safeMin) || parseInt(safeMin) < parseInt(machineMin)) {
        alert("上下限设置不符合要求");
        return false;
    }
    var object = {
        "itemName": predictionName,
        "hhLimit": parseInt(machineMax),
        "hLimit": parseInt(safeMax),
        "lLimit": parseInt(safeMin),
        "llLimit": parseInt(machineMin),
        "dsp": 0
    };
    console.log(object);
    return object;
};
