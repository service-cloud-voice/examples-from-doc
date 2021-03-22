# Service Cloud Voice Toolkit API

This Lightning component illustrates how to use the Service Cloud Voice Toolkit API. To learn about Service Cloud Voice, see [Service Cloud Voice in Salesforce Help](https://help.salesforce.com/articleView?id=voice_about.htm&type=5). Also refer to the [Voice Implementation Guide](https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_intro.htm).

- [Sample Lightning Web Component](SampleLWCComponent/): This Lightning component demonstrates the functionality of the Toolkit API using the Lightning Web Component (LWC) framework.
- [Sample Aura Component](SampleAuraComponent/): This Lightning component demonstrates the functionality of the Toolkit API using the Aura framework.

## Handling Events with the Aura Component

The [sample Aura component](SampleAuraComponent/) illustrates some of the basic features of the Service Cloud Voice Toolkit API. To use this Lightning component in your production environment, you may have to make some changes to support your use case.

For example, if you place this component in a page layout for a VoiceCall record and you have multiple tabs showing VoiceCall records, then your component event listener will receive the same event multiple times. To avoid this situation, change how the component is implemented.

From the component file (`SampleComponent.cmp`), change line of code after `<!-- get record data -->` so that it specifies the unique `VendorCallKey`:

```javascript
<force:recordData
  recordId="{!v.recordId}"
  layoutType="FULL"
  targetFields="{!v.record}"
  fields="VendorCallKey"
/>
```

In your event handler code (SampleComponentHelper.js), perform a check first before running any event handling logic:

```javascript
// Is this an event specific to this call?
if (
  !cmp.isValid() ||
  transcript.detail.callId != cmp.get("v.record.VendorCallKey")
) {
  // If not, drop out
  return;
}
```

After making these changes, each component instance only responds to events specific to the VoiceCall record that is currently in view.
