# Amazon Connect Partner Telephony XML File Attribute Details:

Followings are the attributes from [amazon_connect_partner_telephony_cc_import.xml](amazon_connect_partner_telephony_cc_import.xml) with their description


AttributesName | Description  
--- |-------------
reqInternalName	|Call Center Internal Name. This value is not modifiable once Contact center is created
reqInstanceId	|Instance ID of Amazon Connect instance.
reqInstanceName	|Instance Name of Amazon Connect instance.
reqAmazonConnectManagementRole	|Amazon Connect Management Role. This created as a part of BYOATenantStack cloudformation execution
reqVersion	|Contact Center Version. This can be found from Release document
reqVendorInfoApiName	|c__AMAZON_CONNECT. Do not change this value
reqRegion	|Region where Amazon Connect Instance is created
reqIdentityUrl	|Identity URL. This can be retrieved from created connected App
reqLongDistPrefix	|Long Distance Prefix
reqInstanceRecordingRole	|Instance Recording Role. This should be ConnectCallRole created as part of BYOAContactCenterStack execution
reqTelephonyIntegrationCertificate	|The public key for JWT token.
reqTelephonyIntegrationKeyPairExpDate	|Expiration date for Telephony Integratio Certificate
reqUniversalCallRecordingAccess	|Enable to true if Universal Call Recording Access is required
reqSettingsRelayState	|This is the relay state URL for Amazon Connect Instance. Details can be found here
reqRelayState	|This is agin relay State url for Amazon Connect Instance. This value should be same as reqSettingsRelayState
reqUpdateCredentialRole	|This is the arn for UpdateCredentialRole, which gets created as part of BYOATeantStack. If this role is given, customer will be able to update JWT token from salesforce window
reqThirdPartyIDP	|Set this value to true if customer expects to use third party identity provider.
reqEnableGlobalSignIn	|Set to true if customer wants to opt for Global signin
reqPrimaryInstanceName	|Source Connect Instance Name should be set here. This is used to support global resiliency feature
reqSecondaryInstanceName	|Replica Connect Instance Name should be set here. This is used to support global resiliency feature





