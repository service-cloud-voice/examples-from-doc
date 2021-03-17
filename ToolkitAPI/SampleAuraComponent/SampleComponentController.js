({
    onInit: function(cmp, event, helper) {
        helper.subscribeToVoiceToolkit(cmp);
    },

    onDestroy: function(cmp, event, helper) {
        helper.unsubscribeFromVoiceToolkit(cmp);
    },
    
    onInvokeNBA: function(cmp, event, helper) {
        helper.updateNextBestActions(cmp);
    }
})
