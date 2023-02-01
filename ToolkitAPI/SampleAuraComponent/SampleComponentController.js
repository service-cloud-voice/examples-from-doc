({
    onInit: function(cmp, event, helper) {
        helper.subscribeToVoiceToolkit(cmp);
    },

    onDestroy: function(cmp, event, helper) {
        helper.unsubscribeFromVoiceToolkit(cmp);
    },
    
    onInvokeNBA: function(cmp, event, helper) {
        helper.updateNextBestActions(cmp);
    },
    
    onMute: function(cmp, event, helper) {
        helper.mute(cmp);
    },
      
    onUnmute: function(cmp, event, helper) {
        helper.unmute(cmp);
    },
    
    onMerge: function(cmp, event, helper) {
        helper.merge(cmp);
    },
    
    onSwap: function(cmp, event, helper) {
        helper.swap(cmp);
    },
    
    onAcceptCall: function(cmp, event, helper) {
        helper.acceptCall(cmp);
    },
    
    onDeclineCall: function(cmp, event, helper) {
        helper.declineCall(cmp);
    },
    
    onEndCall: function(cmp, event, helper) {
        helper.endCall(cmp);
    },
    
    onStartPreviewCall: function(cmp, event, helper) {
        helper.startPreviewCall(cmp);
    },
    
    onSendDigits: function(cmp, event, helper) {
        helper.sendDigits(cmp);
    },

    onHold: function(cmp, event, helper) {
        helper.hold(cmp);
    },
    
    onResume: function(cmp, event, helper) {
        helper.resume(cmp);
    },
    
    onPauseRecording: function(cmp, event, helper) {
        helper.pauseRecording(cmp);
    },
    
    onResumeRecording: function(cmp, event, helper) {
        helper.resumeRecording(cmp);
    },
    
    onAddParticipant: function(cmp, event, helper) {
        helper.addParticipant(cmp);
    },
    
    onBlindTransfer: function(cmp, event, helper) {
        helper.blindTransfer(cmp);
    },
    
    handleComboboxHoldChange : function(cmp, event) {
        cmp.set('v.comboBoxHoldValue', event.getParam("value"));
    },
    
    handleComboboxResumeChange : function(cmp, event) {
        cmp.set('v.comboBoxResumeValue', event.getParam("value"));
    },
    
    handleComboboxRemoveParticipantChange : function(cmp, event) {
        cmp.set('v.comboBoxRemoveParticipantValue', event.getParam("value"));
    },
    
    handleComboboxAddParticipantChange : function(cmp, event) {
        cmp.set('v.comboBoxAddParticipantValue', event.getParam("value"));
    },
    
    handleComboboxBlindTransferChange : function(cmp, event) {
        cmp.set('v.comboBoxBlindTransferValue', event.getParam("value"));
    }
})