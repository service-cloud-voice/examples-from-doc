import { LightningElement, api, track } from 'lwc';

export default class ScvToolkitApiTester extends LightningElement {
    @track headSetControlsDisabled = true;

	@api recordId;  

	payload = '{"key": "value"}';
	teleEvent = 'No events received yet.';
	transcript = 'No transcripts received yet.';

	hasRendered = false;

	constructor() {
		super();

		this.telephonyEventListener = this.onTelephonyEvent.bind(this);
		this.conversationEventListener = this.onConversationEvent.bind(this);
	}

        connectedCallback() {
            this.subscribeToVoiceToolkit();
	}

	changeHandler(event) {
		this.payload = event.target.value;
	}

	onInvokeNBA(event) {
		// Message must be in the format { key: 'value' }
		// Use in the Next Best Action strategy filter element with $Request.key
		// To learn more, see:
		// https://help.salesforce.com/articleView?id=nba_strategy_expressions.htm&type=5
		
		this.getToolkitApi().updateNextBestActions(this.recordId, JSON.parse(this.payload));
	}

	onSubscribe(event) {
		this.subscribeToVoiceToolkit();
	}

	onUnsubscribe(event) {
		this.unsubscribeFromVoiceToolkit();
	}

	subscribeToVoiceToolkit() {
		const toolkitApi = this.getToolkitApi();

		toolkitApi.addEventListener('callstarted', this.telephonyEventListener);
		toolkitApi.addEventListener('callconnected', this.telephonyEventListener);
		toolkitApi.addEventListener('callended', this.telephonyEventListener);
		toolkitApi.addEventListener('mute', this.telephonyEventListener);
		toolkitApi.addEventListener('unmute', this.telephonyEventListener);
		toolkitApi.addEventListener('hold', this.telephonyEventListener);
		toolkitApi.addEventListener('resume', this.telephonyEventListener);
		toolkitApi.addEventListener('participantadded', this.telephonyEventListener);
		toolkitApi.addEventListener('participantremoved', this.telephonyEventListener);
		toolkitApi.addEventListener('swap', this.telephonyEventListener);
		toolkitApi.addEventListener('conference', this.telephonyEventListener);
		toolkitApi.addEventListener('pauserecording', this.telephonyEventListener);
		toolkitApi.addEventListener('resumerecording', this.telephonyEventListener);
		toolkitApi.addEventListener('transcript', this.conversationEventListener);
	}

	unsubscribeFromVoiceToolkit() {
		const toolkitApi = this.getToolkitApi();

		toolkitApi.removeEventListener('callstarted', this.telephonyEventListener);
		toolkitApi.removeEventListener('callconnected', this.telephonyEventListener);
		toolkitApi.removeEventListener('callended', this.telephonyEventListener);
		toolkitApi.removeEventListener('mute', this.telephonyEventListener);
		toolkitApi.removeEventListener('unmute', this.telephonyEventListener);
		toolkitApi.removeEventListener('hold', this.telephonyEventListener);
		toolkitApi.removeEventListener('resume', this.telephonyEventListener);
		toolkitApi.removeEventListener('participantadded', this.telephonyEventListener);
		toolkitApi.removeEventListener('participantremoved', this.telephonyEventListener);
		toolkitApi.removeEventListener('swap', this.telephonyEventListener);
		toolkitApi.removeEventListener('conference', this.telephonyEventListener);
		toolkitApi.removeEventListener('pauserecording', this.telephonyEventListener);
		toolkitApi.removeEventListener('resumerecording', this.telephonyEventListener);
		toolkitApi.removeEventListener('transcript', this.conversationEventListener);
	}

	onTelephonyEvent(event) {
        if (event.type === 'callstarted') {
            this.headSetControlsDisabled = false;
        }
        if (event.type === 'callended') {
            this.headSetControlsDisabled = true;
        }
        this.teleEvent = this.stringifyEvent(event);
	}

	onConversationEvent(event) {
	  // Handle a conversation-related event
	}

	getToolkitApi() {
	  return this.template.querySelector('lightning-service-cloud-voice-toolkit-api');
	}

    onMute() {
        this.getToolkitApi().mute();
    }
    
    onUnmute() {
        this.getToolkitApi().unmute();
    }
    
    acceptCall() {
        this.getToolkitApi().acceptCall();
    }

    declineCall() {
        this.getToolkitApi().declineCall();
    }  

    endCall() {
        this.getToolkitApi().endCall();
    }
}
