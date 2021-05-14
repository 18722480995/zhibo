var app = getApp();
Page({
    data: {
        list: []
    },
    onLoad: function(t) {
      
      var t = this;
      var a = wx.getStorageSync("users");
      app.util.request({
        url: "entry/wxapp/dlist",
        cachetime: "0",
        data: {
          user_id: a.id
        },
        success: function (e) {
          console.log(e), t.setData({
            list: e.data,
            System: wx.getStorageSync("System"),
          });
        }
    })
    },

    dy: function(e) {
      var t = this,index = e.currentTarget.dataset.index;
      var list = t.data.list;
      var tpl_id = list[index].tpl_id;
      wx.requestSubscribeMessage({
        tmplIds: [tpl_id],
        success(res) {
          console.log(res);
          if (res.errMsg == 'requestSubscribeMessage:ok') {
            if (res[tpl_id] == 'accept') {
              var a = wx.getStorageSync("users");
                app.util.request({
                  url: "entry/wxapp/subscribe",
                  cachetime: "0",
                  data: {
                    user_id: a.id,
                    tpl_id: tpl_id,
                    tpl_name: list[index].tpl_name
                  },
                success: function (e) {
                  console.log(e), t.onLoad(t);
                }
              });
            }
            if (res[tpl_id] == 'reject') {
              wx.showToast({
                title: '你已拒绝订阅！',
                icon: 'none',
              });
            }
          } else {
            wx.showToast({
              title: res.errMsg,
              icon: 'none',
            });
          }
        },
        fail(res) {
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
          });
        }
      })
    },
});