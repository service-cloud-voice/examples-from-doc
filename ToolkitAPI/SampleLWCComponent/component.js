import { LightningElement, api, track } from 'lwc';

export default class ScvToolkitApiTester extends LightningElement {
    @track headSetControlsDisabled = true;

	@api recordId;  

	payload = '{"key": "value"}';
	previewPhoneNumber = '';
	addParticipantPhoneNumber = '';
	teleEvent = 'No events received yet.';
	transcript = 'No transcripts received yet.';
	sendDigits = '';
	comboBoxHoldValue = 'Initial_Caller';
	comboBoxResumeValue = 'Initial_Caller';
	comboBoxRemoveParticipantValue = 'Initial_Caller';
	comboBoxContactTypeValue = 'PhoneNumber';
	comboBoxAddParticipantContactTypeValue = 'PhoneNumber';
	hasRendered = false;
	isBlindTransfer = false;

	constructor() {
		super();

		this.telephonyEventListener = this.onTelephonyEvent.bind(this);
		this.conversationEventListener = this.onConversationEvent.bind(this);
	}

	renderedCallback() {
		// To learn more about this lifecycle call, see:
		// https://lwc.dev/guide/lifecycle#renderedcallback()
		
		if (!this.hasRendered) {
			this.subscribeToVoiceToolkit();
			this.hasRendered = true;
	  }
	}
	get options() {
        return [
            { label: 'INITIAL_CALLER', value: 'Initial_Caller' },
            { label: 'THIRD_PARTY', value: 'Third_Party' }
        ];
    }

	get endCallOptions() {
		return [
            { label: 'INITIAL_CALLER', value: 'Initial_Caller' },
            { label: 'THIRD_PARTY', value: 'Third_Party' },
			{ label: 'AGENT', value: 'Agent' }
        ];
	}

	get contactOptions() {
        return [
            { label: 'PHONE NUMBER', value: 'PhoneNumber' },
            { label: 'AGENT/QUEUE ID', value: 'AgentOrQueueId' }
        ];
    }

    handleComboboxHoldChange(event) {
        this.comboBoxHoldValue = event.detail.value;
    }

	handleComboboxResumeChange(event) {
        this.comboBoxResumeValue = event.detail.value;
    }

	handleComboboxRemoveParticipantChange(event) {
        this.comboBoxRemoveParticipantValue = event.detail.value;
    }

	handleComboboxContactTypeChange(event) {
        this.comboBoxContactTypeValue = event.detail.value;
    }

	handleComboboxContactTypeAddParticipantChange(event) {
        this.comboBoxAddParticipantContactTypeValue = event.detail.value;
    }

	changeHandler(event) {
		this.payload = event.target.value;
	}

	changePreviewCallHandler(event) {
		this.previewPhoneNumber = event.target.value;
	}

	changeAddParticipantHandler(event) {
		this.addParticipantPhoneNumber = event.target.value;
	}

	handleBlindTransferChange(event) {
		this.isBlindTransfer = event.target.checked;        
	}

	changeSendDigitsHandler(event) {
		this.sendDigits = event.target.value;
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
		toolkitApi.addEventListener('intelligencesignal', this.conversationEventListener);
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
		toolkitApi.removeEventListener('intelligencesignal', this.conversationEventListener);
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
      this.transcript = this.stringifyEvent(event);
	}

	getToolkitApi() {
	  return this.template.querySelector('lightning-service-cloud-voice-toolkit-api');
	}

	onSendDigits() {
		this.getToolkitApi().sendDigits(this.sendDigits);
	}

    onMute() {
        this.getToolkitApi().mute();
    }
    
    onUnmute() {
        this.getToolkitApi().unmute();
    }

	onPauseRecording() {
        this.getToolkitApi().pauseRecording();
    }
    
    onUnmute() {
        this.getToolkitApi().resumeRecording();
    }

	onHold() {
        this.getToolkitApi().hold(this.comboBoxHoldValue);
    }

	onResume() {
        this.getToolkitApi().resume(this.comboBoxResumeValue);
    }
    
    onAcceptCall() {
        this.getToolkitApi().acceptCall();
    }

    onDeclineCall() {
        this.getToolkitApi().declineCall();
    }  

    onEndCall() {
        this.getToolkitApi().endCall(this.comboBoxRemoveParticipantValue);
    }

	onSwap() {
        this.getToolkitApi().swap();
    }

	onMerge() {
        this.getToolkitApi().merge();
    }

	onStartPreviewCall() {
        this.getToolkitApi().startPreviewCall(this.previewPhoneNumber);
    }

	onAddParticipant() {
        this.getToolkitApi().addParticipant(this.comboBoxAddParticipantContactTypeValue, this.addParticipantPhoneNumber, this.isBlindTransfer);
    }

	stringifyEvent(event) {
        return '{ type: \"' + event.type + '\", detail: ' + JSON.stringify(event.detail) + ' }';
    }
}