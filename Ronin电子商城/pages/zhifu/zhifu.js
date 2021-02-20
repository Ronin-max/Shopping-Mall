// pages/zhifu/zhifu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 接收跳转前页面 传递的数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('postGoodsMsg', function(data) {
      const gData = getApp().globalData;
      // 拿到商品id并查找到对应商品
      let cartList = [];
      for(const prop in data){
        cartList.push(...gData.goodsList.filter(item=>{
          return item.id === data[prop];
        }))
      }
      that.setData({
        cartList
      })
    });
    this.setData({
      num : wx.getStorageSync('num'),
      money:wx.getStorageSync('money')
    })
  }
})