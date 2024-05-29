import { getRecord } from "lightning/uiRecordApi";
import { LightningElement, api, track, wire } from "lwc";

const FIELDS = [
  "VoiceCall.CallType",
  "VoiceCall.FromPhoneNumber",
  "VoiceCall.ToPhoneNumber",
];

export default class SampleLWCComponent extends LightningElement {
  @track isTelephonyActionControlsDisabled = true;

  @api recordId;

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  voiceCall;

  get CallType() {
    return this.voiceCall.data.fields.CallType.value;
  }

  get FromPhoneNumber() {
    return this.voiceCall.data.fields.FromPhoneNumber.value;
  }

  get ToPhoneNumber() {
    return this.voiceCall.data.fields.ToPhoneNumber.value;
  }

  payload = '{"key": "value"}';
  teleEvent = "No events received yet.";
  transcript = "No transcripts received yet.";
  previewPhoneNumber = "";
  addParticipantPhoneNumber = "";
  sendDigits = "";
  comboBoxHoldValue = "Initial_Caller";
  comboBoxResumeValue = "Initial_Caller";
  comboBoxRemoveParticipantValue = "Agent";
  comboBoxContactTypeValue = "PhoneNumber";
  comboBoxAddParticipantContactTypeValue = "PhoneNumber";
  hasRendered = false;

  constructor() {
    super();
    this.telephonyEventListener = this.onTelephonyEvent.bind(this);
  }

  renderedCallback() {
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
    this.getToolkitApi().updateNextBestActions(
      this.recordId,
      JSON.parse(this.payload)
    );
  }

  onSubscribe(event) {
    this.subscribeToVoiceToolkit();
  }

  onUnsubscribe(event) {
    this.unsubscribeFromVoiceToolkit();
  }

  subscribeToVoiceToolkit() {
    const toolkitApi = this.getToolkitApi();
    toolkitApi.addEventListener("callstarted", this.telephonyEventListener);
    toolkitApi.addEventListener("callconnected", this.telephonyEventListener);
    toolkitApi.addEventListener("callended", this.telephonyEventListener);
    toolkitApi.addEventListener("mute", this.telephonyEventListener);
    toolkitApi.addEventListener("unmute", this.telephonyEventListener);
    toolkitApi.addEventListener("hold", this.telephonyEventListener);
    toolkitApi.addEventListener("resume", this.telephonyEventListener);
    toolkitApi.addEventListener(
      "participantadded",
      this.telephonyEventListener
    );
    toolkitApi.addEventListener(
      "participantremoved",
      this.telephonyEventListener
    );
    toolkitApi.addEventListener("swap", this.telephonyEventListener);
    toolkitApi.addEventListener("conference", this.telephonyEventListener);
    toolkitApi.addEventListener("pauserecording", this.telephonyEventListener);
    toolkitApi.addEventListener("resumerecording", this.telephonyEventListener);
    toolkitApi.addEventListener("transcript", this.telephonyEventListener);
  }

  unsubscribeFromVoiceToolkit() {
    const toolkitApi = this.getToolkitApi();
    toolkitApi.removeEventListener("callstarted", this.telephonyEventListener);
    toolkitApi.removeEventListener(
      "callconnected",
      this.telephonyEventListener
    );
    toolkitApi.removeEventListener("callended", this.telephonyEventListener);
    toolkitApi.removeEventListener("mute", this.telephonyEventListener);
    toolkitApi.removeEventListener("unmute", this.telephonyEventListener);
    toolkitApi.removeEventListener("hold", this.telephonyEventListener);
    toolkitApi.removeEventListener("resume", this.telephonyEventListener);
    toolkitApi.removeEventListener(
      "participantadded",
      this.telephonyEventListener
    );
    toolkitApi.removeEventListener(
      "participantremoved",
      this.telephonyEventListener
    );
    toolkitApi.removeEventListener("swap", this.telephonyEventListener);
    toolkitApi.removeEventListener("conference", this.telephonyEventListener);
    toolkitApi.removeEventListener(
      "pauserecording",
      this.telephonyEventListener
    );
    toolkitApi.removeEventListener(
      "resumerecording",
      this.telephonyEventListener
    );
    toolkitApi.removeEventListener("transcript", this.telephonyEventListener);
  }

  onTelephonyEvent(event) {
    if (
      (event.type === "callstarted" || event.type === "callconnected") &&
      this.comboBoxRemoveParticipantValue === "Agent"
    ) {
      this.isTelephonyActionControlsDisabled = false;
    }
    if (event.type === "callended") {
      this.isTelephonyActionControlsDisabled = true;
    }

    if (event.type === "transcript") {
      this.transcript = JSON.stringify(event.detail);
    }

    this.teleEvent = JSON.stringify(event);
  }

  getToolkitApi() {
    return this.template.querySelector(
      "lightning-service-cloud-voice-toolkit-api"
    );
  }

  get options() {
    return [
      { label: "INITIAL_CALLER", value: "Initial_Caller" },
      { label: "THIRD_PARTY", value: "Third_Party" },
    ];
  }

  get endCallOptions() {
    return [
      { label: "AGENT", value: "Agent" },
      { label: "INITIAL_CALLER", value: "Initial_Caller" },
      { label: "THIRD_PARTY", value: "Third_Party" },
    ];
  }

  get contactOptions() {
    return [
      { label: "PHONE NUMBER", value: "PhoneNumber" },
      { label: "AGENT/QUEUE ID", value: "AgentOrQueueId" },
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

  changePreviewCallHandler(event) {
    this.previewPhoneNumber = event.target.value;
  }

  changeAddParticipantHandler(event) {
    this.addParticipantPhoneNumber = event.target.value;
  }

  changeSendDigitsHandler(event) {
    this.sendDigits = event.target.value;
  }

  onMute() {
    this.getToolkitApi().mute();
  }

  onUnmute() {
    this.getToolkitApi().unmute();
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

  onSendDigits() {
    this.getToolkitApi().sendDigits(this.sendDigits);
  }

  onPauseRecording() {
    this.getToolkitApi().pauseRecording();
  }

  onResumeRecording() {
    this.getToolkitApi().resumeRecording();
  }

  onHold() {
    this.getToolkitApi().hold(this.comboBoxHoldValue);
  }

  onResume() {
    this.getToolkitApi().resume(this.comboBoxResumeValue);
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
    this.getToolkitApi().addParticipant(
      this.comboBoxAddParticipantContactTypeValue,
      this.addParticipantPhoneNumber,
      false
    );
  }

  onAddParticipantViaBlindTransfer() {
    this.getToolkitApi().addParticipant(
      this.comboBoxAddParticipantContactTypeValue,
      this.addParticipantPhoneNumber,
      true
    );
  }
}
