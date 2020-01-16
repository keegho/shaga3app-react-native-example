import React, { Component } from 'react';
import { Share } from 'react-native';
import { View, Linking, SafeAreaView } from 'react-native';
// import Share from 'react-native-share';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  webview = null;
  oldUrl = null;
  shareResult = false
  nativeShare = async (data) => {
    try {
      const result = await Share.share({
        message: data.url,
        url: data.url
      });
      console.log(result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          this.webview.injectJavaScript(true);
          // console.error(1);
          // return 1// shared with activity type of result.activityType
        } else {
          this.webview.injectJavaScript(true);
          // shared
          // console.log(Share);
          // console.log(result);
          // return 2
        }
      } else if (result.action === Share.dismissedAction) {
        this.webview.injectJavaScript(false);
        // console.error(3);
        // return 3
      }
    } catch (error) {
      this.shareResult = false
      console.error(error.message);
    }
  }
  handleMessage = (event) => {
    console.log(event.nativeEvent.data);
  }
  render() {
    
    return (
      <View style={{flex: 1}}>
         <SafeAreaView style={{flex: 1}}>
          <WebView
            ref={ref => (this.webview = ref)}
            source={{
              uri: 'https://backend.shaga3app.com/api/authorize?user_name=sherif&user_uuid=346grs',
              headers: {
                "x-auth-signature": "96482ab7d8ba729c942c30d6b144dd7abd5afd4b13ec03d0e0778f9b1ba03d63",
                "x-shaga3app-id": "degla"
              }
            }}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled={true}
            allowsFullscreenVideo={true}
            startInLoadingState={true}
            mixedContentMode="compatibility"
            useWebKit={true}
            onNavigationStateChange={this.handleWebViewNavigationStateChange}
            onMessage={event => {
              this.nativeShare(JSON.parse(event.nativeEvent.data))
            }}
          />
          <Text onPress={()=> this.nativeShare({url:""})}>Share</Text>
        </SafeAreaView>
      </View>
    );
  }

  handleWebViewNavigationStateChange = newNavState => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    // alert(url)
    if (!url) return;
    // handle certain doctypes

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // maybe close this view?
    }
    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }
    // redirect somewhere else
    if (url.includes('www')) {
      Linking.openURL(url).catch(err => alert("Couldn't load page"+err));
      this.webview.goBack();
      // const redirectTo = 'window.location = "' + url + '"';
      // this.webview.injectJavaScript(redirectTo);
    }else {
      this.oldUrl = url
      // console.error(this.oldUrl)
    }
  };
}

export default MyWeb
