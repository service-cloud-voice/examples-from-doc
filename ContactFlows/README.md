
# Service Cloud Voice Contact Flows

These contact flows perform common functions when using Service Cloud Voice. For a description of how each of these contact flows work, see [Contact Flows (from the Service Cloud Voice Implementation Guide)](https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_contact_flows.htm).

See Also:

* [Service Cloud Voice in Salesforce Help](https://help.salesforce.com/articleView?id=voice_about.htm&type=5)
* [Service Cloud Voice Implementation Guide](https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_intro.htm)

## Basic Flows

* [Sample_SCV_Inbound_Flow_With_Transcription](Sample_SCV_Inbound_Flow_With_Transcription): This contact flow defines a basic interactive voice response (IVR) flow that includes creating a VoiceCall record in Salesforce and turning on transcription.
* [Sample SCV Agent Whisper With Transcription](Sample_SCV_Agent_Whisper_With_Transcription): This contact flow prepares for the inbound call by starting media streaming and turning on transcription. This contact flow is assigned as the “whisper flow” during the [Inbound_Flow_With_Transcription](Sample_SCV_Inbound_Flow_With_Transcription) contact flow.
* [Sample_SCV_Inbound_Subflow](Sample_SCV_Inbound_Subflow): This contact flow streamlines the integration with an Omni-Channel flow in order to route work. You can connect this subflow to your inbound contact flow.
* [Sample_SCV_Outbound_Flow_With_Transcription](Sample_SCV_Outbound_Flow_With_Transcription): This contact flow defines the customer experience for an outbound call (the agent calling the customer) where transcription is enabled.
* [Sample_SCV_Agent_Transfer](Sample_SCV_Agent_Transfer): This contact flow illustrates the customer experience when a call is transferred from one agent to another agent.
* [Sample_SCV_Queue_Transfer](Sample_SCV_Queue_Transfer): This contact flow illustrates the customer experience when a call is transferred to a queue.
* [Sample_SCV_Inbound](Sample_SCV_Inbound): This contact flow defines the customer experience for a simple inbound call. For a similar flow that also includes transcription, see [Sample_SCV_Inbound_Flow_With_Transcription](Sample_SCV_Inbound_Flow_With_Transcription).

## Salesforce REST API Flows

* [Sample_SCV_REST_Check_For_Open_Cases](Sample_SCV_REST_Check_For_Open_Cases): This sample contact flow demonstrates how to check for open cases using the `InvokeSalesforceRestApiFunction` Lambda function.
* [Sample_SCV_REST_Link_Call_To_Case](Sample_SCV_REST_Link_Call_To_Case): This sample contact flow demonstrates how to link a call to an open case using the `InvokeSalesforceRestApiFunction` Lambda function. This flow adds on to the simpler [Sample_SCV_REST_Check_For_Open_Cases](Sample_SCV_REST_Check_For_Open_Cases) contact flow.
