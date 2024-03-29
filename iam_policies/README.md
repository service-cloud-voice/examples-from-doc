# Service Cloud Voice IAM Policy For Amazon Connect Partner Telephony Contact Center

This policy is used for creating an Amazon Connect Partner Telephony Contact center into customer owned AWS Amazon account.

## Documentation

* [Service Cloud Voice in Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.voice_ac_iam_role.htm&type=5)
* [Set Up Service Cloud Voice with Partner Telephony from Amazon Connect](https://help.salesforce.com/s/articleView?id=sf.voice_pt_amazon_setup.htm&type=5)

## Code Instructions

* Replace <AWS_ACCOUNT_ID> with the AWS Amazon Account number.
* Replace <Contact_Center_Internal_Name> with the internal name given for creating contact center.
* If you are creating a salesforce contact center using an existing amazon-connect instance , replace <BYOAC_CUSTOM_S3_BUCKET> with the name of the S3 Bucket you have configured for call recordings storage in your existing amazon-connect instance, if you have configured one.In all other cases, do not replace this.
