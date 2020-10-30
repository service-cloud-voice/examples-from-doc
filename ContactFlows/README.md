
# Service Cloud Voice Contact Flows

Use these contact flows to perform common functions when using Service Cloud Voice.

To learn about Voice, see [Service Cloud Voice in Salesforce Help](https://help.salesforce.com/articleView?id=voice_about.htm&type=5). Also refer to the [Voice Implementation Guide](https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_intro.htm).

## Basic Flows

* [Sample_SCV_Agent_Transfer](Sample_SCV_Agent_Transfer): Use this contact flow to define the customer experience when a call is transferred from one agent to another agent.
* [Sample_SCV_Inbound](Sample_SCV_Inbound): Use this contact flow to define the customer experience for an inbound call (that is, when a customer calls your contact center).
* [Sample_SCV_Inbound_Flow_With_Transcription](Sample_SCV_Inbound_Flow_With_Transcription): Use this contact flow to define the customer experience for an inbound call where transcription is enabled.
* [Sample_SCV_Outbound_Flow_With_Transcription](Sample_SCV_Outbound_Flow_With_Transcription): Use this contact flow to define the customer experience for an outbound call (that is, the agent calls the customer) where transcription is enabled.
* [Sample_SCV_Queue_Transfer](Sample_SCV_Queue_Transfer): Use this contact flow to define the customer experience when a call is transferred to a queue.

## Salesforce REST API Flows

* [Sample_SCV_REST_Check_For_Open_Cases](Sample_SCV_REST_Check_For_Open_Cases): Use this sample contact flow to demonstrate the `InvokeSalesforceRestApiFunction` Lambda function by checking for open cases.
* [Sample_SCV_REST_Link_Call_To_Case](Sample_SCV_REST_Link_Call_To_Case): Use this sample contact flow to demonstrate the `InvokeSalesforceRestApiFunction` Lambda function by linking a call to an open case. This flow adds on to the simpler [Sample_SCV_REST_Check_For_Open_Cases](Sample_SCV_REST_Check_For_Open_Cases) contact flow.
