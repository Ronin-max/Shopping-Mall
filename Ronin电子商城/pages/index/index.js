// index.js
//商品数据列表
let goodsList = [];
let goodsType = [];
Page({
  data: {
    recommendTitle : "商品推荐",
    searchList:[],
    inputValue:''
  },
  onLoad() {
    // 保存Page函数中的this
    const that = this;
    // 获取全局数据对象
    const gData = getApp().globalData;
    //获取总商品数据
    wx.request({
      url: 'https://api.it120.cc/2670447654DarkH/shop/goods/list',
      method:"POST",
      success(res){//请求成功回调函数
        // 筛选推荐商品
        const showList = res.data.data.filter(item=>{
          return item.recommendStatusStr === '推荐';
        })
        //将数据传递到渲染成（页面）
        that.setData({
          goodsList : res.data.data,
          showList
        },function(){//传递成功后把数据存储到全局数据对象中
          gData.goodsList = res.data.data;
        })
      },
      dataType:"json",
      responseType:"text",
      fail(err){
        console.log(err);
      }
    })
    
    // 获取商品类别
    wx.request({
      url:"https://api.it120.cc/2670447654DarkH/shop/goods/category/all",
      method:"GET",
      success(res){
        that.setData({
          goodsType : res.data.data
        },function(){
          gData.goodsType = res.data.data;
        })
      },
      dataType:"json",
      responseType:"text",
      fail(err){
        console.log(err);
      }
    })
    
  },
  //点击热门分类切换显示的商品
  changeGoods(e){
    const gData = getApp().globalData;
    const typeid = e.currentTarget.dataset.typeid;
    const name = e.currentTarget.dataset.name;
    //更新showList
    this.setData({
      showList:gData.goodsList.filter(item=>{
        return item.categoryId === typeid;
      })
    })
    //更新标题
    this.setData({
      recommendTitle : name
    })
  },
  toGoods(e){
    const gData = getApp().globalData;
    const goodsId = e.currentTarget.dataset.id;
    gData.toGoods(goodsId);
  },
  // 处理输入框的值
  changeValue(e){
    // 筛选过滤
    this.setData({
      searchList:this.data.goodsList.filter(item=>{
        return item.name.includes(e.detail.value);
      })
    });
  },
  toSearch(){
    this.setData({
      inputValue:''
    })
    const gData = getApp().globalData;
    gData.toSearch(this.data.searchList);
  }
})
  