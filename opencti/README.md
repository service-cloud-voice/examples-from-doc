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

