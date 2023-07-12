---
title: 4. Account Configuration
---

Once your account has been created with Beyond Identity, you'll be able to configure a few values specific to your account. In order to configure your account, you will need to issue an `HTTP POST` to `https://api.byndid.com/v0/configs/profile` with the following fields:

| Name      					                | Type 	  	  | Description	  |
| -----------------------------       | ---------   | ----------- 	|
| **profile_display_name**  		      | String  	  | **Required**. The display name that shows up on the credential within the Authenticator. |
| **profile_logo_uri**				        | String	    | **Required**. The uri of your company or app's logo that is displayed on the credential within the Authenticator.|
| **support_email**					          | String	    | The support email to which a user's questions should be routed. This shows up opportunistically throughout the authentication flow. The default value is set to `help@beyondidentity.com`.|
| **app_enroll_uri**				          | String	    | The uri of your app's sign up screen. This is where the user would register with your service by means of the Beyond Identity Authenticator. On web, this could be a url to the particular sign up page. On iOS/macOS or Android, it's recommended that you use [universal urls](https://developer.apple.com/documentation/xcode/allowing_apps_and_websites_to_link_to_your_content) or [app links](https://developer.android.com/training/app-links) respectively. Although it's not recommended due to known security vulnerabilities, you can also use [app schemes](https://developer.apple.com/documentation/xcode/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app).|
| **app_login_uri**					          | String	    | The uri of your app's sign in screen. This is where the user would authenticate into your app. The same recommendations given for the app_enroll_uri also apply to the app_login_uri. If this value is supplied, the Beyond Identity Authenticator will display a button below the credential that the user can tap to authenticate into your application. It is recommended that you use a uri that automatically logs your user in, e.g `https://example-app.com/login?auto-login=true`. This way, when the user clicks on the button in the authenticator, it will log them into your app with just one click.|
| **registration_redirect_uri**		    | String	    | This URI lets us know where to redirect new users when they register using an email. See [Registration Redirect URI](./registration-redirect-uri.md) for more details.| 
| **enable_roaming_authentication**	  | Bool		    | This enables a feature that would allow your users to authenticate into their desktop applications by using their mobile phones as a roaming authenticator. If the authenticator is not installed on your desktop, or the credential does not exist in your desktop authenticator, you'll be presented with a QR code that you can scan with your phone's camera. Note that this requires that you have the Beyond Identity Authenticator installed on your phone and that it contains the appropriate credential.|

Example cURL request:

```bash
curl -X POST "https://api.byndid.com/v0/configs/profile" \
  --header "content-type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --data-binary @- << 'EOF'
{
  "profile_display_name": "<PROFILE_DISPLAY_NAME>",
  "profile_logo_uri": "<PROFILE_LOGO_URI>",
  "support_email": "<SUPPORT_EMAIL>",
  "app_enroll_uri": "<APP_ENROLL_URI>",
  "app_login_uri": "<APP_LOGIN_URI>",
  "registration_redirect_uri": "<REGISTRATION_REDIRECT_URI>",
  "enable_roaming_authentication": true | false
}
EOF
```

Example response after configuring your Beyond Identity Tenant:
```json
{
  "profile_handle": "<PROFILE_HANDLE>",
  "profile_logo_uri": "<PROFILE_LOGO_URI>",
  "profile_display_name": "<PROFILE_DISPLAY_NAME>",
  "profile_email_template_id": "<PROFILE_EMAIL_TEMPLATE_ID>",
  "support_email": "<SUPPORT_EMAIL>",
  "app_enroll_uri": "<APP_ENROLL_URI>",
  "app_login_uri": "<APP_LOGIN_URI>",
  "registration_redirect_uri": "<REGISTRATION_REDIRECT_URI>",
  "enable_roaming_authentication": "<ENABLE_ROAMING_AUTHENTICATION>"
}
```