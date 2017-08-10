/*
 * 选择页面js
 */

/**
 * 获取POP页面的window对象
 * 
 * @params layero 弹出层
 * @retrun window对象
 */
function win(layero) {
	return layero.find("iframe")[0].contentWindow;
}

/**
 * 获取控件选中数据
 * 
 * @params layero 弹出层
 * @params _options 配置
 * @return 选中数据
 */
function getSelectedDatas(layero, _options) {
	var rows = [];
	switch (_options.ctrlType) {
	case 'bootstraptable':
		rows = win(layero).$("#" + _options.ctrlId).bootstrapTable(
				'getSelections')
		break;
	case 'ztree':
		if (_options.singleSelect) {
			rows = win(layero).$.fn.zTree.getZTreeObj(_options.ctrlId).getSelectedNodes();
		} else {
			rows = win(layero).$.fn.zTree.getZTreeObj(_options.ctrlId).getCheckedNodes(true);
		}
		break;
	default:
		break;
	}
	return rows;
}

/**
 * 初始化控件配置
 * 
 * @params layero 弹出层
 * @params _options 配置
 */
function initSelConfig(layero, _options) {
	switch (_options.ctrlType) {
	case 'bootstraptable':
		win(layero).$("#" + _options.ctrlId).bootstrapTable("refreshOptions", {
			singleSelect : _options.singleSelect
		});
		break;
	case 'ztree':
		break;
	default:
		break;
	}
}

/**
 * 选择页面
 * 
 * @params opt 选择页面选项
 */
function selectPage(opt) {
	var _options = $.extend({
		layer : top.layer, // 弹出层对象
		title : '选择页面', // 选择页面标题
		url : null,
		width : '100%', // 弹出层宽度
		height : '100%', // 弹出层高度
		ctrlType : 'bootstraptable', // 数据控件类型（bootstraptable、ztree）
		ctrlId : null, // 控件ID
		singleSelect : true, // 单选（true：是，false：否，默认true）
		selectedDataIds : "", // 已选择的数据编号（,隔开，null活着""代表没有选中的）
		callback : function(data) {
		} // 选择后回调函数
	}, opt || {});

	var _layer = _options.layer;

	// 地址
	var url = _options.url;
	url += (url.lastIndexOf("?") > 0 ? "&" : "?") + "sids="
			+ _options.selectedDataIds + "&singleSelect="
			+ _options.singleSelect;

	_layer.open({
		type : 2,
		title : _options.title,
		shadeClose : true,
		shade : [ 0.1 ],
		maxmin : true,
		area : [ _options.width, _options.height ],
		shift : 0,
		content : [ url ],
		btn : [ '确定', '取消', '清空' ],
		success : function(layero, index) {
			initSelConfig(layero, _options);
		},
		yes : function(index, layero) {
			var rows = getSelectedDatas(layero, _options);
			if (rows.length < 1) {
				_layer.alert("请至少选中一行！", {
					icon : 2
				});
				return;
			}
			if (_options.singleSelect) {
				_options.callback(rows[0]);
			} else {
				_options.callback(rows);
			}
			_layer.close(index);
		},
		btn3 : function(index) {
			_options.callback(null);
			_layer.close(index);
		}
	});
}

/**
 * 弹出页面
 * 
 * @params opt 弹出页面选项
 */
function popPage(opt) {
	var _options = $.extend({
		layer : top.layer, // 弹出层对象
		title : '选择页面', // 选择页面标题
		url : null,
		width : '100%', // 弹出层宽度
		height : '100%', // 弹出层高度
		callback : function(index, layero) {
		} // 选择后回调函数
	}, opt || {});

	var _layer = _options.layer;

	// 地址
	var url = _options.url;

	_layer.open({
		type : 2,
		title : _options.title,
		shadeClose : true,
		shade : [ 0.1 ],
		maxmin : true,
		area : [ _options.width, _options.height ],
		shift : 0,
		content : [ url ],
		btn : [ '确定', '取消' ],
		success : function(layero, index) {
		},
		yes : function(index, layero) {
			callback(index, layero);
			_layer.close(index);
		}
	});
}