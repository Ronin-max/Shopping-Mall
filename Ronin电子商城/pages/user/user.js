// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneAct:false,
    addAct:false
  },
  //获取焦点事件处理联系电话选中效果
  phoneActive(e){
    if(e.detail.value === "点击输入电话号码"){
      this.setData({
        phone:''
      })
    }
    this.setData({
      phoneAct:!this.data.phoneAct
    })
  },
  // 获取焦点事件处理收货地址选中效果
  addActive(e){
    if(e.detail.value === "点击输入收货地址"){
      this.setData({
        address:''
      })
    }
    this.setData({
      addAct:!this.data.addAct
    })
  },
  //失焦事件处理联系电话
  changePhone(e){
    this.setData({
      phone:e.detail.value,
      phoneAct:false
    });
    wx.setStorageSync('phone', this.data.phone)
  },
  // 失焦事件处理收货地址
  changeAdd(e){
    this.setData({
      address:e.detail.value,
      addAct:false
    });
    wx.setStorageSync('address', this.data.address)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('phone')){//如果有存储到电话
      this.setData({
        phone:wx.getStorageSync('phone')
      })
    }else{
      this.setData({
        phone:'点击输入电话号码'
      })
    }
    if(wx.getStorageSync('address')){//如果有存储到地址
      this.setData({
        address:wx.getStorageSync('address')
      })
    }else{
      this.setData({
        address:'点击输入收货地址'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(wx.getStorageSync('phone')){//如果有存储到电话
      this.setData({
        phone:wx.getStorageSync('phone')
      })
    }else{
      this.setData({
        phone:'点击输入电话号码'
      })
    }
    if(wx.getStorageSync('address')){
      this.setData({
        address:wx.getStorageSync('address')
      })
    }else{
      this.setData({
        address:'点击输入收货地址'
      })
    }
  },
})