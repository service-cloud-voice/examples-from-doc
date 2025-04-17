# Service Cloud Voice Contact Flows

Salesforce provides several out-of-the box flows for Amazon Connect you can customize for your Service Cloud Voice contact center environment. Sample flows begin with the name “Sample SCV.” This page lists the most current JSON files for each sample flow. You can also access these flows directly from your Amazon Connect instance by selecting Routing > Contact flows.

Each Sample SCV flow performs a voice call task, whether it’s to route incoming calls, transfer calls, route outgoing calls, or capture and transcribe audio. 

Each flow is a flow map made up of blocks, beginning with an Entry block and ending with a Transfer to flow or Disconnect block. For example, the Sample SCV Inbound Flow is used to route incoming calls. When a customer calls the contact center, the voice call triggers the inbound flow, starting at the Entry block. The call then traverses the flow, block by block, stopping at each block to determine what happens next. The flow eventually arrives at the Transfer to flow block, which ends this flow and transfers the call to the Omni-Channel Subflow. If any errors are encountered at any point in the flow, the call gets routed to the Disconnect block.

A subflow is a flow within a flow. Salesforce offers several out-of-the-box subflows that let you add features to a flow, such as Omni-Channel routing, callbacks and voicemails. 

A subflow can’t be used on its own; instead, it must be added to a flow using the Transfer to flow block. You can add multiple subflows to a flow by daisy-chaining them together. 

Some sample flows include subflows by default. For example, the Sample SCV Inbound Flow transfers out to the Sample SCV Omni-Channel Subflow, which then transfers out to a series of other subflows, ending with the Sample SCV Transcription Subflow with Contact Lens.

Here’s an illustration of how an inbound call might flow through the daisy chain of subflows:
A call comes in, which triggers the Sample SCV Inbound Flow.
The call moves through the Sample SCV Inbound Flow, creating a voice call record before it’s transferred to the Sample SCV Omni-Channel Subflow.
The call moves through the Sample SCV Omni-Channel Subflow, routing and prioritizing the call based on the routing logic of the specified Omni-Channel flow. After this, the call is transferred to the Sample SCV Callback Subflow.
The call moves through the Sample SCV Callback Subflow, giving the caller the option to schedule a callback if the queue is busy. If the caller chooses to schedule a callback, the call is transferred to the Callback queue. If the caller chooses to remain on the line, the call is transferred to the Sample SCV Transcription Subflow with Contact Lens.
The call moves through the Sample SCV Transcription Subflow with Contact Lens, enabling real-time transcription before finally transferring the call to the queue. This ends the entire flow.



The order of the subflow chain matters. For example, for inbound calls, if you place the Omni-Channel Subflow before the Callback Subflow, then callback calls will be routed correctly. If, however, you flip the subflows by placing the Callback Subflow before the Omni-Channel Subflow, then the callback calls will be routed to the basic queue. 

For inbound calls, you can’t point a phone number directly to a subflow; instead, point your phone number to the inbound flow. Subflows don’t create a voice call record in Salesforce; they rely on the inbound flow to do that.

For more details about how Sample SCV contact flows work, see [Contact Flows (from the Service Cloud Voice Implementation Guide)](https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_contact_flows.htm).
 
