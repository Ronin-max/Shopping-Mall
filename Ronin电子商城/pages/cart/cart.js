// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: {},
    money: 0,
    checked: {},
    handle: ['删除','管理'],
    flag : 1,
    filterList:[]
  },
  //加号点击事件
  add(e) {
    const index = e.currentTarget.dataset.id;
    this.data.num[index] = this.data.num[index] + 1
    this.setData({
      num: this.data.num,
      money:this.data.money += this.data.cartList[index].minPrice
    });
  },
  //减号点击事件
  remove(e) {
    const index = e.currentTarget.dataset.id;
    this.data.num[index] = this.data.num[index] - 1
    if(this.data.num[index] < 1){
      this.data.num[index] = 1
    }else{
      this.data.num[index] = this.data.num[index]
      this.setData({
        num: this.data.num,
        money:this.data.money -= this.data.cartList[index].minPrice
      })
    }
  },
  //radio点击事件
  handleRadio(e) {
    // 处理点击radio
    const index = e.currentTarget.dataset.id;
    this.data.checked[index] = !e.currentTarget.dataset.checked;
    //将点击为true的记录到filterList中
    const goodsid = this.data.cartList[index].id;//拿到记录进去的商品id
    if(this.data.checked[index]){
      this.data.filterList.push(goodsid);
    }else{
      const target = this.data.filterList.indexOf(goodsid);//找到需要移出的商品位置
      this.data.filterList.splice(target,1);//删除
    }
    // 更新数据
    this.setData({
      checked: this.data.checked,
      filterList:this.data.filterList
    })
    // 处理总支付
    this.data.money = 0;
    for (const prop in this.data.checked) {
      if (this.data.checked[prop]) {
        this.data.money += this.data.cartList[prop].minPrice * this.data.num[prop];
      }
      this.setData({
        money: this.data.money
      })
    }
  },
  //管理按钮点击事件
  handleGoods(){
    const that = this;
    // 更换 管理 / 删除
    this.setData({
      flag:this.data.flag === 0 ? 1 : 0
    })
    // 处理本地存储
    if(this.data.flag === 1){//判断是否为删除按钮
      let newGoodsList = this.data.cartList;
      for(const prop in this.data.filterList){ //循环选中的列表 拿到删除后剩余的商品列表
        newGoodsList = newGoodsList.filter(item=>{
          return item.id !== that.data.filterList[prop];
        })
      }
      this.setData({cartList:newGoodsList});
      wx.setStorageSync('goods', JSON.stringify(this.data.cartList))
      //处理radio选中列表
      const newChecked = {};
      this.data.cartList.forEach((item,index)=>{newChecked[index] = false;})
      this.setData({
        checked:newChecked
      })
      //处理money的更新
      this.setData({
        money:0
      })
    }
  },

  // 处理全选按钮
  handleCheckAll(){
     const newChecked = {};
     this.data.cartList.forEach((item,index)=>{
       newChecked[index] = true;
     })
     this.setData({
       checked:newChecked
     })
      // 处理总支付
    this.data.money = 0;
    for (const prop in this.data.checked) {
        this.data.money += this.data.cartList[prop].minPrice * this.data.num[prop];
      this.setData({
        money: this.data.money
      })
    }
  }, 
  // 判断用户信息是否填写完整
  payment(){
    if(!(wx.getStorageSync('phone') && wx.getStorageSync('address'))){
      wx.showToast({
        title: '未填写用户电话或地址', // 标题
        icon: 'none',  // 图标类型，默认success
        duration: 2000  // 提示窗停留时间，默认1500ms
      })
    }else{
      const that = this;
      wx.navigateTo({
        url: '../zhifu/zhifu',
        events:{
          postGoodsMsg:function(data){
            console.log(data);
          }
        },
        success(res){
          res.eventChannel.emit('postGoodsMsg',that.data.filterList);
        }
      });
      wx.setStorageSync('money', this.data.money);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 获取购物车中的数据
    wx.getStorage({
      key: 'goods',
    }).then(data => {
      that.setData({
        cartList: JSON.parse(data.data)
      })
      //生成对应的商品数和radio值
      that.data.cartList.forEach((item, index) => {
        that.data.num[index] = 1;
        that.data.checked[index] = false;
      })
      that.setData({
        num: that.data.num,
        checked: that.data.checked
      })
      wx.setStorageSync('num', that.data.num);
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    // 获取购物车中的数据
    wx.getStorage({
      key: 'goods',
    }).then(data => {
      that.setData({
        cartList: JSON.parse(data.data)
      })
      that.data.cartList.forEach((item, index) => {
        that.data.num[index] = 1;
        that.data.checked[index] = false;
      })
      that.setData({
        num: that.data.num,
        checked: that.data.checked
      })
    })
  },
})