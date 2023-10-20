# OpenCTI Sample Adapter with Storage Access API usage
## Instructions
- Create an OpenCTI Call Center with adapter URL as http://....../opencti_adapter.html
- Add a user to the newly created call center
- Add Open CTI Softphone as a utility bar item in your Lightning Application
- Test with Third Party Cookies disabled in Google Chrome

## Test Scenarios
- Writing and Reading Unpartitioned third party cookies fail without enabling storage sccess & visiting top level website
- Writing and Reading Unpartitioned third party cookies fail with only storage access and not visiting top level website
- Writing and Reading Unpartitioned third party cookies succeed when visiting top level website first and then requesting and granting  storage acess.  
- OpenCTI actions are working when unpartitioned third party cookies are accessible

## Notes about Top Level Page
- Top Level page has to be on the same domain as your Open CTI adapater (opencti_adapter.html in this example)
- If you want to modify the URL to the top_level_page.html in this example, change the function named interactWithTopLevelWebsite in opencti_adapter.html



# 3p_connector

ahakro@package.com
Test1234
STMFA44
# Login URL 
https://na44.stmfa.stm.salesforce.com?un=ahakro@package.com&pw=Test1234

#Demo VisualForce Page
https://signtest1601258243803-dev-ed.stmfa.lightning.stm.force.com/lightning/setup/ApexPages/page?address=%2F066RM0000049T65

#OpenCTI Wrapper 2
https://signtest1601258243803-dev-ed--byot-packagedev.stmfa.vf.stm.force.com/apex/opencti_wrapper2

# Index
https://aizazhakro.github.io/3p_connector

***********
