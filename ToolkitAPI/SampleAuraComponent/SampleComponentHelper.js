({
    subscribeToVoiceToolkit: function(cmp) {
        cmp._telephonyEventListener = $A.getCallback(this.telephonyEventListener.bind(this, cmp));
        // Subscribing to a subset of the telephony events
        // For a list of all events, see the Voice Developer Guide:
        // https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_intro.htm
        cmp.find('voiceToolkitApi').addTelephonyEventListener('CALL_STARTED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('CALL_CONNECTED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('CALL_ENDED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('MUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('UNMUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('HOLD', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').addTelephonyEventListener('RESUME', cmp._telephonyEventListener);
        
        cmp._conversationEventListener = $A.getCallback(this.conversationEventListener.bind(this, cmp));
        cmp.find('voiceToolkitApi').addConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },

    unsubscribeFromVoiceToolkit: function(cmp) {
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('CALL_STARTED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('CALL_CONNECTED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('CALL_ENDED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('MUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('UNMUTE', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('HOLD', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('RESUME', cmp._telephonyEventListener);
        
        cmp.find('voiceToolkitApi').removeConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },
    
    telephonyEventListener: function(cmp, event) {
        cmp.set('v.message', JSON.stringify(event));
    },
    
    conversationEventListener: function(cmp, transcript) {
        cmp.set('v.transcript', JSON.stringify(transcript));
    },
    
    updateNextBestActions: function(cmp) {
        // Message must be in the format { key: 'value' }
        // Use in Next Best Action strategy filter element with $Request.key
        // https://help.salesforce.com/articleView?id=nba_strategy_expressions.htm&type=5
        var params = JSON.parse(cmp.get('v.payload'));
        cmp.find('voiceToolkitApi').updateNextBestActions(cmp.get('v.recordId'), params);
    },
    
    mute: function(cmp) {
        cmp.find('voiceToolkitApi').mute()
    },
    
    unmute: function(cmp) {
        cmp.find('voiceToolkitApi').unmute()
    },
    
    merge: function(cmp) {
        cmp.find('voiceToolkitApi').merge()
    },
    
    swap: function(cmp) {
        cmp.find('voiceToolkitApi').swap()
    },
    
    pauseRecording: function(cmp) {
        cmp.find('voiceToolkitApi').pauseRecording()
    },
    
    resumeRecording: function(cmp) {
        cmp.find('voiceToolkitApi').resumeRecording()
    },
    
    hold: function(cmp) {
        var params = cmp.get('v.comboBoxHoldValue');
        cmp.find('voiceToolkitApi').hold(params)
    },
    
    resume: function(cmp) {
        var params = cmp.get('v.comboBoxResumeValue');
        cmp.find('voiceToolkitApi').resume(params)
    },
    
    acceptCall: function(cmp) {
        cmp.find('voiceToolkitApi').acceptCall()
    },

    declineCall: function(cmp) {
        cmp.find('voiceToolkitApi').declineCall()
    },
    
    removeParticipant: function(cmp) {
        var params = cmp.get('v.comboBoxRemoveParticipantValue');
        cmp.find('voiceToolkitApi').removeParticipant(params)
    },

    endCall: function(cmp) {
        cmp.find('voiceToolkitApi').endCall()
    },

    startPreviewCall: function(cmp) {
        var params = cmp.get('v.phoneNumber');
        cmp.find('voiceToolkitApi').startPreviewCall(params);
    },
    
    sendDigits: function(cmp) {
        var params = cmp.get('v.digits');
        cmp.find('voiceToolkitApi').sendDigits(params);
    },
    
    addParticipant: function(cmp) {
        var param1 = cmp.get('v.comboBoxAddParticipantValue');
        var param2 = cmp.get('v.addParticipantValue');
        cmp.find('voiceToolkitApi').addParticipant(param1, param2, false);
    },
    
    blindTransfer: function(cmp) {
        var param1 = cmp.get('v.comboBoxBlindTransferValue');
        var param2 = cmp.get('v.blindTransferValue');
        cmp.find('voiceToolkitApi').addParticipant(param1, param2, true);
    }
})