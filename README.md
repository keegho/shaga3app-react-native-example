![Imgur Image](https://i.imgur.com/PuGTPGT.png)

</p>
<p align="left">
    <a href="" alt="Version">
        <img src="https://img.shields.io/badge/version-1.0-blue" /></a>
    <a href="">
        <img src="https://img.shields.io/badge/node->=6.0-green" alt="node"></a>
            
</p>

# SHAGA3APP SAMPLE REACT NATIVE

This is the react native sample code snippet for cross platform app projects who need to embed the SHAGA3APP competition `webview` to their apps.

## Installation

You need first to contact [SHAGA3APP](https://www.shaga3aapp.com) institution to prepare the deal and send them your primary and secondary colors, logos and competition rules and prize logos for each winner. 

Then you will receive a private key where your company will use to create signatures to their users using the app to use the embedded [react-native-webview](https://github.com/react-native-community/react-native-webview) in your app in an authorized manner and be able to upload videos and join the your own competition.

For generating HMAC signature using your app existing users on your *PHP* backend use [hash_hmac](https://www.php.net/manual/en/function.hash-hmac.php).

### Using *PHP*:

```php
<?php
// We will use the key that is generated from the admin panel.
$secret = "KEY_GENERATED_FROM_THE_BACKEND_ADMIN_PANEL";
// The string here represents the url we will visit for the authorization.
// Where username should represent the user name of the logged in user in the mother app.
// And the uuid should be a unique value within the mother app.
// This is in the case of a normal authorized user.
$string = "/api/authorize?user_name=username&user_uuid=userId&user_phone=phone&user_email=email"
// If this user is a guest and not authorized we will have to do it so:
// $string = "/api/authorize?user_name=guest&user_uuid=guest&salt=enter_a_random_string_here"
$sig = hash_hmac('sha256', $string, $secret);
```
### Using *Node*:

```javascript
const crypto = require("crypto");
// We will use the key that is generated from the admin panel.
const secret = "KEY_GENERATED_FROM_THE_BACKEND_ADMIN_PANEL";
// The string here represents the url we will visit for the authorization.
// Where username should represent the user name of the logged in user in the mother app.
// And the uuid should be a unique value within the mother app.
// This is in the case of a normal authorized user.
const string = "/api/authorize?user_name=username&user_uuid=userId&user_phone=phone&user_email=email"
// If this user is a guest and not authorized we will have to do it so:
// const string = "/api/authorize?user_name=guest&user_uuid=guest&salt=enter_a_random_string_here"
const signer = crypto.createHmac("sha256", secret);
signer.update(string);
const sig = signer.digest("hex");
// And the variable signature will hold our signature value that we will be using in the header.
```

* Where `string` is your app username + id + phone and email combined in the api link as sample above.
* And the `secret` is the private key :key:
* This will generate the `sig` which is the signature where it will be used in the link header of the embedded `react-native-webview` using the name and id of the user in the link to be able to connect to shaga3app webview and join the competition.

So actually what will happen is that the user trying to open the `react-native-webview` send a call to your server with their name and id and receive in return a signature that will be used in the header of the link.

### Installing Libraries:
```bash
npm install react-native-webview --save
# Or using yarn
yarn install react-native-webview

# also install the share for the react-native
npm install react-native-share --save
# Or using yarn
yarn install react-native-share

```
Note: React native webview will be automaticaly linked with the native apps

### Importing Libraries:

```javascript
import React, { Component } from 'react';
//Linking library for redirecting links outside the app and using native browser
import { View, Linking, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';
```

## Usage
Embedding the `react-native-webview` to your react native app is a piece of cake :smiley:

Just libraries needed like the above code snippet to your class call and build the link in the code snippet below using the correct username, id, phone, email, signature and key.

```javascript
<WebView
    ref={ref => (this.webview = ref)}
    source={{
      uri: 'https://dev.backend.shaga3app.com/api/authorize?user_name='+this.props.name+'&user_uuid='+this.props.id+'&user_phone='+this.props.phone+'&user_email='+this.props.email,
      headers: {
        "x-auth-signature": "96482ab7d8ba729c942c474dhhhd7abd5afd4b13ec03d0e0778f9b1ba03d63",
        "x-shaga3app-id": "degla",
        "x-locale": "ar"  //This is optional if "ar" the webview will return arabic view. If "en" or not found in header it will be english by default
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
    onMessage={(event) => {
      
      const data =JSON.parse(event.nativeEvent.data)
      Share.open({
        message: data.url,
        url: data.url
      })
      .then(res => {
        
        //insject javaScript code in the webview 
        
        this.webview.injectJavaScript(`
          localStorage.setItem('shareResult',true);
          var evt = document.createEvent('StorageEvent');
          evt.initStorageEvent('storage',false,false,'key','oldValue','newValue','*',window.localStorage);
          window.dispatchEvent(evt);
        `);
      })
      .catch(error => {
        this.webview.injectJavaScript(`
          localStorage.setItem('shareResult',false)
          var evt = document.createEvent('StorageEvent');
          evt.initStorageEvent('storage',false,false,'key','oldValue','newValue','*',window.localStorage);
          window.dispatchEvent(evt);
        `);
      }) 
    }}
  />
```

Regarding the `key` :key: in the code above will be your own app id in SHAGA3APP that will be generated to you also with the private key *that you will use to generate the signature with in the backend* and will be used with the generated signature in the link headers.

### Helper function

```javascript
//To handle links redirection outside the webview
handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState;
    if (!url) return;
    
    if (url.includes('www')) {
      Linking.openURL(url).catch(err => alert("Couldn't load page"+err));
      const redirectTo = 'window.location = "' + this.oldUrl + '"';
      this.webview.injectJavaScript(redirectTo);
    }else {
      this.oldUrl = url
      
    }
};
```

```php
   //Check the example code file for more code snippets and details. 
```

## Contributing
No contributions are needed at this stage

## License
[MIT](https://choosealicense.com/licenses/mit/)
