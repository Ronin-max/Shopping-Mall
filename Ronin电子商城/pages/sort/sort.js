// pages/sort/sort.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastIndex:"0"
  },

  // 处理菜单栏点击事件
  handleMenu(e){
    const gData = getApp().globalData;
    const goodsType = gData.goodsType;
    //当前点击的索引
    const index = e.currentTarget.dataset.id;
    //更改上一次点击选项的值
    goodsType[this.data.lastIndex].isSelect = goodsType[index].isSelect;
    //更改当前选项的值
    goodsType[index].isSelect = !goodsType[index].isSelect;
    //更新数据
    this.setData({goodsType})
    this.setData({lastIndex:index})

    //渲染选项对应的内容
    const typeId = gData.goodsType[index].id;
    //筛选商品并传递数据给前端界面
    this.setData({
      showList:gData.goodsList.filter(item=>{
        return item.categoryId === typeId;
      })
    });
    //将页面滚动到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  toGoods(e){
    const gData = getApp().globalData;
    const goodsId = e.currentTarget.dataset.id;
    gData.toGoods(goodsId);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存this
    const that = this;
    // 获取全局数据对象
    const gData = getApp().globalData;
    // 获取商品分类列表
    const goodsType = gData.goodsType;
    // 为每个分类添加一个是否选中的属性，用于处理图标的点击选中
    goodsType.forEach(item=>{
      item.isSelect = false;
    })
    //初始默认展示第一个选项
    goodsType[0].isSelect = true;
    // 传递数据到前端界面
    this.setData({
      goodsType,
      showList:gData.goodsList.filter(item=>{
        return item.categoryId === gData.goodsList[0].categoryId;
      })
    })
  },
})