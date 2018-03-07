import { Component, OnInit, OnDestroy,ViewChild} from '@angular/core';
import { SpeechRecognitionService } from './service/speech-recognition.service';
import { ChatMessage } from './model/chat-message.model';
import { TopScoringIntent,Intent,Entity,RootModel } from './model/LUIS-model.ts';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
    showSearchButton: boolean;
    speechData: string;
    LUISUrl = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/ab30cea0-0d2a-41b1-a71e-c399c6206c33?subscription-key=127a900b0ba0478b94ff64cd55e7640f&spellCheck=true&bing-spell-check-subscription-key=127a900b0ba0478b94ff64cd55e7640f&verbose=true&timezoneOffset=0&q=`;

    @ViewChild('chatInput') chatInput;
    chatMessage:ChatMessage[] = [];
    pageValue:string = '';

    constructor(private speechRecognitionService: SpeechRecognitionService) {
        this.showSearchButton = true;
        this.speechData = "";
    }

    ngOnInit() {
        console.log("hello")
    }
    
ngAfterViewInit(){
       this.chatInput.valueChanges
             .debounceTime(500) 
             .distinctUntilChanged() 
             .subscribe(model => (value)=>{
                   console.log(value);
              });

}

    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }

    stopRecording(): void{
      this.showSearchButton = true;
      this.speechRecognitionService.DestroySpeechObject();
    }



    activateSpeechSearchMovie(): void {
        this.showSearchButton = false;

        this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;
                console.log(value);
                this.callChatbotApi();
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                this.activateSpeechSearchMovie();
            });
    }

    callChatbotApi():void{
      const API = this.LUISUrl + this.speechData;
      if(this.speechData !== '' || this.speechData !== undefined){
        this.chatMessage.push({message:this.speechData,messageType:'sent'});
        this.speechData = '';
      this.speechRecognitionService.callChatbotApi(API)
      .subscribe((value:RootModel) => {
        if(value !== undefined){
          if(value.topScoringIntent.intent === 'None'){
            this.chatMessage.push({message:'Sorry..Try Again',messageType:'receive'});
          }
          else{
             this.chatMessage.push({message:'Please Wait..',messageType:'receive'});
          }
        }
        this.pageValue = 'register';
        console.log(value);
      });
      }
    }

}