See Also:
* [Service Cloud Voice in Salesforce Help](https://help.salesforce.com/articleView?id=voice_about.htm&type=5)
* [Service Cloud Voice Implementation Guide](https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_intro.htm)

## Basic Flows

* [Sample SCV Inbound Flow](Sample SCV Inbound Flow): Creates a voice call record in Salesforce for the inbound call and transfers the call to the SCV Omni-Channel subflow.
Associate your phone number with this flow so customers can reach your contact center.

* [Sample SCV Outbound Flow With Transcription Using Contact Lens](Sample SCV Outbound Flow With Transcription Using Contact Lens): Starts transcription using Contact Lens for Amazon Connect, capturing and transcribing audio for outbound voice calls.
If you use this preferred flow, you can’t use the [Sample SCV Outbound Flow With Transcription Using Amazon Transcribe](Sample SCV Outbound Flow With Transcription Using Amazon Transcribe) flow.

* [Sample SCV Outbound Flow With Transcription Using Amazon Transcribe](Sample SCV Outbound Flow With Transcription Using Amazon Transcribe): Starts media streaming. Also starts transcription using Amazon Transcribe, capturing and transcribing audio for outbound voice calls.
Since the Sample SCV Outbound Flow With Transcription Using Contact Lens offers more robust transcription features, consider using that flow instead of this one.

* [Sample SCV Transfer Flow For Agent Transfers](Sample SCV Transfer Flow For Agent Transfers): Creates a voice call record and transfers the call from one agent to another specified agent

* [Sample SCV Transfer Flow For Queue Transfers](Sample SCV Transfer Flow For Queue Transfers): Creates a voice call record and transfers the call from an agent to a specified queue.

* [Sample SCV Transfer Flow For Omni-Channel Transfers](Sample SCV Transfer Flow For Omni-Channel Transfers): Creates a voice call record and transfers the call from an agent to a specified Omni-Channel flow.

* [Sample SCV Agent Whisper Flow For Amazon Transcribe](Sample SCV Agent Whisper Flow For Amazon Transcribe): Starts media streaming. Also starts transcription using Amazon Transcribe to prepare for inbound  voice calls and voice call transfers.

* [Sample SCV Voicemail Subflow](Sample SCV Voicemail Subflow): Enables voicemail recordings.

* [Sample SCV Callback Subflow](Sample SCV Callback Subflow): Gives the caller the option to schedule a callback if the queue is busy. If the caller chooses to schedule a callback, transfers the voice call to the Callback queue. If the caller chooses to remain on the line, transfers the call to one of the SCV Transcription Subflows.

* [Sample SCV Transcription Subflow With Amazon Transcribe](Sample SCV Transcription Subflow With Amazon Transcribe): Enables recording and real-time transcription using Amazon Transcribe, and then transfers the voice call to the queue.

* [Sample SCV Transcription Subflow With Contact Lens](Sample SCV Transcription Subflow With Contact Lens): Enables recording and real-time transcription using Contact Lens, and then transfers the voice call to the queue

* [Sample SCV Omni-Channel Subflow - Basic Routing With Case Creation](Sample SCV Omni-Channel Subflow - Basic Routing With Case Creation): Creates a case for each inbound voice call, routes the call to a queue, and opens a screen-pop for the new case record when an agent accepts the call.

## Unified Routing Flows

* [Sample SCV Omni-Channel Subflow - Omni Routing With Case Creation](Sample SCV Omni-Channel Subflow - Omni Routing With Case Creation): Creates a case for each inbound voice call, routes the call using Omni Routing Engine, and opens a screen-pop for the new case record when an agent accepts the call.

* [Sample SCV Omni-Channel Subflow - Omni Routing for Skills](Sample SCV Omni-Channel Subflow - Omni Routing for Skills): Creates a case for each inbound voice call, routes the call to agent with Skill using Omni Routing Engine, and opens a screen-pop for the new case record when an agent accepts the call.

* [Sample SCV Transfer Flow For Omni Routing Transfers](Sample SCV Transfer Flow For Omni Routing Transfers): Creates a voice call record and transfers the call from an agent to a specified agent or queue using Omni Routing Engine.

* [Sample SCV Voicemail Customer Queue Flow For Unified Routing Subflow] (Sample SCV  Customer Queue Flow For Unified Routing): Creates a customer queue subflow, provides option to create waiting loop with interruption period post which provides customer to input with DTMF. The subflow gets interrupted when agent connects with the customer. Customer input options provides choice to record voicemail and enables voicemail recordings.

## Direct to Rep Flows

* [Sample SCV Direct to Rep Subflow](Sample SCV Direct to Rep Subflow): Routes the call to the agent associated with the dialed number via omni direct to agent routing.

* [Sample SCV Inbound Flow for Direct to Rep](Sample SCV Inbound Flow for Direct to Rep): Creates a voice call record in Salesforce for the inbound call and transfers the call to the SCV Direct Agent Routing Subflow.

* [Sample SCV Outbound Flow From Rep With Caller ID Override](Sample SCV Outbound Flow From Rep With Caller ID Override): Sample SCV flow to override caller id for outgoing calls based on the org settings.

## Salesforce REST API Flows

* [Sample_SCV_REST_Check_For_Open_Cases](Sample_SCV_REST_Check_For_Open_Cases): This sample contact flow demonstrates how to check for open cases using the `InvokeSalesforceRestApiFunction` Lambda function.
* [Sample_SCV_REST_Link_Call_To_Case](Sample_SCV_REST_Link_Call_To_Case): This sample contact flow demonstrates how to link a call to an open case using the `InvokeSalesforceRestApiFunction` Lambda function. This flow adds on to the simpler [Sample_SCV_REST_Check_For_Open_Cases](Sample_SCV_REST_Check_For_Open_Cases) contact flow.
* [Sample SCV Field Service Phone Call Subflow](Sample SCV Field Service Phone Call Subflow): Connects field agents to contact center agents.
