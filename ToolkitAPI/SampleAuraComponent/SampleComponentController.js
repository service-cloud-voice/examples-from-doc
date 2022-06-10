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
    }
})