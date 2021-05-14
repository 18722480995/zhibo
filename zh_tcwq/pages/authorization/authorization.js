var app = getApp();
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
      
  },

  cancelLogin: function() {
    wx.navigateBack();
  },

  getUserInfo(e) {
    console.log(e, 'e')
    if (e.detail.errMsg == "getUserInfo:ok") {
      // 登录
      this.login()
    } 
  },
  yonghuyinsi(e){
    console.log(e)
    wx.navigateTo({
      url: "../store/help",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
    
  },

  login() {
    let c = this;
    wx.login({
      success: function (t) {
        var e = t.code;
        wx.setStorageSync("code", e),
          wx.getSetting({
            success: function (t) {
              console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                success: function (t) {
                  console.log(t),
                    wx.setStorageSync("user_info", t.userInfo);
                  var a = t.userInfo.nickName,
                    n = t.userInfo.avatarUrl;
                  app.util.request({
                    url: "entry/wxapp/openid",
                    cachetime: "0",
                    data: {
                      code: e
                    },
                    success: function (t) {
                      console.log(t), wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                      var e = t.data.openid;
                      app.util.request({
                        url: "entry/wxapp/Login",
                        cachetime: "0",
                        data: {
                          openid: e,
                          img: n,
                          name: a
                        },
                        success: function (t) {
                          console.log(t)
                          if (t.data.id) {
                            c.setData({
                              userinfo: t.data
                            }),
                              wx.setStorageSync("users", t.data),
                              wx.setStorageSync("uniacid", t.data.uniacid),

                            
                              setTimeout(() => {
                                wx.navigateBack()
                              }, 2000)


                          } else {
                            app.showToastIcon(t.errMsg)
                          }
                        }
                      });
                    }
                  });
                }
              }) : (console.log("未授权过"), c.setData({
                hydl: !0
              }));
            }
          });
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})